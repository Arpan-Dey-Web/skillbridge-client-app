"use client";

import { cn } from "@/lib/utils";
import { ShieldCheck, Zap, Video, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Verified Experts",
    desc: "Every tutor is background-checked and vetted for quality excellence, ensuring elite mentorship.",
    icon: <ShieldCheck className="size-6 text-primary" />,
    className: "md:col-span-2",
  },
  {
    title: "Instant Booking",
    desc: "Schedule sessions in seconds with our high-precision system.",
    icon: <Zap className="size-6 text-primary" />,
    className: "md:col-span-1",
  },
  {
    title: "Virtual Classroom",
    desc: "Integrated video and interactive whiteboarding tools for deep immersion.",
    icon: <Video className="size-6 text-primary" />,
    className: "md:col-span-1",
  },
  {
    title: "Flexible Timing",
    desc: "Learn on your own schedule, anytime, anywhere in the world without limits.",
    icon: <Calendar className="size-6 text-primary" />,
    className: "md:col-span-2",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden transition-colors duration-500">
      {/* Background Architectural Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.03] dark:bg-primary/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Editorial Header */}
        <div className="text-left max-w-2xl mb-20 border-l-4 border-primary pl-8">
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">
            Infrastructure
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter mb-6 leading-none uppercase">
            Built for <br />
            <span className="shimmer-gold italic font-serif lowercase">
              precision.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium italic opacity-80">
            "The tools of a master define the quality of the craft."
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative p-12 rounded-[3rem] bg-card border border-border overflow-hidden transition-all duration-700",
                "hover:border-primary/40 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_rgba(var(--primary-rgb),0.1)]",
                f.className,
              )}
            >
              {/* Interactive Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  {/* High-End Icon Frame */}
                  <div
                    className="size-16 rounded-2xl bg-background border border-border flex items-center justify-center mb-10 
                                 group-hover:border-primary/30 group-hover:bg-primary/[0.02] transition-all duration-500 shadow-sm"
                  >
                    {f.icon}
                  </div>

                  <h3 className="text-3xl font-black text-foreground mb-4 tracking-tight uppercase leading-none">
                    {f.title}
                  </h3>

                  {/* Accent Line */}
                  <div className="w-8 h-[1px] bg-primary/30 group-hover:w-16 group-hover:bg-primary transition-all duration-500 mb-4" />

                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[320px] font-medium">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-12 flex justify-between items-center">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">
                    Explore Feature
                  </span>
                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
