"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

// Image imports
import nextJs from "../../../public/coding.jpg";
import book from "../../../public/book.jpg";

const Banner = () => {
  return (
    <section className="relative min-h-screen bg-background flex items-center pt-20 overflow-hidden transition-colors duration-500">
      {/* Background Orbs for Depth - Using primary/accent with transparency */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Content */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <Star className="size-3 fill-primary" />
            Level up your skills
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-foreground leading-[0.9] tracking-tighter mb-8">
            Learn from <br />
            <span className="shimmer-gold italic">the best.</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
            LearnHub connects you with elite tutors for high-impact mentorship.
            No noise, just measurable progress.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={"/register"}>
              <Button
                size="lg"
                className="bg-primary hover:opacity-90 text-primary-foreground font-bold h-14 px-8 rounded-2xl group transition-all shadow-lg shadow-primary/20"
              >
                Join LearnHub
                <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href={"/tutors"}>
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-card/50 hover:bg-accent text-foreground h-14 px-8 rounded-2xl transition-all"
              >
                Browse All
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-border pt-8">
            <div>
              <div className="text-3xl font-black text-foreground">4.9/5</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Satisfaction
              </div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-3xl font-black text-foreground">500+</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Subject Experts
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Bento Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Development Card */}
          <div className="col-span-1 bg-card border border-border p-8 rounded-[2rem] aspect-square flex flex-col justify-end group relative overflow-hidden transition-all duration-500 hover:border-primary/50">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
              <Image
                src={nextJs}
                alt="Next.js"
                fill
                className="object-cover opacity-40 grayscale-0 brightness-75 transition-all duration-500 group-hover:brightness-100"
              />
              {/* Adaptive gradient at bottom to keep text readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10">
              <div className="size-12 bg-primary rounded-xl mb-4 flex items-center justify-center shadow-lg shadow-primary/30">
                <Play className="size-6 text-primary-foreground fill-current" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Development</h3>
              <p className="text-sm text-muted-foreground">
                Master Next.js & AI.
              </p>
            </div>
          </div>

          {/* Academics Card */}
          <div className="col-span-1 p-8 rounded-[2rem] aspect-square flex flex-col justify-end shadow-2xl relative overflow-hidden group">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
              <Image
                src={book}
                alt="Academics"
                fill
                className="object-cover opacity-100 brightness-90"
              />
              {/* Gradient using primary color for brand consistency */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            </div>

            {/* Floating Top Rated Badge */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-6 bg-background/30 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex items-center gap-1 z-10"
            >
              <Star className="size-3 fill-primary-foreground text-primary-foreground" />
              <span className="text-[10px] font-black uppercase tracking-tighter text-primary-foreground">
                Top Rated
              </span>
            </motion.div>

            {/* Content Layer */}
            <div className="relative z-10">
              <div className="size-12 bg-background/20 backdrop-blur-sm rounded-xl mb-4 flex items-center justify-center border border-white/10">
                <Star className="size-6 text-primary-foreground fill-current" />
              </div>
              <h3 className="text-xl font-bold text-primary-foreground">
                Academics
              </h3>
              <p className="text-sm text-primary-foreground/80">
                SAT & Physics prep.
              </p>
            </div>
          </div>

          {/* Design & Arts Card */}
          <div className="col-span-2 bg-card border border-border p-8 rounded-[2.5rem] flex items-center justify-between hover:border-primary/50 transition-all relative overflow-hidden">
            {/* Background Scrolling Tags */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex flex-col justify-center gap-2 rotate-[-5deg] scale-110">
              <motion.div
                animate={{ x: [0, -200] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="whitespace-nowrap text-5xl font-black text-foreground"
              >
                #FIGMA #UIUX #3D #CANVAS #SPLINE #ADOBE #FIGMA #UIUX
              </motion.div>
              <motion.div
                animate={{ x: [-200, 0] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="whitespace-nowrap text-5xl font-black text-foreground"
              >
                #BRANDING #MOTION #WEB #MOBILE #ART #BRANDING #MOTION
              </motion.div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-foreground">
                Design & Arts
              </h3>
              <p className="text-muted-foreground">
                UI/UX and Digital Illustration.
              </p>
            </div>

            <div className="flex -space-x-3 relative z-10">
              {/* Shadcn Avatar Stack */}
              {[1, 2, 3].map((i) => (
                <Avatar key={i} className="border-2 border-background size-10">
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?u=${i}`}
                    alt={`Student ${i}`}
                  />
                  <AvatarFallback className="bg-muted text-foreground text-[10px]">
                    U{i}
                  </AvatarFallback>
                </Avatar>
              ))}

              {/* The Counter as a Shadcn Avatar */}
              <Avatar className="border-2 border-background size-10 shadow-lg">
                <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-bold">
                  +2k
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
