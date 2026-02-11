"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Video,
  Clock,
  Calendar,
  Loader2,
  XCircle,
  Trash2,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function TutorBookingRequests() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectLoading, setRejectLoading] = useState<string | null>(null);
  const [meetLinks, setMeetLinks] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        // Removed the extra "/tutor" from the URL path
        `${process.env.NEXT_PUBLIC_APP_URL}/api/bookings/pending`,
        {
          credentials: "include",
        },
      );
      const json = await res.json();
      if (json.success) setBookings(json.data);
    } catch (error) {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  // --- Approve Logic ---
  const handleApprove = async (bookingId: string) => {
    const link = meetLinks[bookingId];

    if (!link || !link.startsWith("https://meet")) {
      return toast.error("Please enter a valid Google Meet link");
    }

    setActionLoading(bookingId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/bookings/approve/${bookingId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ meetLink: link }),
        },
      );

      const json = await res.json();
      if (json.success) {
        toast.success("Session Confirmed!");
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setActionLoading(null);
    }
  };

  // --- Reject Logic ---
  const handleReject = async (bookingId: string) => {
    if (!confirm("Are you sure you want to reject this request?")) return;

    setRejectLoading(bookingId);
    try {
      // NOTE: Ensure you have a DELETE route at /api/bookings/:id
      // OR a PATCH route for status: "REJECTED"
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const json = await res.json();
      if (json.success) {
        toast.error("Request Rejected");
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("Failed to reject request");
    } finally {
      setRejectLoading(null);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-slate-500 animate-pulse font-black uppercase tracking-tighter">
        Loading requests...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">
          Session <span className="text-amber-500">Requests</span>
        </h2>
        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black text-amber-500 uppercase tracking-widest">
          {bookings.length} Pending
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {bookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl"
            >
              <p className="text-slate-500 font-medium italic">
                No pending requests at the moment.
              </p>
            </motion.div>
          ) : (
            bookings.map((booking) => (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <SpotlightCard className="p-0 border-white/5 overflow-hidden group">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-white/[0.02] gap-6">
                    {/* 1. Student Info */}
                    <div className="flex items-start gap-5">
                      <div className="size-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                        <Calendar className="size-7" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-white font-black text-xl leading-none italic uppercase">
                          {booking.student.name}
                        </h4>
                        <div className="flex flex-wrap gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-3 text-amber-500" />
                            {format(new Date(booking.startTime), "p")}
                          </span>
                          <span className="flex items-center gap-1.5 text-amber-500/60">
                            <Timer className="size-3" />
                            {/* Duration logic - usually calculated from startTime/endTime */}
                            {Math.round(
                              (new Date(booking.endTime).getTime() -
                                new Date(booking.startTime).getTime()) /
                                60000,
                            )}{" "}
                            MIN
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Meet Link Input & Actions */}
                    <div className="flex flex-col md:flex-row items-center gap-3 w-full lg:w-auto">
                      <div className="relative w-full md:w-64">
                        <Video className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                        <Input
                          placeholder="Paste Google Meet Link..."
                          value={meetLinks[booking.id] || ""}
                          onChange={(e) =>
                            setMeetLinks({
                              ...meetLinks,
                              [booking.id]: e.target.value,
                            })
                          }
                          className="pl-10 bg-white/5 border-white/10 text-white text-xs h-12 rounded-xl focus-visible:ring-amber-500/20 placeholder:text-slate-600 font-bold"
                        />
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto">
                        {/* Confirm Button */}
                        <Button
                          onClick={() => handleApprove(booking.id)}
                          disabled={
                            actionLoading === booking.id ||
                            rejectLoading === booking.id
                          }
                          className="flex-1 md:flex-none bg-white text-black hover:bg-amber-500 font-black px-6 h-12 rounded-xl transition-all active:scale-95 uppercase tracking-tighter"
                        >
                          {actionLoading === booking.id ? (
                            <Loader2 className="animate-spin size-4" />
                          ) : (
                            "Confirm"
                          )}
                        </Button>

                        {/* Reject Button */}
                        <Button
                          variant="ghost"
                          onClick={() => handleReject(booking.id)}
                          disabled={
                            actionLoading === booking.id ||
                            rejectLoading === booking.id
                          }
                          className="bg-red-500/5 hover:bg-red-500 hover:text-white text-red-500 size-12 p-0 rounded-xl border border-red-500/10 transition-all active:scale-95"
                        >
                          {rejectLoading === booking.id ? (
                            <Loader2 className="animate-spin size-4" />
                          ) : (
                            <Trash2 className="size-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Added Timer icon import for the duration display
function Timer({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </svg>
  );
}
