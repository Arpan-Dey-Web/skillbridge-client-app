"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Users, Zap, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* 1. HERO SECTION: The Vision */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-500/5 blur-[120px] rounded-full" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
          >
            Our Mission
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            We believe the right <br />
            <span className="text-amber-500 italic">Mentor</span> changes
            everything.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed"
          >
            LearnHub wasn't built to be another video library. We built it to
            bridge the gap between passive watching and active mastery through
            elite, 1-on-1 mentorship.
          </motion.p>
        </div>
      </section>

      {/* 2. THE "WHY" SECTION: Bento Grid of Values */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueCard
            icon={<Target className="size-6" />}
            title="Precision Learning"
            description="No more scrolling through hours of content. Get exactly what you need to master your craft."
          />
          <ValueCard
            icon={<Users className="size-6" />}
            title="Elite Network"
            description="We vet the top 1% of subject experts so you don't have to worry about the quality of instruction."
          />
          <ValueCard
            icon={<Zap className="size-6" />}
            title="Measurable Impact"
            description="From SAT scores to Next.js deployments, we focus on results you can actually see."
          />
        </div>
      </section>

      {/* 3. STORY SECTION: The Journey */}
      <section className="py-24 bg-white/5 border-y border-white/5 relative">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center">
            {/* Replace with an actual inspiring image/video later */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-50" />
            <GraduationCap className="size-20 text-amber-500/20" />
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight">
              How it started.
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed text-lg">
              <p>
                A few years ago, we noticed a problem: the internet is full of
                information, but shorthanded on actual <strong>guidance</strong>
                . Students were stuck in "tutorial hell," watching videos but
                never building anything real.
              </p>
              <p>
                SkillBridge was born to fix that. We connected the dots between
                students who are hungry to grow and experts who are passionate
                about sharing their edge. Today, we power thousands of learning
                hours every single month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA: Inspire them to act */}
      <section className="py-32 text-center container mx-auto px-6">
        <div className="bg-amber-500 p-12 md:p-20 rounded-[3rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-black/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-700" />

          <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter mb-8 relative z-10">
            Ready to write your <br />
            success story?
          </h2>

          <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
            <Button
              asChild
              size="lg"
              className="bg-black text-white hover:bg-slate-900 h-16 px-10 rounded-2xl text-lg font-bold"
            >
              <Link href="/tutors">
                Find Your Mentor <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-black/20 bg-transparent hover:bg-black/5 text-black h-16 px-10 rounded-2xl text-lg font-bold"
            >
              <Link href="/auth/register">Become a Tutor</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all duration-500 group">
      <div className="size-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">
        {description}
      </p>
    </div>
  );
}
