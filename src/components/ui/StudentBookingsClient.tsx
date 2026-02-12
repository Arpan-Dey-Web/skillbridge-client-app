"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Clock,
  Star,
  CalendarDays,
  Send,
  CheckCircle2,
  Loader2,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

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
import { cn } from "@/lib/utils";

interface Booking {
  id: string;
  status: string;
  date: string;
  timeSlot: string;
  meetLink: string | null;
  partnerName: string;
  partnerImage: string | null;
  partnerEmail: string;
}

export default function StudentBookingsClient({
  initialBookings,
}: {
  initialBookings: Booking[];
    }) {
    console.log(initialBookings);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  console.log(bookings);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // সার্ভার থেকে revalidate হয়ে নতুন ডাটা আসলে লোকাল স্টেট সিঙ্ক হবে
  useEffect(() => {
    setBookings(initialBookings);
  }, [initialBookings]);

  const handleJoinSession = (booking: Booking) => {
    if (booking.meetLink) {
      window.open(booking.meetLink, "_blank");
      setSelectedBooking(booking);
      setIsReviewOpen(true);
    }
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
          body: JSON.stringify({
            bookingId: selectedBooking?.id,
            rating,
            comment,
          }),
        },
      );

      const json = await res.json();

      if (json.success) {
        toast.success("Feedback submitted successfully!");
        // ইনস্ট্যান্টলি স্ট্যাটাস আপডেট দেখানো
        setBookings((prev) =>
          prev.map((b) =>
            b.id === selectedBooking?.id ? { ...b, status: "COMPLETED" } : b,
          ),
        );
        setIsReviewOpen(false);
        setRating(0);
        setComment("");
      } else {
        toast.error(json.message || "Failed to submit review");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            My <span className="shimmer-gold">Bookings</span>
          </h1>
          <p className="text-white/40 text-sm font-medium italic mt-1 uppercase tracking-widest">
            Learning Journey & Session Records
          </p>
        </div>
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold text-amber-500/80 uppercase tracking-widest">
          {bookings.length} Total Sessions
        </div>
      </div>

      {/* --- BOOKINGS LIST --- */}
      <div className="grid gap-5 ">
        <AnimatePresence mode="popLayout">
          {bookings.length > 0 ? (
            bookings.map((booking, i) => (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <SpotlightCard className="p-0 border-white/5 overflow-hidden group">
                  <div className="flex flex-col lg:flex-row items-center justify-between p-6 gap-6 bg-white/[0.01]">
                    {/* Partner Info */}
                    <div className="flex items-center gap-5 w-full lg:w-auto">
                      <div className="relative">
                        <Avatar className="size-16 rounded-2xl border border-white/10 group-hover:border-amber-500/50 transition-colors">
                          <AvatarImage src={booking.partnerImage || ""} />
                          <AvatarFallback className="bg-amber-500 text-black font-black">
                            {booking.partnerName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        {booking.status === "CONFIRMED" && (
                          <span className="absolute -top-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-[#0c0c0e] animate-pulse" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">
                          {booking.partnerName}
                        </h3>
                        <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">
                          {booking.partnerEmail}
                        </p>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="flex items-center gap-4 bg-white/5 px-5 py-3 rounded-3xl border border-white/5 w-full lg:w-auto">
                      <Clock className="size-5 text-amber-500" />
                      <div className="text-left">
                        <p className="text-white text-xs font-black uppercase tracking-tight">
                          {booking.date}
                        </p>
                        <p className="text-white/40 text-[10px] font-bold uppercase">
                          {booking.timeSlot}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                      <span
                        className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
                          booking.status === "CONFIRMED" &&
                            "bg-green-500/10 border-green-500/20 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]",
                          booking.status === "PENDING" &&
                            "bg-amber-500/10 border-amber-500/20 text-amber-500",
                          booking.status === "COMPLETED" &&
                            "bg-blue-500/10 border-blue-500/20 text-blue-400",
                          booking.status === "CANCELLED" &&
                            "bg-red-500/10 border-red-500/20 text-red-500",
                        )}
                      >
                        {booking.status}
                      </span>

                      {booking.status === "CONFIRMED" && booking.meetLink ? (
                        <Button
                          onClick={() => handleJoinSession(booking)}
                          className="bg-amber-500 hover:bg-white text-black font-black uppercase text-[11px] h-11 px-8 rounded-2xl transition-all active:scale-95 shadow-xl shadow-amber-500/10"
                        >
                          <Video className="mr-2 size-4" /> Join Session
                        </Button>
                      ) : booking.status === "COMPLETED" ? (
                        <div className="flex items-center gap-2 text-green-500/50 font-black uppercase text-[10px] px-4">
                          <CheckCircle2 className="size-4" /> Finished
                        </div>
                      ) : (
                        <div className="text-white/20 text-[10px] font-black uppercase tracking-widest px-4">
                          {booking.status === "CANCELLED"
                            ? "Archived"
                            : "Wait for Link"}
                        </div>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))
          ) : (
            /* --- EMPTY STATE --- */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]"
            >
              <CalendarDays className="size-16 text-white/5 mx-auto mb-6" />
              <h2 className="text-xl font-black text-white/40 uppercase tracking-tighter italic">
                No active bookings found
              </h2>
              <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 mb-8">
                Ready to start your first session?
              </p>
              <Button
                asChild
                className="bg-white/5 hover:bg-amber-500 hover:text-black text-white border border-white/10 rounded-2xl px-10 transition-all"
              >
                <Link
                  href="/tutors"
                  className="font-black uppercase text-[11px] tracking-widest"
                >
                  Browse Tutors →
                </Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- REVIEW MODAL --- */}
      <Dialog
        open={isReviewOpen}
        onOpenChange={(open) => !submitting && setIsReviewOpen(open)}
      >
        <DialogContent className="bg-[#0c0c0e] border-white/10 text-white max-w-md rounded-[3rem] p-8 shadow-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter">
              Session <span className="text-amber-500">Feedback</span>
            </DialogTitle>
            <DialogDescription className="text-white/40 font-medium italic mt-2">
              Help {selectedBooking?.partnerName} improve by sharing your
              thoughts.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8 py-6">
            {/* Star Selector */}
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className="transition-all active:scale-75 hover:scale-125"
                >
                  <Star
                    className={cn(
                      "size-9 transition-all duration-300",
                      rating >= num
                        ? "fill-amber-500 text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                        : "text-white/5 hover:text-white/20",
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/50 ml-2">
                Detailed Opinion
              </label>
              <Textarea
                placeholder="How was the teaching style? Was the topic clear?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="bg-white/[0.03] border-white/10 rounded-[1.5rem] focus:ring-amber-500/20 min-h-[140px] placeholder:text-white/10 font-medium text-sm p-5 resize-none transition-all focus:border-amber-500/30"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              disabled={submitting || rating === 0}
              onClick={handleSubmitReview}
              className="w-full bg-amber-500 hover:bg-white text-black font-black uppercase py-7 rounded-2xl gap-3 transition-all active:scale-95 disabled:opacity-30"
            >
              {submitting ? (
                <Loader2 className="animate-spin size-5" />
              ) : (
                <Send className="size-5" />
              )}
              {submitting ? "Processing..." : "Submit Experience"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
