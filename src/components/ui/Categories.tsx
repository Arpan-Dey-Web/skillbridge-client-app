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
  Loader2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// 1. Icon Mapping
const iconMap: Record<string, React.ReactNode> = {
  Physics: <Atom className="size-6" />,
  Chemistry: <Beaker className="size-6" />,
  Biology: <Dna className="size-6" />,
  "Higher Math": <PlusSquare className="size-6" />,
  "General Math": <Calculator className="size-6" />,
  Accounting: <BookText className="size-6" />,
  Finance: <TrendingUp className="size-6" />,
  "Business Management": <Briefcase className="size-6" />,
  "General Science": <Loader2 className="size-6" />,
  English: <Languages className="size-6" />,
};

interface Category {
  id: string;
  name: string;
}

// 2. Fetcher function
const fetchCategories = async (): Promise<Category[]> => {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await res.json();
  return json.data;
};

export function Categories() {
  // 3. TanStack Query Hook
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <section className="py-24 bg-background transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              Academic Excellence
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter">
            Explore <span className="shimmer-gold italic">Subjects</span>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {isLoading ? (
            // 4. Loading state with shadcn Skeletons
            Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[240px] w-full rounded-xl bg-muted"
              />
            ))
          ) : isError ? (
            // 5. Error state
            <div className="col-span-full py-20 text-center">
              <p className="text-destructive font-bold mb-2">
                Failed to load subjects.
              </p>
              <p className="text-muted-foreground text-sm">
                Please check your connection and try again.
              </p>
            </div>
          ) : (
            // 6. Data rendering
            categories?.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative p-10 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Adaptive Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon Container */}
                  <div className="size-16 rounded-2xl bg-background border border-border flex items-center justify-center mb-6 text-muted-foreground group-hover:text-primary group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500 shadow-sm">
                    {iconMap[cat.name] || <BookText className="size-7" />}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] group-hover:text-primary/70 transition-colors">
                      Find Mentors
                    </p>
                  </div>
                </div>

                {/* Decorative Corner Accent */}
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                  <div className="w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-xl" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
