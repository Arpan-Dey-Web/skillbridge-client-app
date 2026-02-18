"use client";
import React, { useEffect, useState } from "react";
import {
  MoreHorizontal,
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
import { toast } from "sonner";
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
import { getSessionFromConsole } from "@/lib/auth-client";

export default function TotalUsers() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: sessionData } = getSessionFromConsole.useSession();
  const token = sessionData?.session?.token;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setStats(json.data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setUsers(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStatusUpdate = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
    const loadingToast = toast.loading(
      `Updating user status to ${newStatus}...`,
    );

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        },
      );

      const json = await res.json();

      if (json.success) {
        toast.success(json.message, { id: loadingToast });
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
    <div className="space-y-8 transition-colors duration-500">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase italic leading-none">
            User <span className="shimmer-gold">Directory</span>
          </h1>
          <p className="text-muted-foreground font-medium text-sm mt-2">
            Manage, verify, and monitor platform members.
          </p>
        </div>
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

      {/* --- USER TABLE --- */}
      <SpotlightCard className="p-0 border-border overflow-hidden bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Member
                </th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">
                  Role
                </th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">
                  Status
                </th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Joined Date
                </th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-20 text-center text-muted-foreground font-bold animate-pulse italic uppercase text-[10px] tracking-[0.3em]"
                  >
                    Fetching records...
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="group hover:bg-secondary/30 transition-colors"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-secondary flex items-center justify-center text-primary font-black border border-border">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground leading-none italic uppercase">
                            {user.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1.5 uppercase font-black">
                            <Mail className="size-3 text-primary/50" />{" "}
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
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : "bg-blue-500/10 text-blue-500 border-blue-500/20",
                        )}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <div
                          className={cn(
                            "size-1.5 rounded-full animate-pulse",
                            user.status === "ACTIVE"
                              ? "bg-emerald-500"
                              : "bg-destructive",
                          )}
                        />
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                          {user.status}
                        </span>
                      </div>
                    </td>

                    <td className="p-5">
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter flex items-center gap-2">
                        <CalendarDays className="size-3.5 text-muted-foreground/40" />
                        {format(new Date(user.createdAt), "MMM dd, yyyy")}
                      </p>
                    </td>

                    <td className="p-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="size-8 p-0 hover:bg-secondary text-muted-foreground"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-card border-border text-foreground rounded-2xl shadow-xl"
                        >
                          <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground p-3">
                            Manage Member
                          </DropdownMenuLabel>
                          <DropdownMenuItem
                            asChild
                            className="focus:bg-primary focus:text-primary-foreground cursor-pointer rounded-lg mx-1"
                          >
                            <Link
                              href={`/dashboard/admin/users/user/${user.id}`}
                              className="flex w-full items-center p-2"
                            >
                              <ExternalLink className="size-4 mr-2" />
                              <span className="font-black uppercase tracking-widest text-[9px]">
                                View Profile
                              </span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border mx-1" />
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(user.id, user.status)
                            }
                            className={cn(
                              "cursor-pointer font-black uppercase tracking-widest text-[9px] rounded-lg mx-1 p-2",
                              user.status === "ACTIVE"
                                ? "text-destructive focus:bg-destructive focus:text-destructive-foreground"
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
    <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="size-8 rounded-lg bg-secondary flex items-center justify-center border border-border">
          {icon}
        </div>
        {trend && (
          <span
            className={cn(
              "text-[9px] font-black px-2 py-0.5 rounded-full border",
              isGrowth
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20"
                : "bg-primary/10 text-primary border-primary/20",
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
          {label}
        </p>
        <h4 className="text-2xl font-black text-foreground uppercase italic tracking-tighter">
          {value}
        </h4>
      </div>
    </div>
  );
}
