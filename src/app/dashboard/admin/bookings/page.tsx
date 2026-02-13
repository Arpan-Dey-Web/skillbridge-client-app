"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Video,
  MoreVertical,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Timer,
  Wallet,
  ArrowUpRight,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
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
      .catch(() => toast.error("Failed to load global bookings"))
      .finally(() => setLoading(false));
  }, []);

  // Filter logic: "Upcoming" means CONFIRMED/PENDING and time > now. "Past" means COMPLETED/CANCELLED or time < now.
  const filteredBookings = bookings.filter((b) => {
    const isPast =
      new Date(b.endTime) < new Date() ||
      b.status === "COMPLETED" ||
      b.status === "CANCELLED";
    return activeTab === "past" ? isPast : !isPast;
  });

  // Calculate quick stats
  const totalRevenue = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="space-y-10">
      {/* --- HEADER & ANALYTICS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Global <span className="shimmer-gold">Operations</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Managing <span className="text-white">{bookings.length}</span>{" "}
            recorded sessions across the ecosystem.
          </p>
        </div>

        {/* Quick Revenue Stat Card */}
        <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Total Volume
            </p>
            <h3 className="text-2xl font-black shimmer-gold">
              ${totalRevenue}
            </h3>
          </div>
          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Wallet className="size-5 text-primary" />
          </div>
        </div>
      </div>

      {/* --- TABS --- */}
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
          <div className="text-center py-20 bg-white/[0.01] rounded-[2rem] border border-dashed border-white/5">
            <div className="shimmer-gold font-black italic animate-pulse">
              FETCHING_ALL_RECORDS...
            </div>
          </div>
        ) : filteredBookings.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
            <CalendarDays className="size-16 text-white/5 mb-4 animate-float" />
            <p className="text-slate-600 font-black uppercase tracking-widest text-[10px]">
              No {activeTab} activity logged in the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function BookingCard({ booking }: { booking: any }) {
  const dateObj = new Date(booking.date);
  const month = dateObj.toLocaleString("en-US", { month: "short" });
  const day = dateObj.getDate();

  return (
    <SpotlightCard className="p-0 border-white/5 group hover:border-primary/20 transition-all duration-500">
      <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* Date Badge */}
          <div className="flex flex-col items-center justify-center size-16 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:border-primary/30 transition-colors">
            <span className="text-[9px] font-black text-primary uppercase">
              {month}
            </span>
            <span className="text-2xl font-black text-white leading-none">
              {day}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
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
              <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-lg">
                ID: {booking.id.slice(0, 8)}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
              {booking.studentName}
              <ArrowUpRight className="size-3 text-slate-600" />
              <span className="text-slate-400 font-medium">
                {booking.tutorName}
              </span>
            </h3>

            <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3 text-primary" /> {booking.timeSlot}
              </span>
              <span className="flex items-center gap-1.5">
                <Wallet className="size-3 text-emerald-500" /> $
                {booking.totalPrice}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:justify-end border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
          <Button
            variant="ghost"
            className="h-10 rounded-xl hover:bg-white/5 text-slate-400 font-bold text-[10px] uppercase tracking-widest"
          >
            Session Logs
          </Button>
          <Button className="h-10 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-black font-black text-[10px] uppercase tracking-widest transition-all">
            Manage
          </Button>
        </div>
      </div>
    </SpotlightCard>
  );
}
