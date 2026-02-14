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
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";

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
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  // Review States
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setBookings(initialBookings);
  }, [initialBookings]);

  // Tab Filtering (Admin style)
  const filteredBookings = bookings.filter((b) => {
    const isPast = b.status === "COMPLETED" || b.status === "CANCELLED";
    return activeTab === "past" ? isPast : !isPast;
  });

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
        toast.success("Feedback submitted!");
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
      toast.error("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-6">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            Session <span className="shimmer-gold">Operations</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Track and manage your{" "}
            <span className="text-white">{bookings.length}</span> recorded
            sessions.
          </p>
        </div>
      </div>

      {/* --- ADMIN STYLE TABS --- */}
      <div className="flex gap-8 border-b border-white/5">
        {(["upcoming", "past"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative",
              activeTab === tab
                ? "text-primary"
                : "text-slate-500 hover:text-slate-300",
            )}
          >
            {tab} Sessions
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              />
            )}
          </button>
        ))}
      </div>

      {/* --- SESSIONS LIST --- */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {filteredBookings.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {filteredBookings.map((booking) => (
                <SpotlightCard
                  key={booking.id}
                  className="p-0 border-white/5 group overflow-hidden"
                >
                  <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/[0.01]">
                    <div className="flex items-center gap-6">
                      <Avatar className="size-14 rounded-2xl border border-white/10 group-hover:border-primary/50 transition-colors">
                        <AvatarImage src={booking.partnerImage || ""} />
                        <AvatarFallback className="bg-white/5 text-white/40 font-black">
                          {booking.partnerName?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border",
                              booking.status === "COMPLETED"
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                                : booking.status === "CONFIRMED"
                                  ? "bg-blue-500/10 border-blue-500/20 text-blue-500"
                                  : "bg-amber-500/10 border-amber-500/20 text-amber-500",
                            )}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          {booking.partnerName}{" "}
                          <ArrowUpRight className="size-3 text-slate-600" />
                        </h3>
                        <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="size-3 text-primary" />{" "}
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-3 text-primary" />{" "}
                            {booking.timeSlot}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:justify-end border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                      {booking.status === "CONFIRMED" && booking.meetLink ? (
                        <Button
                          onClick={() => handleJoinSession(booking)}
                          className="bg-primary hover:bg-white text-black font-black text-[10px] uppercase h-10 px-8 rounded-xl transition-all"
                        >
                          <Video className="mr-2 size-4" /> Join Now
                        </Button>
                      ) : booking.status === "COMPLETED" ? (
                        <div className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[10px] px-4">
                          <CheckCircle2 className="size-4" /> Finished
                        </div>
                      ) : (
                        <span className="text-slate-600 text-[10px] font-black uppercase px-4 italic">
                          Wait for schedule
                        </span>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </motion.div>
          ) : (
            <div className="py-24 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/[0.01]">
              <p className="text-slate-600 font-black uppercase tracking-widest text-[10px]">
                No activity logged in {activeTab}.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* --- REVIEW MODAL --- */}
      <Dialog
        open={isReviewOpen}
        onOpenChange={(open) => !submitting && setIsReviewOpen(open)}
      >
        <DialogContent className="bg-[#0c0c0e] border-white/10 text-white max-w-md rounded-[2.5rem] p-8">
          <DialogHeader className="text-center">
            <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter">
              Session <span className="text-primary">Feedback</span>
            </DialogTitle>
            <DialogDescription className="text-white/40 font-medium italic mt-2 text-xs">
              How was your session with {selectedBooking?.partnerName}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-8 py-6">
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setRating(num)}
                  className="transition-all active:scale-75 hover:scale-110"
                >
                  <Star
                    className={cn(
                      "size-8 transition-all duration-300",
                      rating >= num
                        ? "fill-primary text-primary drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                        : "text-white/5",
                    )}
                  />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-white/[0.03] border-white/10 rounded-2xl min-h-[120px] text-sm"
            />
          </div>
          <DialogFooter>
            <Button
              disabled={submitting || rating === 0}
              onClick={handleSubmitReview}
              className="w-full bg-primary hover:bg-white text-black font-black uppercase h-14 rounded-xl gap-2 transition-all"
            >
              {submitting ? (
                <Loader2 className="animate-spin size-4" />
              ) : (
                <Send className="size-4" />
              )}
              {submitting ? "Submitting..." : "Complete Session"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
