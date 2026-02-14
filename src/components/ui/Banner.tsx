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
                <ArrowRight className="ml-2 size-5 " />
              </Button>
            </Link>

            <Link href={"/tutors"}>
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-card/50 hover:bg-accent text-foreground h-14 px-8 rounded-2xl transition-all hover:-translate-y-1" // Added slight lift
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
          <motion.div
            whileHover={{ y: -5 }}
            className="col-span-2 bg-card border border-border p-8 rounded-[2.5rem] flex items-center justify-between hover:border-primary/50 transition-all relative overflow-hidden group"
          >
            {/* Background Scrolling Tags with Edge Fading */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] pointer-events-none flex flex-col justify-center gap-2 rotate-[-5deg] scale-110">
              {/* Gradient Mask to fade text at edges */}
              <div className="absolute inset-0 bg-gradient-to-r from-card via-transparent to-card z-10" />

              <motion.div
                animate={{ x: [0, -400] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="whitespace-nowrap text-6xl font-black text-foreground uppercase"
              >
                #FIGMA #UIUX #3D #CANVAS #SPLINE #ADOBE #FIGMA #UIUX #3D #CANVAS
              </motion.div>

              <motion.div
                animate={{ x: [-400, 0] }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="whitespace-nowrap text-6xl font-black text-foreground uppercase"
              >
                #BRANDING #MOTION #WEB #MOBILE #ART #BRANDING #MOTION #WEB
                #MOBILE
              </motion.div>
            </div>

            {/* Left Content */}
            <div className="relative z-20">
              <div className="flex items-center gap-2 mb-2">
                <div className="size-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Creative Hub
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tighter">
                Design & Arts
              </h3>
              <p className="text-muted-foreground font-medium italic">
                UI/UX and Digital Illustration.
              </p>
            </div>

            {/* Right Content: Interactive Avatar Stack */}
            <motion.div
              className="flex -space-x-4 relative z-20"
              whileHover="hover"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  variants={{
                    hover: { x: i * -5 }, // Fans out slightly on hover
                  }}
                  className="relative"
                >
                  <Avatar className="border-4 border-card size-12 shadow-xl">
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?u=${i + 20}`}
                      alt={`Student ${i}`}
                    />
                    <AvatarFallback className="bg-muted text-foreground text-[10px]">
                      U{i}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              ))}

              <Avatar className="border-4 border-card size-12 shadow-xl ring-2 ring-primary/20">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-black">
                  +2k
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
