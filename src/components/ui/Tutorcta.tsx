"use client";

import { Button } from "./button";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  DollarSign,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const floatingFeatures = [
  { icon: DollarSign, label: "Set Your Rates", offset: "md:translate-y-4" },
  { icon: Calendar, label: "Flexible Hours", offset: "md:-translate-y-4" },
  { icon: GraduationCap, label: "Teach Anywhere", offset: "md:translate-y-8" },
  { icon: Sparkles, label: "Expert Badge", offset: "md:translate-y-0" },
];

export function TutorCTA() {
  return (
    <section className="py-24 bg-background overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "relative rounded-[3.5rem] p-8 md:p-24 overflow-hidden border border-border transition-all duration-700",
            "bg-secondary/30 dark:bg-card/40 backdrop-blur-md",
          )}
        >
          {/* Static High-End Glows (Removed Pulse) */}
          <div className="absolute -top-24 -right-24 size-[500px] bg-primary/10 dark:bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 size-[400px] bg-primary/5 dark:bg-primary/[0.02] blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 items-center gap-20">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                <span className="size-1.5 rounded-full bg-primary" />
                Partner with us
              </div>

              <h2 className="text-5xl md:text-8xl font-black text-foreground leading-[0.8] tracking-tighter mb-10 uppercase">
                Ready to share <br />
                <span className="text-primary italic font-serif lowercase">
                  knowledge?
                </span>
              </h2>

              <p className="text-muted-foreground text-xl mb-12 leading-relaxed max-w-md font-medium italic opacity-80">
                Join our global community of elite mentors. Command your value,
                set your own tempo, and inspire excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl px-12 h-16 font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-primary/20"
                >
                  Become a Tutor
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary rounded-2xl px-10 h-16 font-black text-sm uppercase tracking-widest gap-3 transition-all group"
                >
                  Learn More
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Right Side: Structured Feature Grid (Removed Float Animation) */}
            <div className="hidden lg:grid grid-cols-2 gap-6">
              {floatingFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={cn(
                    "p-10 rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-500",
                    "bg-background/80 dark:bg-background/20 border border-border backdrop-blur-xl shadow-sm",
                    "hover:border-primary/40 hover:shadow-[0_20px_40px_rgba(var(--primary-rgb),0.1)] hover:-translate-y-1",
                    f.offset,
                  )}
                >
                  <div className="size-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-6">
                    <f.icon className="size-8 text-primary" />
                  </div>
                  <span className="text-foreground font-black text-[11px] uppercase tracking-[0.2em]">
                    {f.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
