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
  Timer,
  ExternalLink,
  Zap,
  Clock,
  ShieldCheck,
  Phone,
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

  if (loading) return <LoaderScreen />;
  if (!user)
    return (
      <div className="p-20 text-center font-black uppercase italic">
        Record Not Found
      </div>
    );

  const totalSpent =
    user.bookings?.reduce(
      (acc: any, curr: any) => acc + (curr.totalPrice || 0),
      0,
    ) || 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* --- NAV & ACTIONS --- */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="group hover:bg-transparent p-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-black uppercase tracking-widest text-[10px]">
            Back to Directory
          </span>
        </Button>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="font-black text-[9px] uppercase border-border px-3 py-1"
          >
            UID: {user.id.slice(0, 12)}
          </Badge>
          <Button
            onClick={handleToggleStatus}
            variant="outline"
            className={cn(
              "h-9 px-4 rounded-xl font-black uppercase text-[9px] tracking-widest transition-all",
              user.status === "ACTIVE"
                ? "border-destructive/20 text-destructive hover:bg-destructive hover:text-white"
                : "border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white",
            )}
          >
            {user.status === "ACTIVE" ? (
              <UserX className="size-3 mr-2" />
            ) : (
              <UserCheck className="size-3 mr-2" />
            )}
            {user.status === "ACTIVE" ? "Suspend Account" : "Activate Account"}
          </Button>
        </div>
      </div>

      {/* --- HERO IDENTITY SECTION --- */}
      <SpotlightCard className="p-8 border-border bg-card shadow-sm rounded-[2rem]">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="size-32 rounded-3xl bg-secondary border-2 border-border overflow-hidden shadow-2xl flex items-center justify-center">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-4xl font-black italic">
                  {user.name?.[0]}
                </span>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 p-2 bg-background border border-border rounded-xl shadow-lg">
              {user.role === "TUTOR" ? (
                <Zap className="size-4 text-primary" />
              ) : (
                <ShieldCheck className="size-4 text-blue-500" />
              )}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase italic leading-none">
                {user.name}
              </h1>
              <Badge
                className={cn(
                  "w-fit mx-auto md:mx-0 font-black text-[9px] uppercase tracking-widest py-1",
                  user.role === "ADMIN"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-primary/10 text-primary",
                )}
              >
                {user.role}
              </Badge>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-muted-foreground">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider">
                <Mail className="size-3 text-primary" /> {user.email}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider">
                <Calendar className="size-3 text-primary" /> Joined{" "}
                {format(new Date(user.createdAt), "MMM yyyy")}
              </div>
              {user.phone && (
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider">
                  <Phone className="size-3 text-primary" /> {user.phone}
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:block h-16 w-px bg-border mx-4" />

          <div className="text-center md:text-right">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-1">
              Account Health
            </p>
            <div className="flex items-center justify-center md:justify-end gap-2">
              <span
                className={cn(
                  "text-xl font-black italic uppercase",
                  user.status === "ACTIVE"
                    ? "text-emerald-500"
                    : "text-destructive",
                )}
              >
                {user.status}
              </span>
              <div
                className={cn(
                  "size-2 rounded-full animate-pulse",
                  user.status === "ACTIVE"
                    ? "bg-emerald-500"
                    : "bg-destructive",
                )}
              />
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* --- STATS BENTO --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BentoMetric
          label="Global Sessions"
          value={user._count?.bookings || 0}
          icon={<Calendar className="text-primary" />}
        />
        <BentoMetric
          label="Activity Reviews"
          value={user._count?.reviews || 0}
          icon={<Activity className="text-blue-500" />}
        />
        <BentoMetric
          label="Platform Volume"
          value={`$${totalSpent}`}
          icon={<CreditCard className="text-emerald-500" />}
        />
      </div>

      {/* --- ACTIVITY LOG --- */}
      <SpotlightCard className="p-8 border-border bg-card rounded-[2rem] shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3">
            <Timer className="size-5 text-primary" /> System Activity Log
          </h3>
          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
            Showing Last {user.bookings?.length || 0} Events
          </span>
        </div>

        <div className="space-y-3">
          {user.bookings?.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-border rounded-3xl text-muted-foreground font-black text-[10px] uppercase tracking-[0.3em]">
              No active session logs found
            </div>
          ) : (
            user.bookings?.map((booking: any) => (
              <div
                key={booking.id}
                className="group p-4 rounded-2xl bg-secondary/50 border border-border hover:border-primary/30 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-background border border-border flex items-center justify-center">
                    <CheckCircle2
                      className={cn(
                        "size-5",
                        booking.status === "COMPLETED"
                          ? "text-emerald-500"
                          : "text-primary",
                      )}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs uppercase italic tracking-wider text-foreground">
                        Session #{booking.id.slice(0, 8)}
                      </span>
                      <Badge className="bg-background text-[8px] border-border text-muted-foreground font-black px-1.5 h-4">
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-[9px] font-black text-muted-foreground uppercase mt-0.5 tracking-tighter">
                      {format(
                        new Date(booking.startTime),
                        "eeee, MMM dd • hh:mm a",
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-lg font-black italic text-foreground">
                      ${booking.totalPrice}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-lg hover:bg-primary hover:text-white"
                    asChild
                  >
                    <a href={booking.meetLink} target="_blank" rel="noreferrer">
                      <ExternalLink className="size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </SpotlightCard>
    </div>
  );
}

function BentoMetric({ label, value, icon }: any) {
  return (
    <div className="p-6 rounded-[2rem] bg-card border border-border flex items-center gap-5 hover:border-primary/20 transition-all shadow-sm">
      <div className="size-12 rounded-2xl bg-secondary flex items-center justify-center border border-border shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
          {label}
        </p>
        <h3 className="text-3xl font-black text-foreground italic tracking-tighter uppercase">
          {value}
        </h3>
      </div>
    </div>
  );
}

function LoaderScreen() {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
      <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] animate-pulse">
        Initializing Data Stream
      </p>
    </div>
  );
}
