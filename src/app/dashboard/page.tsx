"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Star, GraduationCap } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function StudentDashboard() {
  const { data: session } = authClient.useSession();
    if (session?.user?.role === "TUTOR") {
      redirect("/dashboard/tutor");
    }
    if (session?.user?.role === "ADMIN") {
      redirect("/dashboard/admin");
    }
  // Stats specifically for the student overview
  const stats = [
    {
      label: "Active Bookings",
      value: "3",
      icon: <Clock className="text-primary" />,
    },
    {
      label: "Hours Learned",
      value: "12h",
      icon: <BookOpen className="text-primary" />,
    },
    {
      label: "Completed Lessons",
      value: "8",
      icon: <GraduationCap className="text-primary" />,
    },
    {
      label: "Average Rating",
      value: "4.9",
      icon: <Star className="text-primary" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter">
          Welcome back, <span className="shimmer-gold">Student</span>
        </h1>
        <p className="text-foreground/50 text-sm">
          Here is what is happening with your learning journey today.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring" }}
          >
            <SpotlightCard className="p-6">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-background border border-border flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-black text-white">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
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
          <h2 className="text-xl font-bold text-white tracking-tight">
            Upcoming Sessions
          </h2>
          <SpotlightCard className="p-8 flex items-center justify-center min-h-[300px] border-dashed border-2">
            <div className="text-center">
              <p className="text-foreground/30 text-sm italic">
                No sessions scheduled for today.
              </p>
              <button className="mt-4 text-primary font-bold text-sm hover:underline">
                <Link href={'/tutors'}>Browse Tutors</Link>
              </button>
            </div>
          </SpotlightCard>
        </div>

        {/* Learning Progress Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Your Progress
          </h2>
          <SpotlightCard className="p-6 bg-secondary/10">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-foreground/60 uppercase">
                    Physics Mastery
                  </span>
                  <span className="text-primary">75%</span>
                </div>
                <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[75%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-foreground/60 uppercase">
                    Business Management
                  </span>
                  <span className="text-primary">40%</span>
                </div>
                <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[40%]" />
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
