"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  CalendarDays,
  Wallet,
  ArrowUpRight,
  Settings2,
  FileText,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getSessionFromConsole } from "@/lib/auth-client";

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: sessionData } = getSessionFromConsole.useSession();
  const token = sessionData?.session?.token;
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setBookings(res.data);
      })
      .catch(() => toast.error("Failed to load global bookings"))
      .finally(() => setLoading(false));
  }, []);

  const filteredBookings = bookings.filter((b) => {
    const isPast =
      new Date(b.endTime) < new Date() ||
      b.status === "COMPLETED" ||
      b.status === "CANCELLED";
    return activeTab === "past" ? isPast : !isPast;
  });

  const totalRevenue = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="space-y-8 transition-colors duration-500">
      {/* --- HEADER & ANALYTICS --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase italic leading-none">
            Global <span className="shimmer-gold">Operations</span>
          </h1>
          <p className="text-muted-foreground font-medium text-sm mt-3">
            System Monitoring:{" "}
            <span className="text-foreground font-black">
              {bookings.length}
            </span>{" "}
            Active Lifecycle Sessions
          </p>
        </div>

        <div className="bg-card border border-border p-4 rounded-2xl flex items-center gap-6 shadow-sm min-w-[240px]">
          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10">
            <Wallet className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">
              Platform Volume
            </p>
            <h3 className="text-2xl font-black text-foreground italic tracking-tighter">
              ${totalRevenue.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* --- TABS --- */}
      <div className="flex gap-8 border-b border-border">
        {(["upcoming", "past"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative",
              activeTab === tab
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab} Sessions
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* --- SESSIONS LIST --- */}
      <div className="space-y-4">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center bg-card/50 rounded-[2rem] border border-dashed border-border">
            <div className="shimmer-gold font-black italic animate-pulse uppercase tracking-widest text-xs">
              Synchronizing_Global_Logs...
            </div>
          </div>
        ) : filteredBookings.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-border rounded-[3rem] bg-secondary/30">
            <CalendarDays className="size-12 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground font-black uppercase tracking-[0.3em] text-[10px]">
              Null Record: No {activeTab} Activity
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
    <SpotlightCard className="p-0 border-border bg-card shadow-sm group hover:border-primary/40 transition-all duration-500 rounded-3xl overflow-hidden">
      <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* Adaptive Date Badge */}
          <div className="flex flex-col items-center justify-center size-16 rounded-2xl bg-secondary border border-border group-hover:bg-primary/5 transition-colors">
            <span className="text-[9px] font-black text-primary uppercase">
              {month}
            </span>
            <span className="text-2xl font-black text-foreground leading-none italic">
              {day}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border",
                  booking.status === "COMPLETED"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-500"
                    : "bg-primary/10 border-primary/20 text-primary",
                )}
              >
                {booking.status}
              </span>
              <span className="text-muted-foreground text-[8px] font-black uppercase tracking-widest bg-secondary px-2 py-0.5 rounded-lg border border-border">
                ID_{booking.id.slice(0, 8)}
              </span>
            </div>

            <h3 className="text-lg font-black text-foreground tracking-tight flex items-center gap-2 uppercase italic leading-none">
              {booking.studentName}
              <ArrowUpRight className="size-3 text-muted-foreground/40 group-hover:text-primary transition-colors" />
              <span className="text-muted-foreground font-medium lowercase">
                with
              </span>
              <span className="text-primary/80">{booking.tutorName}</span>
            </h3>

            <div className="flex items-center gap-4 text-muted-foreground text-[9px] font-black uppercase tracking-[0.1em] mt-2">
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

        <div className="flex items-center gap-3 md:justify-end border-t lg:border-t-0 border-border pt-4 lg:pt-0">
          <Button
            variant="ghost"
            className="h-10 px-5 rounded-xl text-muted-foreground hover:text-foreground font-black text-[9px] uppercase tracking-widest gap-2"
          >
            <FileText className="size-3.5" /> Session Logs
          </Button>
          <Button className="h-10 px-6 rounded-xl bg-secondary border border-border text-foreground hover:bg-foreground hover:text-background font-black text-[9px] uppercase tracking-widest transition-all gap-2">
            <Settings2 className="size-3.5" /> Manage
          </Button>
        </div>
      </div>
    </SpotlightCard>
  );
}
