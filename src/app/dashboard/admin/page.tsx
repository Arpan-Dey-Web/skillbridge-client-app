"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
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

  // Define the type without referencing the live 'session' variable
  // This avoids the 'possibly null' error during build
  type ExtendedUser = {
    id: string;
    email: string;
    name: string;
    role?: string;
    image?: string | null;
  };

  const user = session?.user as ExtendedUser | undefined;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/dashboard-summary`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) setData(json.data);
        })
        .catch((err) => console.error("Dashboard Fetch Error:", err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  // Handle Loading State
  if (isPending) return <LoaderScreen />;

  // Auth Guard: If no user or unauthorized role, redirect
  if (!user || user.role !== "ADMIN") {
    const destination =
      user?.role === "TUTOR" ? "/dashboard/tutor" : "/dashboard";
    redirect(destination);
    return null;
  }
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
    <div className="space-y-10 transition-colors duration-500">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase italic leading-none">
            System <span className="shimmer-gold">OS</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] mt-3">
            Admin: {user.name} | Deployment: Production
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-secondary border border-border text-foreground font-black uppercase text-[10px] tracking-widest rounded-xl h-12 px-8 hover:bg-foreground hover:text-background transition-all italic">
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
            <Link href={stat.link || "#"}>
              <SpotlightCard className="p-6 border-border bg-card hover:border-primary/40 group transition-all cursor-pointer shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-secondary border border-border group-hover:border-primary/20 transition-colors">
                    {stat.icon}
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-4xl font-black text-foreground tracking-tighter mb-1 uppercase italic">
                  {loading ? "..." : stat.value}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
                    {stat.sub}
                  </span>
                </div>
              </SpotlightCard>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- RECENT ACTIVITY --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-foreground uppercase italic tracking-tighter">
              Recent <span className="text-primary">Sessions</span>
            </h2>
            <Link
              href="/dashboard/admin/bookings"
              className="text-[10px] font-black text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"
            >
              Monitor Flow
            </Link>
          </div>

          <div className="space-y-3">
            {loading
              ? [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 w-full bg-secondary animate-pulse rounded-2xl"
                  />
                ))
              : data?.recentBookings?.map((booking: any) => (
                  <SpotlightCard
                    key={booking.id}
                    className="p-0 border-border overflow-hidden group"
                  >
                    <div className="flex items-center justify-between p-5 bg-card group-hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-secondary flex items-center justify-center text-primary font-black border border-border">
                          <Clock className="size-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-sm uppercase italic tracking-tight">
                            {booking.student.name}{" "}
                            <span className="text-muted-foreground font-medium lowercase">
                              booked
                            </span>{" "}
                            {booking.tutor.user.name}
                          </h4>
                          <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest mt-0.5">
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
                            •{" "}
                            <span className="text-foreground">
                              ${booking.totalPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="size-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </SpotlightCard>
                ))}
          </div>
        </div>

        {/* --- SYSTEM HEALTH --- */}
        <div className="space-y-6">
          <h2 className="text-xl font-black text-foreground uppercase italic tracking-tighter">
            System <span className="text-primary">Health</span>
          </h2>
          <SpotlightCard className="p-8 border-border bg-card rounded-[2.5rem] shadow-sm">
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
                  Real-time monitoring active
                </p>
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
    <div className="space-y-3">
      <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em]">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground">{status}</span>
      </div>
      <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
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
      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] animate-pulse">
        Initializing Command Center
      </p>
    </div>
  );
}
