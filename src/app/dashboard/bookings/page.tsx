"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Video, Clock, MoreVertical } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import Link from "next/link";

export default function StudentBookings() {
  const [bookings, setBookings] = useState([]);
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
    return <div className="text-white animate-pulse">Loading bookings...</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter">
            My <span className="text-amber-500">Bookings</span>
          </h1>
          <p className="text-white/50 text-sm">
            Manage your upcoming and past learning sessions.
          </p>
        </div>
        <Button className="bg-amber-500 text-black font-bold rounded-xl px-6 hover:bg-amber-600">
          Schedule New
        </Button>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {bookings?.map((booking, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <SpotlightCard className="p-0 overflow-hidden border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-6 bg-white/5">
                {/* Partner Info (Tutor or Student) */}
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <Avatar className="size-14 rounded-2xl border border-white/10">
                    <AvatarImage src={booking.partnerImage} />
                    <AvatarFallback className="bg-amber-500 text-black font-bold">
                      {booking.partnerName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {booking.partnerName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-white/40 font-bold uppercase tracking-wider">
                      <span>{booking.partnerEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="flex flex-wrap gap-6 w-full md:w-auto">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-amber-500" />
                    <div className="text-sm">
                      <p className="text-white font-medium">{booking.date}</p>
                      <p className="text-white/40 text-xs">
                        {booking.timeSlot}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      booking.status === "CONFIRMED"
                        ? "bg-green-500/10 border-green-500/20 text-green-500"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                    }`}
                  >
                    {booking.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 hover:bg-white/5 gap-2 rounded-lg text-white"
                    >
                      <Video className="size-4 text-amber-500" />
                      Join Room
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/30"
                    >
                      <MoreVertical className="size-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && bookings.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-white/10 rounded-[2.5rem]">
          <p className="text-white/40 font-medium">
            You haven't booked any sessions yet.
          </p>
          <Link href="/tutors">
            <Button variant="link" className="text-amber-500 font-bold mt-2">
              Find your first tutor
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
