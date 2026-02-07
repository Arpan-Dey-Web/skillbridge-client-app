"use client";

import { cn } from "@/lib/utils";
import { ShieldCheck, Zap, Video, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Verified Experts",
    desc: "Every tutor is background-checked and vetted for quality excellence.",
    icon: <ShieldCheck className="size-6 text-primary" />,
    className: "md:col-span-2",
  },
  {
    title: "Instant Booking",
    desc: "Schedule sessions in seconds with our lightning-fast system.",
    icon: <Zap className="size-6 text-primary" />,
    className: "md:col-span-1",
  },
  {
    title: "Virtual Classroom",
    desc: "Integrated video and interactive whiteboarding tools.",
    icon: <Video className="size-6 text-primary" />,
    className: "md:col-span-1",
  },
  {
    title: "Flexible Timing",
    desc: "Learn on your own schedule, anytime, anywhere in the world.",
    icon: <Calendar className="size-6 text-primary" />,
    className: "md:col-span-2",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
            Our Platform
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-6 leading-[0.9]">
            Everything you need <br />
            <span className="text-primary italic">to succeed.</span>
          </h2>
          <p className="text-foreground/50 text-lg font-medium">
            SkillBridge provides the tools for both students and tutors to have
            a seamless, high-impact learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative p-10 rounded-[2.5rem] bg-card border border-border overflow-hidden transition-all duration-500 hover:border-primary/40",
                f.className,
              )}
            >
              {/* Hover Light Effect */}
              <div className="absolute -top-24 -right-24 size-48 bg-primary/10 blur-[60px] rounded-full group-hover:bg-primary/20 transition-all duration-500" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="size-14 rounded-2xl bg-background border border-border flex items-center justify-center mb-8 group-hover:border-primary/30 transition-colors duration-500">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-foreground/40 text-sm leading-relaxed max-w-[280px]">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-8 flex justify-end">
                  <div className="size-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground/20 group-hover:text-primary group-hover:border-primary/50 transition-all">
                    <ArrowUpRight className="size-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
