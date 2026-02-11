"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Video,
  ExternalLink,
  Clock,
  Calendar,
  AlertCircle,
  Loader2,
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
  const [meetLinks, setMeetLinks] = useState<{ [key: string]: string }>({});

  // ১. পেন্ডিং বুকিংগুলো ফেচ করা
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tutor/bookings/pending`,
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

  // ২. বুকিং কনফার্ম করার ফাংশন
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
          body: JSON.stringify({ meetLink: link }),
        },
      );

      const json = await res.json();
      if (json.success) {
        toast.success("Session Confirmed!");
        // লিস্ট থেকে সরিয়ে দেওয়া বা আপডেট করা
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

  if (loading)
    return (
      <div className="p-10 text-center text-slate-500">Loading requests...</div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white tracking-tight">
          Session <span className="shimmer-gold">Requests</span>
        </h2>
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
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
              <p className="text-slate-500 font-medium">
                No pending requests at the moment.
              </p>
            </motion.div>
          ) : (
            bookings.map((booking) => (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <SpotlightCard className="p-0 border-white/5 overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/[0.02] gap-6">
                    {/* সেশন ডিটেইলস */}
                    <div className="flex items-start gap-5">
                      <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Calendar className="size-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg leading-none mb-2">
                          {booking.student.name}
                        </h4>
                        <div className="flex flex-wrap gap-4 text-slate-400 text-xs font-medium">
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-3.5" />
                            {format(new Date(booking.startTime), "p")} (
                            {booking.duration} min)
                          </span>
                          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px] text-primary">
                            <CheckCircle className="size-3.5" />
                            Pending Approval
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* মিট লিংক ইনপুট ও বাটন */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                      <div className="relative w-full sm:w-64">
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
                          className="pl-10 bg-white/5 border-white/10 text-white text-xs h-11 rounded-xl focus-visible:ring-primary/20"
                        />
                      </div>
                      <Button
                        onClick={() => handleApprove(booking.id)}
                        disabled={actionLoading === booking.id}
                        className="w-full sm:w-auto bg-primary text-black font-black px-6 h-11 rounded-xl shadow-lg shadow-primary/10"
                      >
                        {actionLoading === booking.id ? (
                          <Loader2 className="animate-spin size-4" />
                        ) : (
                          "Confirm Session"
                        )}
                      </Button>
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
