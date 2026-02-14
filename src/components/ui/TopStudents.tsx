"use client";

import Image from "next/image";
import {
  Award,
  Star,
  GraduationCap,
  TrendingUp,
  Sparkles,
  BookOpen,
  Quote,
} from "lucide-react";
import { motion } from "framer-motion";

const topStudents = [
  {
    name: "Aria Gupta",
    result: "99th Percentile SAT",
    school: "Harvard University",
    bio: "Aria mastered advanced calculus and critical reading in record time.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    size: "large",
  },
  {
    name: "James Wilson",
    result: "A* A* A* Levels",
    school: "Cambridge",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    size: "medium",
  },
  {
    name: "Sana Khan",
    result: "IELTS 8.5 Band",
    school: "Global Scholar",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    size: "medium",
  },
  {
    name: "Leo Zhang",
    result: "Top 1% Math",
    school: "MIT",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    size: "small",
  },
  {
    name: "Maya Patel",
    result: "Grade 9 GCSE",
    school: "Oxford",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    size: "small",
  }
];

export function TopStudents() {
  return (
    <section className="py-24 bg-background overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
              <Sparkles className="size-3 fill-primary" />
              The Hall of Fame
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.8] mb-6">
              Elite{" "}
              <span className="text-primary italic font-serif">Results.</span>
            </h2>
            <p className="text-muted-foreground font-medium text-xl max-w-md border-l-2 border-primary/30 pl-6">
              Witness the transformation of our top-tier students across the
              globe.
            </p>
          </div>

          <div className="flex gap-8 pb-2">
            <div className="text-right">
              <p className="text-4xl font-black text-foreground">1.2k+</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                A* Students
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-foreground">94%</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Top Uni Entry
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 1. Large Spotlight - Fixed Gradient for Light Mode */}
          <div className="md:col-span-8">
            {topStudents
              .filter((s) => s.size === "large")
              .map((student) => (
                <motion.div
                  key={student.name}
                  whileHover={{ y: -5 }}
                  className="relative h-[500px] w-full rounded-[3rem] overflow-hidden group border border-border shadow-2xl"
                >
                  <Image
                    src={student.img}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={student.name}
                  />
                  {/* CRITICAL FIX: Using a black-based gradient regardless of theme 
                  because the text inside this specific card is always white/primary.
                */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute bottom-0 p-10 md:p-14 w-full flex flex-col md:flex-row justify-between items-end gap-6 z-10">
                    <div className="max-w-md text-left">
                      <Quote className="size-8 text-primary mb-4" />
                      <p className="text-2xl font-medium text-white/90 italic mb-6 leading-relaxed">
                        "{student.bio}"
                      </p>
                      <h3 className="text-4xl font-black text-white uppercase tracking-tighter">
                        {student.name}
                      </h3>
                      <p className="text-primary font-black text-sm uppercase tracking-widest">
                        {student.result}
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl flex flex-col items-center">
                      <GraduationCap className="size-6 text-primary mb-2" />
                      <p className="text-white font-black text-[10px] uppercase tracking-widest">
                        {student.school}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* 2. Medium Cards - Fixed Contrast */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {topStudents
              .filter((s) => s.size === "medium")
              .map((student) => (
                <motion.div
                  key={student.name}
                  whileHover={{ x: 5 }}
                  className="flex-1 min-h-[240px] bg-card border border-border rounded-[2.5rem] p-8 relative overflow-hidden group"
                >
                  <TrendingUp className="absolute -top-4 -right-4 size-24 text-primary/5 dark:text-primary/10 rotate-12" />
                  <div className="relative z-10 flex flex-col h-full justify-between text-left">
                    <div className="flex items-center gap-4">
                      <div className="size-16 relative rounded-2xl overflow-hidden border border-border shadow-lg">
                        <Image
                          src={student.img}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          alt={student.name}
                        />
                      </div>
                      <div>
                        <h4 className="font-black text-foreground text-xl leading-tight uppercase tracking-tight">
                          {student.name}
                        </h4>
                        <p className="text-primary font-black text-[10px] uppercase tracking-wider">
                          {student.result}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">
                        Success at
                      </p>
                      <p className="text-lg font-black text-foreground uppercase tracking-tighter">
                        {student.school}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* 3. Small Cards - Standardized */}
          <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 flex items-center justify-center p-8 rounded-[2.5rem] bg-foreground text-background">
              <h3 className="text-3xl font-black tracking-tighter leading-none italic uppercase text-center">
                And <span className="text-primary italic">800+ More</span>{" "}
                <br />
                Academic Victories
              </h3>
            </div>
            {topStudents
              .filter((s) => s.size === "small")
              .map((student) => (
                <div
                  key={student.name}
                  className="bg-card border border-border p-5 rounded-[2rem] flex items-center gap-4 transition-all duration-500 hover:border-primary/50"
                >
                  <div className="size-12 relative rounded-xl overflow-hidden shrink-0 border border-border">
                    <Image
                      src={student.img}
                      fill
                      className="object-cover"
                      alt={student.name}
                    />
                  </div>
                  <div className="overflow-hidden text-left">
                    <h5 className="font-black text-sm text-foreground uppercase truncate">
                      {student.name}
                      Mason
                    </h5>
                    <p className="text-primary font-black text-[9px] uppercase tracking-wider truncate">
                      {student.result}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
