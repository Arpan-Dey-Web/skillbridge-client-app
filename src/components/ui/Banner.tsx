"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Image import
import nextJs from "../../../public/coding.jpg";
import book from "../../../public/book.jpg";
import Link from "next/link";
const Banner = () => {
  return (
    <section className="relative min-h-screen bg-[#020617] flex items-center pt-20 overflow-hidden">
      {/* Background Orbs for Depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Content */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Star className="size-3 fill-amber-500" />
            Level up your skills
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
            Learn from <br />
            <span className="shimmer-gold italic">the best.</span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
            SkillBridge connects you with elite tutors for high-impact
            mentorship. No noise, just measurable progress.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={"/register"}>
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold h-14 px-8 rounded-2xl group"
              >
                Join SkillBridge
                <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href={'/tutors'}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/10 bg-white/5 hover:bg-white/10 text-white h-14 px-8 rounded-2xl"
              >
                Browse All
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-white/5 pt-8">
            <div>
              <div className="text-3xl font-black text-white">4.9/5</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Satisfaction
              </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <div className="text-3xl font-black text-white">500+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Subject Experts
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Bento Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Development Card */}
          <div className="col-span-1 bg-white/5 border border-white/10 p-8 rounded-4xl aspect-square flex flex-col justify-end group relative overflow-hidden transition-colors duration-500 hover:border-amber-500/50">
            {/* Background Image Layer - Increased visibility and kept zoom */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
              <Image
                src={nextJs}
                alt="Next.js"
                fill
                className="object-cover opacity-40 grayscale-0 brightness-75 transition-all duration-500 group-hover:brightness-100"
              />
              {/* Dark gradient at bottom to keep text readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10">
              <div className="size-12 bg-amber-500 rounded-xl mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                <Play className="size-6 text-black fill-current" />
              </div>
              <h3 className="text-xl font-bold text-white">Development</h3>
              <p className="text-sm text-slate-300">Master Next.js & AI.</p>
            </div>
          </div>

          <div className="col-span-1  p-8 rounded-4xl aspect-square flex flex-col justify-end shadow-[0_0_50px_rgba(245,158,11,0.2)] relative overflow-hidden group">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
              <Image
                src={book}
                alt="Academics"
                fill
                className="object-cover opacity-100  brightness-75"
              />
              {/* Subtle gradient to keep the bottom text sharp */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-600/50 via-transparent to-transparent" />
            </div>

            {/* Floating Top Rated Badge */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-6 bg-black/10 backdrop-blur-md border border-black/5 px-3 py-1 rounded-full flex items-center gap-1 z-10"
            >
              <Star className="size-3 fill-black text-black" />
              <span className="text-[10px] font-black uppercase tracking-tighter text-black">
                Top Rated
              </span>
            </motion.div>

            {/* Content Layer */}
            <div className="relative z-10">
              <div className="size-12 bg-black/10 rounded-xl mb-4 flex items-center justify-center">
                <Star className="size-6 text-black fill-current" />
              </div>
              <h3 className="text-xl font-bold text-black">Academics</h3>
              <p className="text-sm text-black/70">SAT & Physics prep.</p>
            </div>
          </div>

          {/* Design & Arts Card */}
          <div className="col-span-2 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex items-center justify-between hover:border-amber-500/50 transition-colors relative overflow-hidden">
            {/* Background Scrolling Tags */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex flex-col justify-center gap-2 rotate-[-5deg] scale-110">
              <motion.div
                animate={{ x: [0, -200] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="whitespace-nowrap text-5xl font-black text-white"
              >
                #FIGMA #UIUX #3D #CANVAS #SPLINE #ADOBE #FIGMA #UIUX
              </motion.div>
              <motion.div
                animate={{ x: [-200, 0] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="whitespace-nowrap text-5xl font-black text-white"
              >
                #BRANDING #MOTION #WEB #MOBILE #ART #BRANDING #MOTION
              </motion.div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white">Design & Arts</h3>
              <p className="text-slate-500">UI/UX and Digital Illustration.</p>
            </div>

            <div className="flex -space-x-3 relative z-10">
              {/* Shadcn Avatar Stack */}
              {[1, 2, 3].map((i) => (
                <Avatar key={i} className="border-2 border-[#020617] size-10">
                  {/* You can add real URLs here later */}
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?u=${i}`}
                    alt={`Student ${i}`}
                  />
                  <AvatarFallback className="bg-slate-800 text-white text-[10px]">
                    U{i}
                  </AvatarFallback>
                </Avatar>
              ))}

              {/* The Counter as a Shadcn Avatar */}
              <Avatar className="border-2 border-[#020617] size-10">
                <AvatarFallback className="bg-amber-500 text-black text-[10px] font-bold">
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
