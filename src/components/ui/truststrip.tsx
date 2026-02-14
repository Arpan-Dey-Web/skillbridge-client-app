"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { label: "Active Students", value: "12,000+" },
  { label: "Expert Mentors", value: "500+" },
  { label: "Subjects", value: "120+" },
  { label: "Success Rate", value: "99.9%" },
];

export function TrustStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="w-full bg-card border-y border-border py-12 transition-colors duration-500"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-between items-center gap-y-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              // Responsive width: 50% on mobile, auto on desktop
              className="w-1/2 md:w-auto flex flex-col items-center md:items-start px-4"
            >
              <div className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
