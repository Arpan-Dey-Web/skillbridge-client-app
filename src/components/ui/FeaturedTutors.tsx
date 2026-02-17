"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ShieldCheck, ArrowRight, User } from "lucide-react";
import { SpotlightCard } from "./spotlight-card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Tutor {
  id: string;
  bio: string;
  hourlyRate: number;
  user: {
    name: string;
    image: string | null;
  };
  category: {
    name: string;
  };
}

export function FeaturedTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tutors`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setTutors(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-background transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-10 bg-primary" />
              <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">
                Elite Networks
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none text-foreground">
              Industry{" "}
              <span className="shimmer-gold italic lowercase font-serif">
                Masters
              </span>
            </h2>
          </div>

          <Link href={"/tutors"}>
            <Button
              variant="outline"
              className={cn(
                "border-border rounded-xl px-8 h-12 text-[10px] font-black uppercase tracking-widest gap-3 transition-all duration-500",
                "hover:bg-primary hover:border-primary",
              )}
            >
              Browse All Mentors <ArrowRight size={14} />
            </Button>
          </Link>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-[450px] w-full rounded-[2.5rem] bg-secondary/30 border border-border flex items-center justify-center"
                >
                  {/* Static Loader Icon */}
                  <User className="text-muted-foreground/20 size-12" />
                </div>
              ))
            : tutors.slice(0, 4).map((tutor, index) => (
                <motion.div
                  key={tutor.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/tutors/${tutor.id}`} className="block">
                    <SpotlightCard className="p-0 rounded-[2.5rem] bg-card border border-border group hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.05)]">
                      <div className="p-10 flex flex-col items-center text-center">
                        {/* Profile Image with 'Credential' Look */}
                        <div className="relative mb-8">
                          <div className="size-28 rounded-[2rem] bg-background border border-border p-1.5 transition-transform duration-700 group-hover:rotate-6 overflow-hidden relative shadow-sm">
                            {tutor.user.image ? (
                              <Image
                                src={tutor.user.image}
                                alt={tutor.user.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full bg-secondary rounded-[1.5rem] flex items-center justify-center">
                                <span className="text-3xl font-black text-primary italic">
                                  {tutor.user.name[0]}
                                </span>
                              </div>
                            )}
                          </div>
                          {/* Verified Badge */}
                          <div className="absolute -bottom-2 -right-2 bg-background border border-border p-2 rounded-2xl shadow-lg z-10">
                            <ShieldCheck className="size-5 text-primary" />
                          </div>
                        </div>

                        {/* Info Block */}
                        <div className="space-y-3 mb-8 w-full">
                          <span className="inline-block text-[9px] font-black uppercase tracking-[0.25em] text-primary bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">
                            {tutor.category.name}
                          </span>
                          <h3 className="font-black text-2xl text-foreground uppercase tracking-tighter leading-none pt-2">
                            {tutor.user.name}
                          </h3>
                          <p className="text-[12px] text-muted-foreground font-medium line-clamp-2 italic leading-relaxed px-2">
                            {tutor.bio}
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="w-12 h-[2px] bg-border group-hover:bg-primary group-hover:w-full transition-all duration-700 mb-8" />

                        {/* Footer Info */}
                        <div className="w-full flex items-center justify-between">
                          <div className="text-left">
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl font-black text-foreground">
                                ${tutor.hourlyRate}
                              </span>
                              <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                                /hr
                              </span>
                            </div>
                          </div>
                          <div className="size-12 rounded-2xl bg-secondary border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500">
                            <ArrowRight
                              size={18}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
