"use client";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Star, Clock, ShieldCheck, ArrowRight, User } from "lucide-react";
import { SpotlightCard } from "./spotlight-card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
interface Tutor {
  id: string;
  bio: string;
  hourlyRate: number;
  averageRating: number;
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
    <section className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-bold tracking-widest text-xs uppercase">
                Expert Mentors
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Top Rated <span className="text-primary italic">Tutors</span>
            </h2>
          </div>
          <Link href={"/tutors"}>
            <Button
              variant="ghost"
              className="text-primary hover:bg-primary/10 font-bold gap-2"
            >
              See all tutors <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((tutor, index) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <SpotlightCard className="h-full">
                <div
                  key={tutor.id}
                  className="group relative bg-card rounded-[2rem] border border-border p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-2"
                >
                  {/* Badge & Price */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase tracking-tighter px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full">
                      {tutor.category.name}
                    </span>
                    <p className="font-black text-lg">
                      ${tutor.hourlyRate}
                      <span className="text-xs opacity-40 font-medium">
                        /hr
                      </span>
                    </p>
                  </div>

                  {/* Profile Image - Handles NULL with a styled placeholder */}
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative mb-4">
                      <div className="size-24 rounded-[1.5rem] bg-background border-2 border-border group-hover:border-primary/50 p-1.5 transition-colors flex items-center justify-center overflow-hidden relative">
                        {tutor.user.image ? (
                          <Image
                            src={tutor.user.image}
                            alt={tutor.user.name}
                            fill
                            className="w-full h-full object-cover rounded-[1rem]"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary/20 rounded-[1rem] flex items-center justify-center">
                            <User className="size-10 text-primary/40" />
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-background p-1 rounded-full border border-border">
                        <ShieldCheck className="size-5 text-primary fill-primary/10" />
                      </div>
                    </div>

                    <h3 className="font-black text-xl leading-tight group-hover:text-primary transition-colors">
                      {tutor.user.name}
                    </h3>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1">
                      Verified Mentor
                    </p>
                  </div>

                  {/* Bio snippet */}
                  <p className="text-xs text-center opacity-70 line-clamp-2 mb-6 h-8">
                    {tutor.bio}
                  </p>

                  {/* Rating Section */}
                  <div className="flex items-center justify-center gap-1.5 mb-8 bg-background/50 py-2 rounded-xl border border-border/50">
                    <Star
                      className={`size-4 ${tutor.averageRating > 0 ? "fill-primary text-primary" : "text-border"}`}
                    />
                    <span className="text-sm font-black">
                      {tutor.averageRating > 0 ? tutor.averageRating : "New"}
                    </span>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-primary hover:bg-primary/80 text-background font-black py-4 rounded-2xl transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2 group-hover:gap-4">
                    <Link href={`/tutors/${tutor.id}`}>
                      Book Session
                    </Link>

                    <Clock className="size-4" />
                  </Button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
