"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Active Students", value: 12000, suffix: "+" },
  { label: "Expert Mentors", value: 500, suffix: "+" },
  { label: "Subjects", value: 120, suffix: "+" },
  { label: "Success Rate", value: 99.9, suffix: "%", decimals: 1 },
];

function Counter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(latest),
  );

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2.5, // Slightly slower for more "Elite" feel
        ease: [0.16, 1, 0.3, 1], // Custom out-expo ease
      });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      <span className="text-primary/80 ml-1">{suffix}</span>
    </span>
  );
}

export function TrustStrip() {
  return (
    <section className="relative w-full bg-background border-y border-border/50 py-20 overflow-hidden">
      {/* Dynamic Background Noise/Glow */}
      <div className="absolute inset-0 bg-primary/[0.01] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-4 place-items-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative flex flex-col items-center w-full max-w-[200px]"
            >
              {/* Top Accent Line */}
              <div className="w-8 h-[2px] bg-primary/20 group-hover:bg-primary group-hover:w-12 transition-all duration-500 mb-6" />

              {/* Number Container */}
              <div className="relative h-14 md:h-16 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-none">
                <span className="relative z-10 text-primary group-hover:drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] transition-all duration-500">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </span>
                {/* Background Shadow Number for Depth (Optional Style) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] scale-110 select-none blur-[2px]">
                  {stat.value}
                  {stat.suffix}
                </div>
              </div>

              {/* Label with pulsing side-indicators */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="text-[10px] md:text-[11px] font-black text-muted-foreground uppercase tracking-[0.4em] transition-colors group-hover:text-foreground">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
