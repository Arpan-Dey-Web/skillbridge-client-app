"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  Edit3,
  User,
  DollarSign,
  BookOpen,
  Sparkles,
  Loader2,
  Clock,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

// Helper to map day numbers to names
const DAYS_MAP: Record<number, string> = {
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  7: "Sun",
};

export default function TutorSetupPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [tutorData, setTutorData] = useState<any>(null);
  const [availability, setAvailability] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        try {
          // Fetch Profile and Availability in parallel
          const [profileRes, availRes] = await Promise.all([
            fetch(
              `${process.env.NEXT_PUBLIC_APP_URL}/api/tutor/profile/${session.user.id}`,
              { credentials: "include" },
            ),
            fetch(
              `${process.env.NEXT_PUBLIC_APP_URL}/api/tutor/availability/${session.user.id}`,
              { credentials: "include" },
            ),
          ]);

          const profileJson = await profileRes.json();
          const availJson = await availRes.json();

          if (profileJson.success) setTutorData(profileJson.data);
          if (availJson.success) setAvailability(availJson.data);
        } catch (error) {
          console.error("Failed to fetch tutor details", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (!sessionPending) {
      fetchData();
    }
  }, [session, sessionPending]);

  if (sessionPending || loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#020617]">
        <Loader2 className="size-8 text-primary animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen py-20 px-4 bg-[#020617]">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* HEADER */}
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-widest"
            >
              <Sparkles className="size-3" /> Public Presence
            </motion.div>
            <h1 className="text-5xl font-black text-white tracking-tighter italic">
              Tutor <span className="shimmer-gold">Profile.</span>
            </h1>
          </div>

          <Link href="/dashboard/tutor/set-profile">
            <Button className="rounded-2xl bg-primary hover:bg-primary/90 text-black font-black px-6 shadow-lg shadow-primary/10">
              <Edit3 className="mr-2 size-4" /> EDIT DETAILS
            </Button>
          </Link>
        </div>

        <div className="grid gap-8">
          {/* MAIN PROFILE CARD */}
          <SpotlightCard className="p-8 border-white/10 bg-white/[0.02]">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="relative size-24 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center border border-primary/20 shadow-inner overflow-hidden">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    fill
                    className="object-cover"
                    alt="Profile"
                  />
                ) : (
                  <User className="size-12 text-primary" />
                )}
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                  {session?.user?.name}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-primary font-black text-xs uppercase tracking-widest">
                    <BookOpen className="size-3" /> Expert Instructor
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-700" />
                  <span className="text-slate-500 font-bold text-xs uppercase">
                    Level 1 Elite
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">
                    Hourly Investment
                  </p>
                  <p className="text-xl text-white font-black">
                    ${tutorData?.hourlyRate?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">
                    Current Specialty
                  </p>
                  <p className="text-xl text-white font-black">
                    {tutorData?.category?.name || "Unassigned"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-4">
                Professional Narrative
              </p>
              <p className="text-slate-400 leading-relaxed font-medium">
                {tutorData?.bio ||
                  "No biography provided yet. Hit edit to tell your story."}
              </p>
            </div>
          </SpotlightCard>

          {/* AVAILABILITY SECTION */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                  <CalendarDays className="size-4 text-primary" />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">
                  Active Teaching Hours
                </h3>
              </div>
              <Link href="/dashboard/tutor/availability">
                <Button
                  variant="link"
                  className="text-xs text-primary font-black uppercase tracking-widest p-0"
                >
                  Manage Schedule
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {availability.length > 0 ? (
                availability.map((slot, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={slot.id}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <div className="space-y-1">
                      <p className="text-[10px] text-primary font-black uppercase tracking-widest">
                        {DAYS_MAP[slot.dayOfWeek]}
                      </p>
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <Clock className="size-3 text-slate-500" />
                        {slot.startTime} - {slot.endTime}
                      </div>
                    </div>
                    <div className="size-2 rounded-full bg-primary/40 group-hover:bg-primary animate-pulse" />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full p-8 rounded-2xl border border-dashed border-white/10 text-center">
                  <p className="text-slate-500 text-sm italic font-medium">
                    No availability slots defined yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
