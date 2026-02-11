"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Video,
  MoreVertical,
  Filter,
  Search,
  CalendarDays,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bookings/all`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setBookings(res.data);
      })
      .catch((err) => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  
  // Filter logic based on current date
  const filteredBookings = bookings.filter((b) => {
    const isPast = new Date(b.endTime) < new Date();
    return activeTab === "past" ? isPast : !isPast;
  });

  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            System <span className="shimmer-gold">Bookings</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Monitor all active and historical sessions across the platform.
          </p>
        </div>

       
      </div>

      {/* --- TABS --- */}
      <div className="flex gap-8 border-b border-white/5">
        {(["upcoming", "past"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative",
              activeTab === tab
                ? "text-primary"
                : "text-slate-500 hover:text-slate-300",
            )}
          >
            {tab} Sessions
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              />
            )}
          </button>
        ))}
      </div>

      {/* --- SESSIONS LIST --- */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-20 text-slate-500 animate-pulse font-bold uppercase tracking-widest text-xs">
            Loading encrypted data...
          </div>
        ) : filteredBookings.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                "space-y-4",
                activeTab === "past" && "opacity-70 grayscale-[0.5]",
              )}
            >
              {filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  status={booking.status}
                  studentName={booking.studentName}
                  tutorName={booking.tutorName}
                  date={booking.date} // e.g. "2026-02-12"
                  time={booking.timeSlot}
                  price={booking.totalPrice}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
            <CalendarDays className="size-12 text-white/10 mb-4" />
            <p className="text-slate-500 font-bold">
              No {activeTab} sessions found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function BookingCard({
  status,
  studentName,
  tutorName,
  date,
  time,
  price,
}: any) {
  // Simple date formatter for the badge
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("en-US", { month: "short" });
  const day = dateObj.getDate();

  return (
    <SpotlightCard className="p-0 border-white/5 group">
      <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          {/* Date Badge */}
          <div className="flex flex-col items-center justify-center size-16 rounded-2xl bg-white/5 border border-white/10 shrink-0">
            <span className="text-[10px] font-black text-primary uppercase tracking-tighter">
              {month}
            </span>
            <span className="text-xl font-black text-white">{day}</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border",
                  status === "CONFIRMED"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                    : "bg-white/10 border-white/20 text-slate-400",
                )}
              >
                {status}
              </span>
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest">
                • ${price} Total
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
              <span className="text-slate-400 font-medium">Student:</span>{" "}
              {studentName}
            </h3>
            <p className="text-sm text-slate-400">
              Meeting with{" "}
              <span className="text-white font-semibold">{tutorName}</span>
            </p>

            <div className="flex items-center gap-4 text-slate-500 text-xs font-medium mt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-primary" /> {time}
              </span>
              <span className="flex items-center gap-1.5">
                <Video className="size-3.5 text-primary" /> Session ID:{" "}
                {Math.random().toString(36).substring(7).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-center">
          <Button
            variant="outline"
            className="h-10 rounded-xl border-white/10 bg-white/5 text-white text-xs font-bold px-5"
          >
            Logs
          </Button>
          <Button className="h-10 rounded-xl bg-primary text-black font-black text-xs px-5 shadow-lg shadow-primary/10 hover:bg-white transition-colors">
            Manage
          </Button>
          <button className="p-2 text-slate-500 hover:text-white transition-colors">
            <MoreVertical className="size-5" />
          </button>
        </div>
      </div>
    </SpotlightCard>
  );
}
