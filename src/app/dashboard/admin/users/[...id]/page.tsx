"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  UserX,
  UserCheck,
  Activity,
  Calendar,
  ShieldAlert,
  CreditCard,
  CheckCircle2,
  XCircle,
  Timer,
  ExternalLink,
  Phone,
  Zap,
  Clock,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function UserDetails() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const userId = Array.isArray(params?.id)
    ? params.id[params.id.length - 1]
    : params?.id;

  useEffect(() => {
    if (userId) {
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/user/${userId}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) setUser(json.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [userId]);

  const handleToggleStatus = async () => {
    const newStatus = user.status === "ACTIVE" ? "BANNED" : "ACTIVE";
    const toastId = toast.loading(`Updating status...`);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/users/${user.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        },
      );

      const json = await res.json();
      if (json.success) {
        toast.success(`Member is now ${newStatus}`, { id: toastId });
        setUser({ ...user, status: newStatus });
      }
    } catch (error) {
      toast.error("Action failed", { id: toastId });
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="shimmer-gold text-2xl font-black italic tracking-tighter">
          LOADING_ENCRYPTED_DATA...
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="text-center py-20 text-foreground font-black italic uppercase">
        Access Denied: Record Missing
      </div>
    );
  console.log(user);
  return (
    <div className="max-w-7xl mx-auto space-y-10 p-6 lg:p-12 animate-in fade-in duration-700">
      {/* --- TOP BAR --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent text-slate-500 hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft className="size-4 mr-2" />
            <span className="font-bold uppercase tracking-[0.2em] text-[9px]">
              Back to Control Center
            </span>
          </Button>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
            Member <span className="shimmer-gold">Analysis</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="border-primary/20 bg-primary/5 text-primary text-[10px] py-1.5 px-4 rounded-full font-bold"
          >
            UID: {user.id.slice(0, 12)}...
          </Badge>
          <div
            className={cn(
              "size-3 rounded-full animate-pulse",
              user.status === "ACTIVE"
                ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                : "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]",
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- LEFT PROFILE CARD --- */}
        <div className="lg:col-span-4 space-y-6">
          <SpotlightCard className="p-1 border-primary/10 bg-card rounded-[2.5rem] overflow-hidden">
            <div className="p-8 text-center space-y-6">
              <div className="relative inline-block animate-float">
                <div className="size-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center text-background text-5xl font-black shadow-2xl shadow-primary/20">
                  {/* {user.name?.[0]} */}
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt="user Profile Image"
                      fill
                      className=" rounded-2xl"
                      sizes="max-w-4xl"
                    />
                  ) : (
                    user.name?.[0]
                  )}
               
                </div>
                <div className="absolute -bottom-2 -right-2 bg-background border-2 border-border p-2 rounded-2xl shadow-xl">
                  {user.role === "TUTOR" ? (
                    <Zap className="size-5 text-primary fill-primary" />
                  ) : (
                    <ShieldAlert className="size-5 text-blue-500" />
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-2">
                  {user.name}
                </h2>
                <p className="text-slate-500 text-xs font-medium flex items-center justify-center gap-2 tracking-wide">
                  <Mail className="size-3 text-primary" /> {user.email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-background/50 border border-border p-3 rounded-2xl">
                  <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    Status
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-black uppercase",
                      user.status === "ACTIVE"
                        ? "text-emerald-500"
                        : "text-red-500",
                    )}
                  >
                    {user.status}
                  </span>
                </div>
                <div className="bg-background/50 border border-border p-3 rounded-2xl">
                  <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    Role
                  </span>
                  <span className="text-[10px] font-black text-primary uppercase">
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <Button
                  onClick={handleToggleStatus}
                  className={cn(
                    "w-full h-14 rounded-2xl font-black uppercase tracking-[0.1em] text-[10px] transition-all duration-500",
                    user.status === "ACTIVE"
                      ? "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white"
                      : "bg-primary text-background hover:scale-[1.02] shadow-lg shadow-primary/20",
                  )}
                >
                  {user.status === "ACTIVE" ? (
                    <>
                      <UserX className="size-4 mr-2" /> Suspend Member
                    </>
                  ) : (
                    <>
                      <UserCheck className="size-4 mr-2" /> Revoke Ban
                    </>
                  )}
                </Button>
              </div>
            </div>
          </SpotlightCard>

          {/* Quick Info Box */}
          <div className="p-6 rounded-[2.5rem] bg-card border border-border space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Phone
              </span>
              <span className="text-xs font-bold">{user.phone || "---"}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Verification
              </span>
              <Badge
                className={
                  user.emailVerified
                    ? "bg-emerald-500/10 text-emerald-500 text-[8px]"
                    : "bg-red-500/10 text-red-500 text-[8px]"
                }
              >
                {user.emailVerified ? "CERTIFIED" : "PENDING"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Join Date
              </span>
              <span className="text-xs font-bold">
                {format(new Date(user.createdAt), "MMM dd, yyyy")}
              </span>
            </div>
          </div>
        </div>

        {/* --- RIGHT ACTIVITY & STATS --- */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <MetricCard
              label="Global Bookings"
              value={user._count?.bookings || 0}
              icon={<Calendar className="text-primary" />}
            />
            <MetricCard
              label="Activity Index"
              value={user._count?.reviews || 0}
              icon={<Activity className="text-amber-500" />}
            />
            <MetricCard
              label="Revenue Flow"
              value={`$${user.bookings?.reduce((acc: any, curr: any) => acc + (curr.totalPrice || 0), 0)}`}
              icon={<CreditCard className="text-emerald-500" />}
            />
          </div>

          <SpotlightCard className="p-8 border-border bg-card/50 rounded-[2.5rem]">
            <h3 className="text-xl font-black italic uppercase tracking-tighter mb-8 flex items-center gap-3">
              <Timer className="size-5 text-primary" /> Recent Operations Log
            </h3>

            <div className="space-y-4">
              {user.bookings?.map((booking: any) => (
                <div
                  key={booking.id}
                  className="group p-5 rounded-3xl bg-background/40 border border-border hover:border-primary/30 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-5">
                    <div className="size-12 rounded-2xl bg-border flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <CheckCircle2
                        className={cn(
                          "size-6",
                          booking.status === "COMPLETED"
                            ? "text-emerald-500"
                            : "text-primary",
                        )}
                      />
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase italic tracking-wider">
                        Session ID: {booking.id.slice(0, 8)}
                      </h4>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />{" "}
                          {format(new Date(booking.startTime), "hh:mm a")}
                        </span>
                        <span className="flex items-center gap-1 font-black text-primary/50">
                          •
                        </span>
                        <span>
                          {format(new Date(booking.startTime), "dd MMM, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-500 uppercase mb-1">
                        Total Fee
                      </p>
                      <p className="text-xl font-black shimmer-gold">
                        ${booking.totalPrice}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-xl border-border hover:bg-primary hover:text-background transition-all"
                      asChild
                    >
                      <a
                        href={booking.meetLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon }: any) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-card border border-border group hover:border-primary/20 transition-all">
      <div className="size-10 rounded-2xl bg-background border border-border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">
        {label}
      </p>
      <h3 className="text-4xl font-black italic tracking-tighter shimmer-gold">
        {value}
      </h3>
    </div>
  );
}
