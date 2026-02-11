"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Clock,
  MoreVertical,
  ExternalLink,
  CalendarDays,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Using your declared interface
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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bookings`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setBookings(res.data);
        } else {
          toast.error(res.message || "Failed to load bookings");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Network error fetching bookings");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center text-amber-500 animate-pulse font-black uppercase tracking-tighter">
        Loading your sessions...
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            My <span className="text-amber-500">Bookings</span>
          </h1>
          <p className="text-white/50 text-sm font-medium">
            Manage your upcoming and past learning sessions.
          </p>
        </div>
        <Button
          asChild
          className="bg-amber-500 text-black font-black rounded-xl px-6 hover:bg-amber-600 transition-transform active:scale-95"
        >
          <Link href="/tutors">Schedule New</Link>
        </Button>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {bookings.map((booking, i) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
            >
              <SpotlightCard className="p-0 overflow-hidden border-white/5 group">
                <div className="flex flex-col lg:flex-row items-center justify-between p-6 gap-6 bg-white/[0.02]">
                  {/* Partner Info */}
                  <div className="flex items-center gap-5 w-full lg:w-auto">
                    <div className="relative">
                      <Avatar className="size-14 rounded-2xl border border-white/10 ring-2 ring-transparent group-hover:ring-amber-500/30 transition-all">
                        <AvatarImage src={booking.partnerImage || ""} />
                        <AvatarFallback className="bg-amber-500 text-black font-black text-xl">
                          {booking.partnerName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          "absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-[#09090b]",
                          booking.status === "CONFIRMED"
                            ? "bg-green-500"
                            : "bg-amber-500",
                        )}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white italic uppercase tracking-tight">
                        {booking.partnerName}
                      </h3>
                      <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">
                        {booking.partnerEmail}
                      </p>
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="flex items-center gap-6 w-full lg:w-auto bg-white/5 lg:bg-transparent p-3 lg:p-0 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Clock className="size-5 text-amber-500" />
                      </div>
                      <div className="text-sm">
                        <p className="text-white font-black uppercase italic tracking-tighter">
                          {booking.date}
                        </p>
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                          {booking.timeSlot}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors",
                        booking.status === "CONFIRMED"
                          ? "bg-green-500/10 border-green-500/20 text-green-500"
                          : "bg-amber-500/10 border-amber-500/20 text-amber-500",
                      )}
                    >
                      {booking.status}
                    </span>

                    <div className="flex items-center gap-2">
                      {booking.status === "CONFIRMED" && booking.meetLink ? (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-amber-500/20 bg-amber-500/5 hover:bg-amber-500 hover:text-black gap-2 rounded-xl text-amber-500 font-black uppercase text-[10px] h-10 transition-all"
                        >
                          <Link href={booking.meetLink} target="_blank">
                            <Video className="size-4" />
                            Join Session
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="outline"
                          size="sm"
                          className="border-white/5 bg-white/5 gap-2 rounded-xl text-white/20 font-black uppercase text-[10px] h-10"
                        >
                          <Video className="size-4" />
                          Link Pending
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white/30 hover:text-white rounded-xl hover:bg-white/5"
                      >
                        <MoreVertical className="size-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {!loading && bookings.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01]"
        >
          <div className="size-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarDays className="size-8 text-white/20" />
          </div>
          <p className="text-white/40 font-black uppercase tracking-tighter text-lg">
            No active sessions found
          </p>
          <Link href="/tutors">
            <Button
              variant="link"
              className="text-amber-500 font-black mt-2 uppercase tracking-widest text-xs"
            >
              Find your first tutor →
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
