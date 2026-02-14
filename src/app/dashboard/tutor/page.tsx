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
  Inbox,
  Loader2,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function TutorDashboard() {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session && session.user?.role === "STUDENT") redirect("/dashboard");
    if (session && session.user?.role === "ADMIN") redirect("/dashboard/admin");
  }, [session]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/bookings`,
          { credentials: "include" },
        );
        if (res.status === 403) throw new Error("Session invalid");
        const data = await res.json();
        if (data.success) {
          setBookings(data.data);
        }
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchBookings();
    }
  }, [session]);

  const confirmedBookings = useMemo(() => {
    return bookings
      .filter((b) => b.status === "CONFIRMED")
      .sort(
        (a, b) =>
          new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
      );
  }, [bookings]);

  const totalRevenue = confirmedBookings.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0,
  );
  const activeStudents = new Set(confirmedBookings.map((b) => b.partnerEmail))
    .size;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="size-10 animate-spin text-amber-500/50" />
      </div>
    );
  }

  return (
    <div className="space-y-10 ">
      {/* --- Section 1: Welcome Header --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase italic">
            Welcome,{" "}
            <span className="shimmer-gold">
              {session?.user?.name?.split(" ")[0]}
            </span>
          </h1>
          <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em] mt-2">
            Your teaching empire is growing.{" "}
            <span className="text-amber-500 italic font-black">
              Command Center Active.
            </span>
          </p>
        </div>
      </header>

      {/* --- Section 2: Analytics Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Revenue"
          value={`$${totalRevenue}`}
          icon={<DollarSign className="text-amber-500" />}
          trend="Confirmed earnings"
        />
        <StatCard
          title="Sessions"
          value={confirmedBookings.length}
          icon={<Calendar className="text-amber-500" />}
          trend="Upcoming confirmed"
        />
        <StatCard
          title="Rating"
          value="4.9"
          icon={<Star className="text-amber-500" />}
          trend="Top 5% Tutor"
        />
        <StatCard
          title="Students"
          value={activeStudents}
          icon={<Users className="text-amber-500" />}
          trend="Unique learners"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Section 3: Upcoming Confirmed Bookings --- */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-foreground uppercase tracking-tighter italic">
              Confirmed <span className="text-amber-500">Sessions</span>
            </h2>
            <Link
              href="/dashboard/sessions"
              className="text-[10px] font-black text-amber-500 hover:text-foreground transition-colors uppercase tracking-[0.2em]"
            >
              View All Archives
            </Link>
          </div>

          <div className="space-y-3">
            {confirmedBookings.length > 0 ? (
              confirmedBookings.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SpotlightCard className="p-0 border-border bg-card dark:bg-card/50 shadow-sm">
                    <div className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-secondary dark:bg-amber-500/10 border border-border dark:border-amber-500/20 flex items-center justify-center text-amber-500 font-black text-xl">
                          {booking.partnerName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground uppercase tracking-tight">
                            {booking.partnerName}
                          </h4>
                          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter mb-1">
                            {booking.partnerEmail}
                          </p>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-0.5 font-black uppercase tracking-widest">
                            <Clock className="size-3 text-amber-500" />
                            {formatDate(booking.startTime)} •{" "}
                            {booking.timeSlot.split("-")[0]}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden md:block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20">
                          {booking.status}
                        </span>
                        <Link
                          href={booking.meetLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                            booking.meetLink
                              ? "bg-amber-500 text-black hover:bg-foreground hover:text-background shadow-lg shadow-amber-500/20"
                              : "bg-secondary text-muted-foreground/40 cursor-not-allowed border border-border",
                          )}
                        >
                          <ArrowUpRight className="size-3" />
                          Join
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-secondary/20 rounded-[2.5rem] border border-dashed border-border">
                <Inbox className="size-10 text-muted-foreground/20 mb-3" />
                <p className="text-muted-foreground font-black uppercase tracking-widest text-[10px]">
                  No confirmed activity logged.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* --- Section 4: Sidebar --- */}
        <div className="space-y-6">
          <SpotlightCard className="bg-amber-500 p-8 border-none relative overflow-hidden group rounded-[2.5rem]">
            <div className="absolute -right-4 -top-4 size-24 bg-white/20 blur-2xl rounded-full group-hover:bg-white/30 transition-all" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="size-5 text-black" />
                <span className="text-[10px] font-black text-black uppercase tracking-[0.2em]">
                  Active Profile
                </span>
              </div>
              <h3 className="text-2xl font-black text-black leading-tight mb-6 italic uppercase tracking-tighter">
                Identity is live for global recruitment.
              </h3>
              <Link
                href="/dashboard/tutor/availability"
                className="block w-full text-center py-4 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
              >
                Modify Schedule
              </Link>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-8 border-border bg-card dark:bg-card/50 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-amber-500 size-5" />
              <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">
                Growth Analytics
              </h3>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed italic font-medium">
              Tutors with consistent availability get{" "}
              <span className="text-foreground font-black border-b-2 border-amber-500">
                40% more
              </span>{" "}
              bookings. Update your calendar weekly.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: any) {
  return (
    <SpotlightCard className="p-6 border-border bg-card dark:bg-card/50 rounded-3xl shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 rounded-xl bg-secondary border border-border">
          {icon}
        </div>
        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">
          {title}
        </span>
      </div>
      <div>
        <h3 className="text-3xl font-black text-foreground tracking-tighter mb-1">
          {value}
        </h3>
        <p className="text-[9px] font-black text-amber-500 uppercase tracking-tighter">
          {trend}
        </p>
      </div>
    </SpotlightCard>
  );
}
