"use client";
import { authClient } from "@/lib/auth-client";
import {
  Users,
  Calendar,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { motion } from "framer-motion";

export default function TutorDashboard() {
  const { data: session } = authClient.useSession();
  const [stats] = useState({
    totalRevenue: "1,240.00",
    totalSessions: 42,
    avgRating: 4.9,
    activeStudents: 12,
  });

  return (
    <div className="space-y-10">
      {/* --- Section 1: Welcome Header --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Welcome,{" "}
            <span className="shimmer-gold">
              Prof. {session?.user?.name?.split(" ")[0]}
            </span>
          </h1>
          <p className="text-slate-500 font-medium">
            Your teaching empire is growing. Here is your overview.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-all">
            View Public Profile
          </button>
        </div>
      </header>

      {/* --- Section 2: Analytics Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Revenue"
          value={`$${stats.totalRevenue}`}
          icon={<DollarSign className="text-primary" />}
          trend="+12% this month"
        />
        <StatCard
          title="Sessions"
          value={stats.totalSessions}
          icon={<Calendar className="text-primary" />}
          trend="4 today"
        />
        <StatCard
          title="Rating"
          value={stats.avgRating}
          icon={<Star className="text-primary" />}
          trend="Top 5% Tutor"
        />
        <StatCard
          title="Students"
          value={stats.activeStudents}
          icon={<Users className="text-primary" />}
          trend="2 new joins"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Section 3: Upcoming Bookings --- */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Upcoming Sessions
            </h2>
            <Link
              href="/dashboard/sessions"
              className="text-xs font-bold text-primary hover:underline uppercase tracking-widest"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {[1, 2].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <SpotlightCard className="p-0 border-white/5">
                  <div className="flex items-center justify-between p-5 bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-white/10 flex items-center justify-center text-primary font-bold">
                        AJ
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Alice Johnson</h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <Clock className="size-3 text-primary" /> 10 Feb •
                          10:00 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        Confirmed
                      </span>
                      <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400">
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Section 4: Sidebar Actions --- */}
        <div className="space-y-6">
          <SpotlightCard className="bg-primary p-8 border-none relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 size-24 bg-white/20 blur-2xl rounded-full group-hover:bg-white/30 transition-all" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="size-5 text-black" />
                <span className="text-[10px] font-black text-black uppercase tracking-[0.2em]">
                  Active Profile
                </span>
              </div>
              <h3 className="text-2xl font-black text-black leading-tight mb-6">
                Your profile is visible to students.
              </h3>
              <Link
                href="/tutor/availability"
                className="block w-full text-center py-4 bg-black text-white rounded-2xl font-black text-sm hover:scale-[1.02] transition-transform"
              >
                Edit Availability
              </Link>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6 border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-primary size-5" />
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                Growth Tip
              </h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Tutors who respond within{" "}
              <span className="text-white font-bold">1 hour</span> are 3x more
              likely to get booked. Turn on mobile notifications.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: any) {
  return (
    <SpotlightCard className="p-6 border-white/5 bg-white/[0.02]">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          {title}
        </span>
      </div>
      <div>
        <h3 className="text-3xl font-black text-white tracking-tighter mb-1">
          {value}
        </h3>
        <p className="text-[10px] font-bold text-primary/60 uppercase tracking-tighter">
          {trend}
        </p>
      </div>
    </SpotlightCard>
  );
}
