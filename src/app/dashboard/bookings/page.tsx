"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Clock,
  Star,
  CalendarDays,
  Send,
  CheckCircle2,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Booking {
  id: string;
  status: string;
  totalPrice: string;
  date: string;
  timeSlot: string;
  meetLink: string;
  partnerName: string;
  partnerImage: string | null;
  partnerEmail: string;
  startTime: string;
  endTime: string;
}

export default function StudentBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Review Modal States
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bookings`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setBookings(res.data);
        }
      })
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  };

  const handleJoinSession = (booking: Booking) => {
    // 1. Open meeting link in new tab
    window.open(booking.meetLink, "_blank");
    // 2. Open review modal in current tab
    setSelectedBooking(booking);
    setIsReviewOpen(true);
  };

  const handleSubmitReview = async () => {
    if (rating === 0) return toast.error("Please select a rating star!");

    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            bookingId: selectedBooking?.id,
            rating,
            comment,
          }),
        },
      );

      const json = await res.json();

      if (json.success) {
        toast.success("Session completed and review submitted!");

        // Update local state so "Join" link disappears instantly
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b.id === selectedBooking?.id ? { ...b, status: "COMPLETED" } : b,
          ),
        );

        // Cleanup
        setIsReviewOpen(false);
        setRating(0);
        setComment("");
        setSelectedBooking(null);
      } else {
        toast.error(json.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Review Error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-amber-500 animate-pulse font-black uppercase tracking-widest">
        Loading your sessions...
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
          My <span className="text-amber-500">Bookings</span>
        </h1>
        <p className="text-white/50 text-sm font-medium italic">
          Keep track of your learning sessions and feedback.
        </p>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {bookings.map((booking, i) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <SpotlightCard className="p-0 overflow-hidden border-white/5 group">
                <div className="flex flex-col lg:flex-row items-center justify-between p-6 gap-6 bg-white/[0.02]">
                  {/* Partner Info */}
                  <div className="flex items-center gap-5 w-full lg:w-auto">
                    <Avatar className="size-14 rounded-2xl border border-white/10 ring-2 ring-transparent group-hover:ring-amber-500/30 transition-all">
                      <AvatarImage src={booking.partnerImage || ""} />
                      <AvatarFallback className="bg-amber-500 text-black font-black">
                        {booking.partnerName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-black text-white italic uppercase tracking-tighter">
                        {booking.partnerName}
                      </h3>
                      <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">
                        {booking.partnerEmail}
                      </p>
                    </div>
                  </div>

                  {/* Schedule Info */}
                  <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl">
                    <Clock className="size-4 text-amber-500" />
                    <div className="text-left">
                      <p className="text-white text-[10px] font-black uppercase italic tracking-tighter">
                        {booking.date}
                      </p>
                      <p className="text-white/40 text-[9px] font-bold">
                        {booking.timeSlot}
                      </p>
                    </div>
                  </div>

                  {/* Status & Actions Group */}
                  <div className="flex flex-row items-center justify-between lg:justify-end gap-4 w-full lg:w-auto border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                    {/* Status Badge */}
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors",
                        booking.status === "CONFIRMED" &&
                          "bg-green-500/10 border-green-500/20 text-green-500",
                        booking.status === "PENDING" &&
                          "bg-amber-500/10 border-amber-500/20 text-amber-500",
                        booking.status === "COMPLETED" &&
                          "bg-blue-500/10 border-blue-500/20 text-blue-500",
                        booking.status === "CANCELLED" &&
                          "bg-red-500/10 border-red-500/20 text-red-500",
                      )}
                    >
                      {booking.status}
                    </span>

                    {/* Dynamic Action Button */}
                    <div className="flex items-center gap-2">
                      {booking.status === "CONFIRMED" && booking.meetLink ? (
                        <Button
                          onClick={() => handleJoinSession(booking)}
                          variant="outline"
                          className="border-amber-500/20 bg-amber-500/5 hover:bg-amber-500 hover:text-black gap-2 rounded-xl text-amber-500 font-black uppercase text-[10px] h-10 transition-all active:scale-95"
                        >
                          <Video className="size-4" />
                          Join Session
                        </Button>
                      ) : booking.status === "COMPLETED" ? (
                        <Button
                          disabled
                          variant="ghost"
                          className="gap-2 rounded-xl text-green-500/50 font-black uppercase text-[10px] h-10 bg-green-500/5 border border-green-500/10"
                        >
                          <CheckCircle2 className="size-4" />
                          Finished
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="outline"
                          className="border-white/5 bg-white/5 gap-2 rounded-xl text-white/20 font-black uppercase text-[10px] h-10"
                        >
                          <Video className="size-4" />
                          {booking.status === "CANCELLED"
                            ? "Cancelled"
                            : "Link Pending"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* REVIEW MODAL */}
      <Dialog
        open={isReviewOpen}
        onOpenChange={(open) => !submitting && setIsReviewOpen(open)}
      >
        <DialogContent
          className="bg-[#0c0c0e] border-white/10 text-white max-w-md rounded-[2.5rem] outline-none"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">
              Rate your <span className="text-amber-500">Session</span>
            </DialogTitle>
            <DialogDescription className="text-white/50 font-medium italic">
              Share your experience with {selectedBooking?.partnerName}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Star Rating Selector */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className="transition-transform active:scale-90 hover:scale-110"
                >
                  <Star
                    className={cn(
                      "size-8 transition-all duration-300",
                      rating >= num
                        ? "fill-amber-500 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                        : "text-white/10",
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Comment Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1 italic">
                Your Feedback
              </label>
              <Textarea
                placeholder="How was the session? Write your honest opinion..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="bg-white/5 border-white/10 rounded-2xl focus:ring-amber-500/20 min-h-[120px] placeholder:text-white/20 font-medium resize-none text-sm"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              disabled={submitting || rating === 0}
              onClick={handleSubmitReview}
              className="w-full bg-amber-500 text-black font-black uppercase py-6 rounded-2xl hover:bg-amber-600 gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {submitting ? (
                <Clock className="animate-spin size-4" />
              ) : (
                <Send className="size-4" />
              )}
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Empty State */}
      {!loading && bookings.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01]"
        >
          <CalendarDays className="size-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/40 font-black uppercase tracking-widest text-sm italic">
            No active sessions found
          </p>
          <Button
            asChild
            variant="link"
            className="text-amber-500 font-black uppercase tracking-widest text-xs mt-4"
          >
            <Link href="/tutors">Find your first tutor →</Link>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
