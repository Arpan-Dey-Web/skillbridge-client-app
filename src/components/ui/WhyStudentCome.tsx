"use client";

import { Target, Zap, Heart, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const reasons = [
  {
    title: "Bespoke Matching",
    desc: "We don't just give you a list; we find the mentor that matches your learning DNA.",
    icon: Target,
  },
  {
    title: "Rapid Progress",
    desc: "Our students report a 40% improvement in grades within the first 3 months.",
    icon: Zap,
  },
  {
    title: "Safe Environment",
    desc: "Every session is recorded and every tutor is triple-vetted for safety.",
    icon: ShieldCheck,
  },
  {
    title: "Mentorship",
    desc: "It’s not just about exams. It’s about life-long skills and confidence.",
    icon: Heart,
  },
];

export function WhyStudents() {
  return (
    <section className="py-24 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Editorial Content */}
        <div>
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6">
            The LearnHub Advantage
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-[0.9] mb-8">
            Why the best <br />
            <span className="text-primary italic">choose us.</span>
          </h2>
          <div className="h-1 w-20 bg-primary mb-8" />
          <p className="text-muted-foreground text-lg max-w-md font-medium leading-relaxed">
            Education is an investment. We ensure yours pays off by focusing on
            quality over quantity, delivering a bespoke experience for every
            student.
          </p>
        </div>

        {/* Right Side: Reason Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className={cn(
                "group bg-card p-10 rounded-[2.5rem] border border-border/50 transition-all duration-500",
                "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1",
              )}
            >
              <div className="size-12 rounded-2xl bg-background border border-border flex items-center justify-center mb-6 group-hover:border-primary/20 transition-colors">
                <r.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-3 tracking-tight">
                {r.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
