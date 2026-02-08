"use client"
import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Activity,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const platformStats = [
    {
      label: "Total Users",
      value: "12,842",
      icon: <Users className="text-primary" />,
      trend: "+14%",
    },
    {
      label: "Revenue Flow",
      value: "$42,500",
      icon: <TrendingUp className="text-primary" />,
      trend: "+8.2%",
    },
    {
      label: "Active Sessions",
      value: "312",
      icon: <Activity className="text-primary" />,
      trend: "Live",
    },
    {
      label: "Pending Verifications",
      value: "18",
      icon: <ShieldCheck className="text-primary" />,
      trend: "Priority",
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
            System-wide overview and administrative actions.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl h-11"
          >
            Generate Report
          </Button>
          <Button className="bg-primary text-black font-black rounded-xl h-11 shadow-lg shadow-primary/20">
            System Settings
          </Button>
        </div>
      </header>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-3xl font-black text-white tracking-tighter mb-1">
                {stat.value}
              </h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </SpotlightCard>
          </motion.div>
        ))}
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
                className="p-0 border-white/5 overflow-hidden"
              >
                <div className="flex items-center justify-between p-5 bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <AlertTriangle className="size-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Reported Content: Session #8421
                      </h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                        Flagged by: Student ID _921
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-slate-500 hover:text-white h-8 text-[10px] font-black uppercase"
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
            System Health
          </h2>
          <SpotlightCard className="p-6 border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="space-y-6">
              <HealthBar
                label="API Response"
                value="98%"
                status="Optimal"
                color="bg-primary"
              />
              <HealthBar
                label="Database Load"
                value="24%"
                status="Low"
                color="bg-emerald-500"
              />
              <HealthBar
                label="Storage"
                value="62%"
                status="Normal"
                color="bg-blue-500"
              />
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Current Version
                </span>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  v2.4.1-stable
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
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </div>
  );
}

