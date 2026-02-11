"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  ShieldCheck,
  UserX,
  Users,
  GraduationCap,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function TotalUsers() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/stats`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setStats(json.data);
      });
  }, []);

  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            User <span className="shimmer-gold">Directory</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Manage, verify, and monitor platform members.
          </p>
        </div>
        <Button className="bg-primary text-black font-black rounded-xl h-12 px-6 shadow-lg shadow-primary/10 transition-transform active:scale-95">
          <UserPlus className="size-4 mr-2" /> Add New User
        </Button>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatMiniCard
          label="Total Members"
          value={stats?.total || 0}
          icon={<Users className="size-4 text-primary" />}
          trend={`${stats?.growthPercentage || 0}%`}
        />
        <StatMiniCard
          label="Tutors"
          value={stats?.tutors || 0}
          icon={<Briefcase className="size-4 text-amber-500" />}
        />
        <StatMiniCard
          label="Students"
          value={stats?.students || 0}
          icon={<GraduationCap className="size-4 text-blue-500" />}
        />
        <StatMiniCard
          label="Recent Joins"
          value={stats?.recentJoins || 0}
          icon={<TrendingUp className="size-4 text-emerald-500" />}
          isGrowth
        />
      </div>

      {/* --- SEARCH & FILTERS --- */}
      <div className="flex flex-wrap items-center gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
          <Input
            placeholder="Search by name, email, or ID..."
            className="pl-10 bg-[#020617] border-white/10 text-white rounded-xl h-11 focus-visible:ring-primary/20"
          />
        </div>
        <select className="bg-[#020617] border-white/10 text-slate-400 text-[10px] font-black rounded-xl h-11 px-4 uppercase tracking-[0.1em] outline-none focus:border-primary transition-colors cursor-pointer">
          <option>All Roles</option>
          <option>Students</option>
          <option>Tutors</option>
        </select>
        <Button
          variant="outline"
          className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl h-11"
        >
          <Filter className="size-4 mr-2 text-primary" /> Advanced
        </Button>
      </div>

      {/* --- USER TABLE --- */}
      <SpotlightCard className="p-0 border-white/5 overflow-hidden">
        {/* ... (Your existing Table Code) ... */}
      </SpotlightCard>

      {/* --- PAGINATION FOOTER --- */}
      <div className="flex items-center justify-between px-2">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          Showing {stats?.total || 0} platform members
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled
            className="h-8 text-[10px] font-black border-white/5 bg-white/5 text-slate-600"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled
            className="h-8 text-[10px] font-black border-white/10 bg-white/10 text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatMiniCard({ label, value, icon, trend, isGrowth }: any) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        {trend && (
          <span
            className={cn(
              "text-[10px] font-black px-2 py-0.5 rounded-full",
              isGrowth
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-primary/10 text-primary",
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          {label}
        </p>
        <h4 className="text-2xl font-black text-white">{value}</h4>
      </div>
    </div>
  );
}
