"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ShieldCheck,
  TrendingUp,
  Activity,
  Loader2,
  CalendarCheck,
  LayoutGrid,
  CreditCard,
  ArrowRight,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
    
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/dashboard-summary`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) setData(json.data);
        })
        .catch((err) => console.error("Error:", err))
        .finally(() => setLoading(false));
    }
  }, [session]);

  if (isPending) return <LoaderScreen />;
  if (session?.user?.role !== "ADMIN") {
    redirect(
      session?.user?.role === "TUTOR" ? "/dashboard/tutor" : "/dashboard",
    );
    return null;
  }

  // --- DASHBOARD CONFIG ---
  const statsConfig = [
    {
      label: "Platform Users",
      value: data?.userCount || "0",
      icon: <Users className="text-amber-500" />,
      sub: `${data?.tutorCount || 0} Tutors Active`,
      link: "/dashboard/admin/users",
    },
    {
      label: "Taxonomy Sectors",
      value: data?.categoryCount || "0",
      icon: <LayoutGrid className="text-blue-500" />,
      sub: "Active Categories",
      link: "/dashboard/admin/categories",
    },
    {
      label: "Total Bookings",
      value: data?.bookingCount || "0",
      icon: <CalendarCheck className="text-emerald-500" />,
      sub: "Sessions Managed",
      link: "/dashboard/admin/bookings",
    },
    {
      label: "Revenue Stream",
      value: `$${data?.totalRevenue || 0}`,
      icon: <CreditCard className="text-primary" />,
      sub: "Platform Volume",
      link: "",
    },
  ];

  return (
    <div className="space-y-10 py-6">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
            System <span className="shimmer-gold">OS</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-3">
            Admin: {session.user.name} | Deployment: Production
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-white/5 border border-white/10 text-white font-bold rounded-xl h-12 px-6 hover:bg-white/10 transition-all">
            Audit Logs
          </Button>
        </div>
      </header>

      {/* --- CORE STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={stat.link ? stat.link : ""}>
              <SpotlightCard className="p-6 border-white/5 bg-white/[0.01] hover:border-primary/20 group transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:border-primary/20 transition-colors">
                    {stat.icon}
                  </div>
                  <ArrowUpRight className="size-4 text-slate-700 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter mb-1">
                  {loading ? "..." : stat.value}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">
                    {stat.sub}
                  </span>
                </div>
              </SpotlightCard>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- RECENT ACTIVITY (NEW) --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
              Recent <span className="text-primary">Sessions</span>
            </h2>
            <Link
              href="/dashboard/admin/bookings"
              className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
            >
              Monitor Flow
            </Link>
          </div>

          <div className="space-y-3">
            {loading
              ? [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 w-full bg-white/5 animate-pulse rounded-2xl"
                  />
                ))
              : data?.recentBookings?.map((booking: any) => (
                  <SpotlightCard
                    key={booking.id}
                    className="p-0 border-white/5 overflow-hidden group"
                  >
                    <div className="flex items-center justify-between p-5 bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-primary font-black">
                          <Clock className="size-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">
                            {booking.student.name} booked{" "}
                            {booking.tutor.user.name}
                          </h4>
                          <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-0.5">
                            Status:{" "}
                            <span
                              className={cn(
                                booking.status === "COMPLETED"
                                  ? "text-emerald-500"
                                  : "text-amber-500",
                              )}
                            >
                              {booking.status}
                            </span>{" "}
                            • ${booking.totalPrice}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="size-4 text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </SpotlightCard>
                ))}
          </div>
        </div>

        {/* --- SYSTEM HEALTH & MONITORING --- */}
        <div className="space-y-6">
          <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
            System <span className="text-primary">Health</span>
          </h2>
          <SpotlightCard className="p-8 border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[2.5rem]">
            <div className="space-y-8">
              <HealthBar
                label="Auth Server"
                value="100%"
                status="Operational"
                color="bg-primary"
              />
              <HealthBar
                label="Prisma Engine"
                value="100%"
                status="Steady"
                color="bg-emerald-500"
              />
              <HealthBar
                label="CDN Delivery"
                value="94%"
                status="Healthy"
                color="bg-blue-500"
              />
            </div>

            <div className="mt-12 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-3">
                <Activity className="size-4 text-primary animate-pulse" />
                <p className="text-[9px] font-black text-primary uppercase tracking-widest">
                  Real-time traffic monitoring active
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}

// --- SMALL COMPONENTS ---

function HealthBar({ label, value, status, color }: any) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em]">
        <span className="text-slate-500">{label}</span>
        <span className="text-white">{status}</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: value }}
          transition={{ duration: 1, ease: "circOut" }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </div>
  );
}

function LoaderScreen() {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="size-10 text-primary animate-spin" />
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] animate-pulse">
        Initializing Command Center
      </p>
    </div>
  );
}
