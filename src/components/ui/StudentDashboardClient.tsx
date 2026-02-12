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

export default function StudentDashboardClient({
  initialBookings,
}: {
  initialBookings: any[];
}) {
  const { data: session } = authClient.useSession();

  // ১. স্ট্যাটাস অনুযায়ী বুকিং ফিল্টার
  const activeBookingsCount = initialBookings.filter(
    (b) => b.status === "CONFIRMED",
  ).length;

  const completedLessonsData = initialBookings.filter(
    (b) => b.status === "COMPLETED",
  );

  const upcomingSessions = initialBookings
    .filter((b) => b.status === "CONFIRMED")
    .slice(0, 3);

  // ২. নতুন ডিউরেশন লজিক (Minutes to Hours conversion)
  const totalMinutes = completedLessonsData.reduce((acc, b) => {
    const start = new Date(b.startTime).getTime();
    const end = new Date(b.endTime).getTime();
    const diff = (end - start) / (1000 * 60); // মিনিটে রূপান্তর
    return acc + diff;
  }, 0);

  const hoursLearned = (totalMinutes / 60).toFixed(1);

  // ৩. ডাইনামিক স্ট্যাটস অ্যারে
  const stats = [
    {
      label: "Active Bookings",
      value: activeBookingsCount.toString(),
      icon: <Clock className="text-primary" />,
    },
    {
      label: "Hours Learned",
      value: `${hoursLearned}h`,
      icon: <BookOpen className="text-primary" />,
    },
    {
      label: "Completed",
      value: completedLessonsData.length.toString(),
      icon: <GraduationCap className="text-primary" />,
    },
    {
      label: "Total Spent",
      value: `$${initialBookings.reduce((acc, b) => acc + Number(b.totalPrice || 0), 0)}`,
      icon: <Star className="text-primary" />,
    },
  ];

  // রোল বেজড রিডাইরেক্ট
  if (session?.user?.role === "TUTOR") redirect("/dashboard/tutor");


  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Welcome back,{" "}
            <span className="shimmer-gold">
              {session?.user?.name?.split(" ")[0] || "Student"}
            </span>
          </h1>
          <p className="text-foreground/50 text-sm font-medium italic">
            You have{" "}
            <span className="text-primary">{activeBookingsCount} sessions</span>{" "}
            scheduled.
          </p>
        </div>
        <Button
          asChild
          className="bg-primary text-black font-black uppercase italic rounded-xl px-8 shadow-lg shadow-primary/20 hover:bg-white transition-all"
        >
          <Link href="/tutors">Find Tutors</Link>
        </Button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <SpotlightCard className="p-6 border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-background border border-white/5 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-black text-white leading-none mb-1 italic">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">
                    {stat.label}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white uppercase italic tracking-tight">
              Upcoming Sessions
            </h2>
            <Link
              href="/dashboard/bookings"
              className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((booking) => (
                <SpotlightCard
                  key={booking.id}
                  className="p-4 border-white/5 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="size-10 rounded-xl border border-white/10">
                        <AvatarImage src={booking.partnerImage} />
                        <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                          {booking.partnerName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-tight">
                          {booking.partnerName}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold">
                          <Calendar className="size-3" /> {booking.date} |{" "}
                          {booking.timeSlot}
                        </div>
                      </div>
                    </div>
                    {booking.meetLink ? (
                      <Button
                        asChild
                        size="sm"
                        className="bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white border border-green-500/20 text-[10px] font-black uppercase rounded-lg"
                      >
                        <Link href={booking.meetLink} target="_blank">
                          <Video className="mr-2 size-3" /> Join
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                        Link Pending
                      </span>
                    )}
                  </div>
                </SpotlightCard>
              ))
            ) : (
              <SpotlightCard className="p-12 flex items-center justify-center border-dashed border-2 border-white/5 bg-transparent rounded-[2rem]">
                <div className="text-center">
                  <p className="text-foreground/30 text-sm font-bold uppercase tracking-widest italic">
                    No sessions scheduled.
                  </p>
                  <Button
                    asChild
                    variant="link"
                    className="text-primary font-black uppercase text-xs mt-2"
                  >
                    <Link href="/tutors">Book Now</Link>
                  </Button>
                </div>
              </SpotlightCard>
            )}
          </div>
        </div>

        {/* Sidebar: Progress Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-white uppercase italic tracking-tight">
            Your Progress
          </h2>
          <SpotlightCard className="p-6 bg-primary/5 border-primary/10 rounded-[2rem]">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                  <span className="text-foreground/60">Lessons Completed</span>
                  <span className="text-primary">
                    {completedLessonsData.length} / 10
                  </span>
                </div>
                <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-1000"
                    style={{
                      width: `${Math.min((completedLessonsData.length / 10) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] font-bold text-white/40 leading-relaxed uppercase tracking-wide">
                  {completedLessonsData.length >= 10
                    ? "Congratulations! You've reached your monthly goal."
                    : `Keep it up! Completing ${10 - completedLessonsData.length} more lessons will reach your monthly goal.`}
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
