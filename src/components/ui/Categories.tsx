"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Atom,
  Beaker,
  Dna,
  Calculator,
  BookText,
  TrendingUp,
  Briefcase,
  PlusSquare,
  Languages,
  CircleSlash,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Physics: <Atom className="size-7" />,
  Chemistry: <Beaker className="size-7" />,
  Biology: <Dna className="size-7" />,
  "Higher Math": <PlusSquare className="size-7" />,
  "General Math": <Calculator className="size-7" />,
  Accounting: <BookText className="size-7" />,
  Finance: <TrendingUp className="size-7" />,
  "Business Management": <Briefcase className="size-7" />,
  "General Science": <CircleSlash className="size-7" />, // Replaced Loader2 to avoid unintentional "loading" look
  English: <Languages className="size-7" />,
};

interface Category {
  id: string;
  name: string;
}

const fetchCategories = async (): Promise<Category[]> => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network response was not ok");
  const json = await res.json();
  return json.data;
};

export function Categories() {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <section className="py-24 bg-background transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        {/* Subtle Background Mark - For Alabaster mode texture */}
        <div className="absolute -top-10 -right-10 text-[12rem] font-black text-foreground/[0.02] select-none pointer-events-none hidden lg:block">
          ACADEMIC
        </div>

        {/* Header Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-primary" />
            <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">
              Curriculum Mastery
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-none uppercase">
            Browse{" "}
            <span className="shimmer-gold italic lowercase font-serif">
              subjects
            </span>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[280px] w-full rounded-[2.5rem] bg-muted/50 border border-border"
              />
            ))
          ) : isError ? (
            <div className="col-span-full py-20 border-2 border-dashed border-border rounded-[2.5rem] text-center">
              <p className="text-foreground font-black uppercase tracking-widest mb-2">
                Discovery Interrupted
              </p>
              <p className="text-muted-foreground text-sm font-medium">
                We couldnt retrieve the curriculum categories at this time.
              </p>
            </div>
          ) : (
            categories?.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative p-12 rounded-[2.5rem] bg-card border border-border hover:border-primary/40 transition-all duration-500 cursor-pointer flex flex-col items-center text-center overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.1)]"
              >
                {/* Visual Depth Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 w-full flex flex-col items-center">
                  {/* Icon Frame */}
                  <div className="size-20 rounded-3xl bg-background border border-border flex items-center justify-center mb-8 text-muted-foreground group-hover:text-primary group-hover:border-primary/20 transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/5">
                    {iconMap[cat.name] || <BookText className="size-8" />}
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <div className="inline-flex items-center gap-2">
                      <div className="h-[1px] w-4 bg-muted-foreground/30 group-hover:bg-primary/30 transition-colors" />
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em]">
                        Expert Mentors
                      </p>
                      <div className="h-[1px] w-4 bg-muted-foreground/30 group-hover:bg-primary/30 transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Corner Geometric Accent */}
                <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="w-10 h-10 border-t border-r border-primary/40 rounded-tr-[1.5rem]" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
