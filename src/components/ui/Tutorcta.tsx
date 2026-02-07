"use client";

import { Button } from "./button";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  DollarSign,
  Calendar,
} from "lucide-react";

export function TutorCTA() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="relative rounded-[3rem] bg-secondary p-8 md:p-20 overflow-hidden border border-white/5">
          {/* Decorative Elements */}
          <div className="absolute -top-24 -right-24 size-96 bg-primary/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 size-96 bg-primary/5 blur-[80px] rounded-full" />

          <div className="relative z-10 grid md:grid-cols-2 items-center gap-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                <Sparkles className="size-3" />
                Join the Mission
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Ready to share <br />
                <span className="text-primary italic">your knowledge?</span>
              </h2>

              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-md">
                Join our community of expert tutors. Set your own rates, choose
                your hours, and teach the subjects you love.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-background hover:bg-primary/90 rounded-2xl px-10 h-16 font-black text-lg transition-transform hover:scale-105"
                >
                  Become a Tutor
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/5 rounded-2xl px-8 h-16 font-bold gap-2"
                >
                  Learn More <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>

            {/* Right Side: Feature Highlights */}
            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-background/40 border border-white/5 backdrop-blur-sm flex flex-col items-center text-center">
                <DollarSign className="size-8 text-primary mb-3" />
                <span className="text-white font-bold">Set Your Rates</span>
              </div>
              <div className="p-6 rounded-3xl bg-background/40 border border-white/5 backdrop-blur-sm flex flex-col items-center text-center mt-8">
                <Calendar className="size-8 text-primary mb-3" />
                <span className="text-white font-bold">Flexible Hours</span>
              </div>
              <div className="p-6 rounded-3xl bg-background/40 border border-white/5 backdrop-blur-sm flex flex-col items-center text-center -mt-8">
                <GraduationCap className="size-8 text-primary mb-3" />
                <span className="text-white font-bold">Teach Anywhere</span>
              </div>
              <div className="p-6 rounded-3xl bg-background/40 border border-white/5 backdrop-blur-sm flex flex-col items-center text-center">
                <Sparkles className="size-8 text-primary mb-3" />
                <span className="text-white font-bold">Expert Badge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
