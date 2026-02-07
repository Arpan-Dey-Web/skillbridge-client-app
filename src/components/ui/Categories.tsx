"use client";
import { useEffect, useState } from "react";
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

const iconMap: Record<string, React.ReactNode> = {
  Physics: <Atom className="size-6" />,
  Chemistry: <Beaker className="size-6" />,
  Biology: <Dna className="size-6" />,
  "Higher Math": <PlusSquare className="size-6" />,
  "General Math": <Calculator className="size-6" />,
  Accounting: <BookText className="size-6" />,
  Finance: <TrendingUp className="size-6" />,
  "Buissness Management": <Briefcase className="size-6" />,
  "General Science": <Loader2 className="size-6" />,
  English: <Languages className="size-6" />,
};

interface Category {
  id: string;
  name: string;
}

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`)
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 bg-background">
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
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center text-center"
            >
              {/* Subtle Gradient Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex flex-col items-center">
                {/* Icon Box */}
                <div className="size-16 rounded-2xl bg-background border border-border flex items-center justify-center mb-6 text-foreground group-hover:text-primary group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500 shadow-inner">
                  {iconMap[cat.name] || <BookText className="size-7" />}
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest group-hover:text-primary/60 transition-colors">
                    Find Mentors
                  </p>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
