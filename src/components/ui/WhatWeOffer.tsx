"use client";

import { Video, Users, FileText, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const offers = [
  {
    title: "1-on-1 Tuition",
    desc: "Personalized deep-dive sessions focused entirely on your specific curriculum goals.",
    icon: Video,
  },
  {
    title: "Group Masterclasses",
    desc: "Interactive, collaborative learning environments for highly competitive subjects.",
    icon: Users,
  },
  {
    title: "Mock Exam Series",
    desc: "Realistic exam simulations with instant expert feedback and grading.",
    icon: FileText,
  },
  {
    title: "Study Abroad Prep",
    desc: "Elite admissions guidance for Ivy League, Oxbridge, and global universities.",
    icon: Globe,
  },
];

export function WhatWeOffer() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Section Identifier */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[15rem] font-black text-foreground/[0.02] rotate-90 pointer-events-none select-none origin-left">
        SERVICES
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Premier Solutions
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-none uppercase">
            Our{" "}
            <span className="text-primary italic font-serif lowercase">
              Core
            </span>{" "}
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {offers.map((offer, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group relative"
            >
              <div
                className="size-24 rounded-3xl bg-card flex items-center justify-center border border-border mb-8 
                            group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-500 
                            relative overflow-hidden shadow-sm group-hover:shadow-[0_10px_40px_rgba(var(--primary-rgb),0.1)]"
              >
                <offer.icon className="size-9 text-muted-foreground group-hover:text-primary transition-colors duration-500" />

                {/* Subtle Inner Corner Glow */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-primary/5 rounded-bl-full translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
              </div>

              <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight uppercase leading-none">
                {offer.title}
              </h3>

              <div className="w-8 h-[2px] bg-border group-hover:bg-primary group-hover:w-16 transition-all duration-500 mb-4" />

              <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[240px]">
                {offer.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
