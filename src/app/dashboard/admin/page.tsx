"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  Activity,
  ArrowUpRight,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const [liveStats, setLiveStats] = useState<any>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // Only fetch if the user is confirmed as ADMIN
    if (session?.user?.role === "ADMIN") {
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/stats`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) setLiveStats(json.data);
        })
        .catch((err) => console.error("Error fetching stats:", err))
        .finally(() => setFetching(false));
    }
  }, [session]);

  // --- SECURITY REDIRECTS ---
  if (isPending) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="size-10 text-primary animate-spin" />
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
          Authenticating Access
        </p>
      </div>
    );
  }

  if (session?.user?.role !== "ADMIN") {
    const dest =
      session?.user?.role === "TUTOR" ? "/dashboard/tutor" : "/dashboard";
    redirect(dest);
    return null;
  }

  // --- DYNAMIC STATS CONFIG ---
  const platformStats = [
    {
      label: "Total Users",
      value: liveStats?.total?.toLocaleString() || "0",
      icon: <Users className="text-primary" />,
      trend: `+${liveStats?.growthPercentage || 0}%`,
      sub: "Lifetime",
    },
    {
      label: "Professional Tutors",
      value: liveStats?.tutors?.toLocaleString() || "0",
      icon: <TrendingUp className="text-primary" />,
      trend: "Active",
      sub: "Verified",
    },
    {
      label: "Active Students",
      value: liveStats?.students?.toLocaleString() || "0",
      icon: <Activity className="text-primary" />,
      trend: "Learning",
      sub: "Enrolled",
    },
    {
      label: "New Joins",
      value: liveStats?.recentJoins?.toLocaleString() || "0",
      icon: <ShieldCheck className="text-primary" />,
      trend: "Last 30d",
      sub: "High Growth",
    },
  ];

  return (
    <div className="space-y-10">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Platform <span className="shimmer-gold">Control</span>
          </h1>
          <p className="text-slate-500 font-medium">
            System-wide overview for{" "}
            <span className="text-white">{session.user.name}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl h-11 text-xs font-bold"
          >
            Generate Report
          </Button>
          <Button className="bg-primary text-black font-black rounded-xl h-11 shadow-lg shadow-primary/20 hover:bg-white transition-colors">
            System Settings
          </Button>
        </div>
      </header>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {platformStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <SpotlightCard className="p-6 border-white/5 bg-white/[0.02]">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                    {stat.icon}
                  </div>
                  <span className="text-[9px] font-black text-primary border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-widest">
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter mb-1">
                  {fetching ? "..." : stat.value}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <span className="text-[9px] font-bold text-slate-600 uppercase">
                    {stat.sub}
                  </span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- MODERATION QUEUE --- */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Moderation Queue{" "}
              <span className="size-2 rounded-full bg-red-500 animate-pulse" />
            </h2>
            <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((item, i) => (
              <SpotlightCard
                key={i}
                className="p-0 border-white/5 overflow-hidden group"
              >
                <div className="flex items-center justify-between p-5 bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <AlertTriangle className="size-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Flagged Content: Session #{8420 + i}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                        Violation: Suspicious Activity detected
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-slate-500 hover:text-white h-8 text-[10px] font-black uppercase hover:bg-white/5"
                    >
                      Dismiss
                    </Button>
                    <Button
                      size="sm"
                      className="bg-white/10 text-white hover:bg-white/20 h-8 text-[10px] font-black uppercase px-4"
                    >
                      Review
                    </Button>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* --- SYSTEM HEALTH --- */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            System Status
          </h2>
          <SpotlightCard className="p-6 border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="space-y-6">
              <HealthBar
                label="API Engine"
                value="98%"
                status="Optimal"
                color="bg-primary"
              />
              <HealthBar
                label="Database"
                value="24%"
                status="Stable"
                color="bg-emerald-500"
              />
              <HealthBar
                label="CDN Edge"
                value="62%"
                status="Healthy"
                color="bg-blue-500"
              />
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Environment
                </span>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                  Production
                </span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}

function HealthBar({ label, value, status, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-500">{label}</span>
        <span className="text-white">{status}</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: value }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className={cn(
            "h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]",
            color,
          )}
        />
      </div>
    </div>
  );
}
