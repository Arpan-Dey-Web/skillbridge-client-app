"use client";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { ShieldCheck, ArrowRight, User } from "lucide-react";
import { SpotlightCard } from "./spotlight-card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tutors`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setTutors(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Simple Header */}
        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-primary" />

              <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">
                Elite Networks
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              Industry <span className="shimmer-gold">Masters</span>
            </h2>
          </div>

          <Link href={"/tutors"}>
            <Button
              variant="link"
              className="text-primary font-black uppercase text-[10px] tracking-widest gap-2"
            >
              View All Mentors <ArrowRight size={14} />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.slice(0, 4).map((tutor, index) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/tutors/${tutor.id}`}>
                <SpotlightCard className="p-0 rounded-[2rem] bg-white/[0.01] border-white/5 group hover:border-primary/30 transition-all duration-500">
                  <div className="p-8 flex flex-col items-center text-center">
                    {/* Minimal Profile Image */}
                    <div className="relative mb-6">
                      <div className="size-24 rounded-3xl bg-white/5 border border-white/10 p-1 group-hover:rotate-3 transition-transform duration-500">
                        {tutor.user.image ? (
                          <Image
                            src={tutor.user.image}
                            alt={tutor.user.name}
                            fill
                            className="object-cover rounded-2xl"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5 rounded-2xl flex items-center justify-center">
                            <span className="text-2xl font-black shimmer-gold italic">
                              {tutor.user.name[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-background p-1 rounded-full">
                        <ShieldCheck className="size-4 text-primary fill-primary/10" />
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-1 mb-6">
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/80 bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
                        {tutor.category.name}
                      </span>
                      <h3 className="font-black text-xl text-white uppercase italic tracking-tighter pt-2">
                        {tutor.user.name}
                      </h3>
                    </div>

                    {/* Bio Snippet */}
                    <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mb-6 italic">
                      {tutor.bio}
                    </p>

                    {/* Simple Divider */}
                    <div className="w-full h-px bg-white/5 mb-6" />

                    {/* Price & Action CTA */}
                    <div className="w-full flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-sm font-black text-white leading-none">
                          ${tutor.hourlyRate}
                        </p>
                        <span className="text-[7px] font-bold text-slate-600 uppercase tracking-widest">
                          / Hour
                        </span>
                      </div>
                      <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                        <ArrowRight size={16} />
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
