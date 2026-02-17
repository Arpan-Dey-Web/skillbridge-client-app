"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Star,
  GraduationCap,
  Calendar,
  Video,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { ExtendedUser } from "@/types/user.types";

export default function StudentDashboardClient({
  initialBookings,
}: {
  initialBookings: any[];
}) {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user as ExtendedUser | undefined;
  // Role Protection
  if (currentUser?.role === "TUTOR") redirect("/dashboard/tutor");
  if (currentUser?.role === "ADMIN") redirect("/dashboard/admin");

  // Logic Calculations
  const activeBookingsCount = initialBookings.filter(
    (b) => b.status === "CONFIRMED",
  ).length;

  const completedLessonsData = initialBookings.filter(
    (b) => b.status === "COMPLETED",
  );

  const upcomingSessions = initialBookings
    .filter((b) => b.status === "CONFIRMED")
    .slice(0, 3);

  const totalMinutes = completedLessonsData.reduce((acc, b) => {
    const start = new Date(b.startTime).getTime();
    const end = new Date(b.endTime).getTime();
    return acc + (end - start) / (1000 * 60);
  }, 0);

  const hoursLearned = (totalMinutes / 60).toFixed(1);

  const stats = [
    {
      label: "Active Bookings",
      value: activeBookingsCount.toString(),
      icon: <Clock className="text-primary size-5" />,
    },
    {
      label: "Hours Learned",
      value: `${hoursLearned}h`,
      icon: <BookOpen className="text-primary size-5" />,
    },
    {
      label: "Completed",
      value: completedLessonsData.length.toString(),
      icon: <GraduationCap className="text-primary size-5" />,
    },
    {
      label: "Total Spent",
      value: `$${initialBookings.reduce((acc, b) => acc + Number(b.totalPrice || 0), 0)}`,
      icon: <Star className="text-primary size-5" />,
    },
  ];

  return (
    <div className="space-y-10 p-2">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase italic leading-none">
            Welcome back,{" "}
            <span className="shimmer-gold">
              {session?.user?.name?.split(" ")[0] || "Student"}
            </span>
          </h1>
          <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.2em] mt-2">
            You have{" "}
            <span className="text-primary">{activeBookingsCount} sessions</span>{" "}
            scheduled this week
          </p>
        </div>
        <Button
          asChild
          className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black uppercase italic rounded-xl px-10 h-14 shadow-xl transition-all active:scale-95"
        >
          <Link href="/tutors">Find Tutors</Link>
        </Button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <SpotlightCard className="p-6 border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-5">
                <div className="size-12 rounded-2xl bg-secondary border border-border flex items-center justify-center shadow-inner">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-black text-foreground leading-none mb-1 italic">
                    {stat.value}
                  </div>
                  <div className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                    {stat.label}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xl font-black text-foreground uppercase italic tracking-tighter">
              Upcoming Sessions
            </h2>
            <Link
              href="/dashboard/bookings"
              className="text-[10px] font-black text-primary hover:text-foreground transition-colors uppercase tracking-[0.2em]"
            >
              View All Schedule
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((booking) => (
                <SpotlightCard
                  key={booking.id}
                  className="p-5 border-border hover:bg-secondary/50 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="size-12 rounded-2xl border-2 border-border group-hover:border-primary/50 transition-colors">
                        <AvatarImage src={booking.partnerImage} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-black">
                          {booking.partnerName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-base font-black text-foreground uppercase tracking-tight">
                          {booking.partnerName}
                        </h4>
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3 text-primary" />{" "}
                            {booking.date}
                          </span>
                          <span className="size-1 rounded-full bg-border" />
                          <span className="text-foreground">
                            {booking.timeSlot}
                          </span>
                        </div>
                      </div>
                    </div>

                    {booking.meetLink ? (
                      <Button
                        asChild
                        className="bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 text-[10px] font-black uppercase tracking-widest rounded-xl px-6 h-10 transition-all"
                      >
                        <Link href={booking.meetLink} target="_blank">
                          <Video className="mr-2 size-4" /> Start Lesson
                        </Link>
                      </Button>
                    ) : (
                      <div className="px-4 py-2 bg-secondary rounded-lg border border-border">
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                          Generating Link...
                        </span>
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              ))
            ) : (
              <div className="p-16 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-[2.5rem] bg-secondary/20">
                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] italic mb-4">
                  Your schedule is currently clear
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary font-black uppercase text-xs rounded-xl px-8 h-12 hover:bg-primary hover:text-primary-foreground"
                >
                  <Link href="/tutors">Explore Tutors</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Progress Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-black text-foreground uppercase italic tracking-tighter">
            Your Progress
          </h2>
          <SpotlightCard className="p-8 bg-secondary/30 border-border rounded-[2.5rem] relative overflow-hidden">
            {/* Decorative Background Icon */}
            <GraduationCap className="absolute -right-4 -bottom-4 size-32 text-primary/5 -rotate-12" />

            <div className="relative z-10 space-y-8">
              <div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] mb-4">
                  <span className="text-muted-foreground">Monthly Quota</span>
                  <span className="text-primary">
                    {completedLessonsData.length} / 10
                  </span>
                </div>
                <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border">
                  <div
                    className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] transition-all duration-1000 ease-out"
                    style={{
                      width: `${Math.min((completedLessonsData.length / 10) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Star className="size-4 text-primary fill-primary" />
                  </div>
                  <p className="text-[10px] font-black text-muted-foreground leading-relaxed uppercase tracking-wider">
                    {completedLessonsData.length >= 10
                      ? "Elite Status: Monthly goal achieved. You are in the top 5% of learners."
                      : `Keep pushing. Only ${10 - completedLessonsData.length} more lessons to reach your monthly milestone.`}
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
