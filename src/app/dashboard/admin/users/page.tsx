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
  Mail,
  CalendarDays,
  ExternalLink,
  UserCheck,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // টোস্ট নোটিফিকেশনের জন্য
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";

export default function TotalUsers() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);

  console.log(users);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/stats`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setStats(json.data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/users`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setUsers(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // --- BAN/UNBAN লজিক ---
  const handleStatusUpdate = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
    const loadingToast = toast.loading(
      `Updating user status to ${newStatus}...`,
    );

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/users/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        },
      );

      const json = await res.json();

      if (json.success) {
        toast.success(json.message, { id: loadingToast });

        // পেজ রিফ্রেশ ছাড়া স্টেট আপডেট (Optimistic Update)
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user,
          ),
        );
      } else {
        toast.error(json.message, { id: loadingToast });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: loadingToast });
    }
  };

  return (
    <div className="space-y-8">
      {/* --- HEADER (Same as yours) --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            User <span className="text-amber-500">Directory</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Manage, verify, and monitor platform members.
          </p>
        </div>
      </div>

      {/* --- STATS GRID (Same as yours) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatMiniCard
          label="Total Members"
          value={stats?.total || 0}
          icon={<Users className="size-4 text-amber-500" />}
          trend={`${stats?.growthPercentage || 0}%`}
        />
        <StatMiniCard
          label="Tutors"
          value={stats?.tutors || 0}
          icon={<Briefcase className="size-4 text-orange-500" />}
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
      {/* <div className="flex flex-wrap items-center gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
          <Input
            placeholder="Search by name, email, or ID..."
            className="pl-10 bg-[#020617] border-white/10 text-white rounded-xl h-11 focus-visible:ring-amber-500/20"
          />
        </div>
        <select className="bg-[#020617] border-white/10 text-slate-400 text-[10px] font-black rounded-xl h-11 px-4 uppercase tracking-[0.1em] outline-none focus:border-amber-500 transition-colors cursor-pointer">
          <option>All Roles</option>
          <option>Students</option>
          <option>Tutors</option>
        </select>
        <Button
          variant="outline"
          className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl h-11"
        >
          <Filter className="size-4 mr-2 text-amber-500" /> Advanced
        </Button>
      </div> */}

      {/* --- USER TABLE --- */}
      <SpotlightCard className="p-0 border-white/5 overflow-hidden bg-white/[0.01]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Member
                </th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">
                  Role
                </th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">
                  Status
                </th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Joined Date
                </th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-20 text-center text-slate-500 font-bold animate-pulse italic"
                  >
                    Fetching records...
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    {/* User Info & Role (আপনার কোড অনুযায়ী) */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-transparent border border-white/5 flex items-center justify-center text-amber-500 font-black">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white leading-none">
                            {user.name}
                          </p>
                          <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-1.5 uppercase font-medium">
                            <Mail className="size-3 text-amber-500/50" />{" "}
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-lg text-[9px] font-black uppercase border",
                          user.role === "ADMIN"
                            ? "bg-red-500/10 text-red-500 border-red-500/20"
                            : "bg-blue-500/10 text-blue-500 border-blue-500/20",
                        )}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Status Column */}
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <div
                          className={cn(
                            "size-1.5 rounded-full animate-pulse",
                            user.status === "ACTIVE"
                              ? "bg-emerald-500"
                              : "bg-red-500",
                          )}
                        />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {user.status}
                        </span>
                      </div>
                    </td>

                    <td className="p-5">
                      <p className="text-xs text-slate-400 font-medium flex items-center gap-2">
                        <CalendarDays className="size-3.5 text-slate-600" />
                        {format(new Date(user.createdAt), "MMM dd, yyyy")}
                      </p>
                    </td>

                    {/* Actions Menu */}
                    <td className="p-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="size-8 p-0 hover:bg-white/5 text-slate-500"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-[#0f172a] border-white/10 text-white"
                        >
                          <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            Manage User
                          </DropdownMenuLabel>
                          <DropdownMenuItem
                            asChild
                            className="focus:bg-primary focus:text-background cursor-pointer"
                          >
                            <Link
                              href={`/dashboard/admin/users/user/${user.id}`}
                              className="flex w-full items-center"
                            >
                              <ExternalLink className="size-4 mr-2" />
                              <span className="font-bold uppercase tracking-widest text-[10px]">
                                View Profile
                              </span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/5" />
                          {/* Ban/Unban Dynamic Button */}
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(user.id, user.status)
                            }
                            className={cn(
                              "cursor-pointer font-bold",
                              user.status === "ACTIVE"
                                ? "text-red-500 focus:bg-red-500 focus:text-white"
                                : "text-emerald-500 focus:bg-emerald-500 focus:text-white",
                            )}
                          >
                            {user.status === "ACTIVE" ? (
                              <>
                                <UserX className="size-4 mr-2" /> Suspend Member
                              </>
                            ) : (
                              <>
                                <UserCheck className="size-4 mr-2" /> Activate
                                Member
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SpotlightCard>
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
                : "bg-amber-500/10 text-amber-500",
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
