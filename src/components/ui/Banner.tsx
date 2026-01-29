import { Button } from "@/components/ui/button";

import { ArrowRight, Star, Users, CheckCircle } from "lucide-react";
import { Badge } from "./badge";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-start gap-6">
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/5 text-primary px-4 py-1 rounded-full animate-in fade-in slide-in-from-top-4 duration-1000"
            >
              ✨ The Future of Learning is Here
            </Badge>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Bridge the Gap to <br />
              <span className="text-primary">Academic Excellence</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-[500px] leading-relaxed">
              Connect with world-class tutors instantly. Whether you're a
              student looking to excel or a tutor ready to share knowledge,
              SkillBridge is your platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-14 text-base shadow-lg shadow-primary/20 group"
              >
                Find a Tutor
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-secondary/30 text-foreground hover:bg-secondary/10 rounded-xl h-14 px-8"
              >
                Start Teaching
              </Button>
            </div>

            {/* Social Proof Stats */}
            <div className="flex items-center gap-6 pt-4 border-t border-border w-full">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="size-10 rounded-full border-2 border-background bg-accent flex items-center justify-center text-[10px] font-bold"
                  >
                    U{i}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="size-3 fill-current" />
                  <span className="font-bold text-foreground">4.9/5</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  from 2,000+ happy students
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual (Interactive Cards) */}
          <div className="relative flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000">
            <div className="relative w-full max-w-[500px] aspect-square rounded-3xl bg-accent/30 border border-primary/10 p-8 flex items-center justify-center">
              {/* Floating Tutor Card 1 */}
              <div className="absolute top-10 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-border flex items-center gap-4 animate-bounce-slow">
                <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <Users className="size-6" />
                </div>
                <div>
                  <p className="font-bold text-sm">Expert Tutors</p>
                  <p className="text-[10px] text-muted-foreground">
                    500+ Active now
                  </p>
                </div>
              </div>

              {/* Central Visual (Placeholder for a student image) */}
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                <div className="text-primary/40 font-black text-8xl uppercase tracking-tighter opacity-20">
                  Skill
                </div>
              </div>

              {/* Floating Status Card 2 */}
              <div className="absolute bottom-10 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-border flex items-center gap-4 animate-float">
                <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-white">
                  <CheckCircle className="size-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Session Booked</p>
                  <p className="text-[10px] text-muted-foreground">
                    Mathematics @ 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
