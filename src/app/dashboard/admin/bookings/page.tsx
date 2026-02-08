"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  MoreVertical,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Your <span className="shimmer-gold">Sessions</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Manage your learning and teaching schedule.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
            <Input
              placeholder="Search sessions..."
              className="pl-10 bg-white/5 border-white/10 text-white rounded-xl w-64 focus-visible:ring-primary/20"
            />
          </div>
          <Button
            variant="outline"
            className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl"
          >
            <Filter className="size-4 mr-2 text-primary" /> Filter
          </Button>
        </div>
      </div>

      {/* --- TABS --- */}
      <div className="flex gap-8 border-b border-white/5">
        {["upcoming", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
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
        <AnimatePresence mode="wait">
          {activeTab === "upcoming" ? (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <BookingCard
                status="Confirmed"
                name="Dr. Aris Thorne"
                subject="Advanced Quantum Mechanics"
                date="Feb 12, 2026"
                time="14:00 - 15:30"
                avatar="AT"
              />
              <BookingCard
                status="Pending"
                name="Sarah Jenkins"
                subject="Intro to Next.js 15"
                date="Feb 15, 2026"
                time="09:00 - 10:00"
                avatar="SJ"
              />
            </motion.div>
          ) : (
            <motion.div
              key="past"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="opacity-60 grayscale"
            >
              <BookingCard
                status="Completed"
                name="Marcus Aurelius"
                subject="Stoic Philosophy 101"
                date="Jan 28, 2026"
                time="11:00 - 12:00"
                avatar="MA"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BookingCard({ status, name, subject, date, time, avatar }: any) {
  return (
    <SpotlightCard className="p-0 border-white/5 group">
      <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          {/* Date Badge */}
          <div className="hidden sm:flex flex-col items-center justify-center size-16 rounded-2xl bg-white/5 border border-white/10 shrink-0">
            <span className="text-[10px] font-black text-primary uppercase tracking-tighter">
              {date.split(" ")[0]}
            </span>
            <span className="text-xl font-black text-white">
              {date.split(" ")[1].replace(",", "")}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border",
                  status === "Confirmed"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                    : status === "Pending"
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                      : "bg-white/10 border-white/20 text-slate-400",
                )}
              >
                {status}
              </span>
              <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                • {subject}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-primary" /> {time}
              </span>
              <span className="flex items-center gap-1.5">
                <Video className="size-3.5 text-primary" /> Zoom Meeting
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-center">
          <Button
            variant="outline"
            className="h-10 rounded-xl border-white/10 bg-white/5 text-white text-xs font-bold px-5"
          >
            Details
          </Button>
          <Button className="h-10 rounded-xl bg-primary text-black font-black text-xs px-5 shadow-lg shadow-primary/10">
            {status === "Confirmed" ? "Join Call" : "Manage"}
          </Button>
          <button className="p-2 text-slate-500 hover:text-white transition-colors">
            <MoreVertical className="size-5" />
          </button>
        </div>
      </div>
    </SpotlightCard>
  );
}
