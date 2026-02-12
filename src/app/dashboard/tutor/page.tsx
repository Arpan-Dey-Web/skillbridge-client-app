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
import { Button } from "@/components/ui/button";

export default function TutorDashboard() {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ১. সেশন ভ্যালিডেশন এবং রিডাইরেক্ট
  useEffect(() => {
    if (session && session.user?.role === "STUDENT") redirect("/dashboard");
    if (session && session.user?.role === "ADMIN") redirect("/dashboard/admin");
  }, [session]);

  // ২. ডাটা ফেচিং
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/bookings`,
          {
            credentials: "include",
          },
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

  // ৩. শুধুমাত্র CONFIRMED সেশনগুলো ফিল্টার এবং সর্ট করা
  const confirmedBookings = useMemo(() => {
    return bookings
      .filter((b) => b.status === "CONFIRMED")
      .sort(
        (a, b) =>
          new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
      );
  }, [bookings]);
  console.log(confirmedBookings);
  // ৪. ডাইনামিক স্ট্যাটস (শুধুমাত্র কনফার্মড ডাটা থেকে)
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
    <div className="space-y-10">
      {/* --- Section 1: Welcome Header --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Welcome,{" "}
            <span className="shimmer-gold">
              {session?.user?.name?.split(" ")[0]}
            </span>
          </h1>
          <p className="text-slate-500 font-medium">
            Your teaching empire is growing. Here is your overview.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/tutors/${session?.user?.id}`}
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-all"
          >
            View Public Profile
          </Link>
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
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Confirmed Sessions
            </h2>
            <Link
              href="/dashboard/sessions"
              className="text-xs font-bold text-amber-500 hover:underline uppercase tracking-widest"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {confirmedBookings.length > 0 ? (
              confirmedBookings.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SpotlightCard className="p-0 border-white/5">
                    <div className="flex items-center justify-between p-5 bg-white/[0.02]">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-transparent border border-white/10 flex items-center justify-center text-amber-500 font-bold">
                          {booking.partnerName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-white">
                            {booking.partnerName}
                          </h4>
                          <p className="text-[10px] text-slate-500 mb-1">
                            {booking.partnerEmail}
                          </p>
                          <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <Clock className="size-3 text-amber-500" />
                            {formatDate(booking.startTime)} •{" "}
                            {booking.timeSlot.split("-")[0]}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border bg-amber-500/10 text-amber-500 border-amber-500/20">
                          {booking.status}
                        </span>
                        <Link
                          href={booking.meetLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                            booking.meetLink
                              ? "bg-amber-500 text-black hover:bg-white shadow-lg shadow-amber-500/20"
                              : "bg-white/5 text-slate-500 cursor-not-allowed border border-white/5",
                          )}
                        >
                          <ArrowUpRight className="size-3" />
                          Join Meeting
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
                <Inbox className="size-10 text-slate-600 mb-3" />
                <p className="text-slate-500 font-medium">
                  No confirmed sessions yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* --- Section 4: Sidebar --- */}
        <div className="space-y-6">
          <SpotlightCard className="bg-amber-500 p-8 border-none relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 size-24 bg-white/20 blur-2xl rounded-full group-hover:bg-white/30 transition-all" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="size-5 text-black" />
                <span className="text-[10px] font-black text-black uppercase tracking-[0.2em]">
                  Active Profile
                </span>
              </div>
              <h3 className="text-2xl font-black text-black leading-tight mb-6">
                Your profile is live for students.
              </h3>
              <Link
                href="/dashboard/tutor/availability"
                className="block w-full text-center py-4 bg-black text-white rounded-2xl font-black text-sm hover:scale-[1.02] transition-transform"
              >
                Edit Availability
              </Link>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6 border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-amber-500 size-5" />
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                Growth Tip
              </h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Tutors with consistent availability get{" "}
              <span className="text-white font-bold">40% more</span> bookings.
              Update your calendar weekly!
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
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
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
        <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-tighter">
          {trend}
        </p>
      </div>
    </SpotlightCard>
  );
}
