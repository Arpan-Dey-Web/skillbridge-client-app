import React from "react";
import {
  Target,
  Users,
  Zap,
  GraduationCap,
  ArrowRight,
  Globe,
  ShieldCheck,
  Briefcase,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* 1. HERO SECTION: The Manifesto */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-10">
            Institutional Mission
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.85] uppercase">
            Human Intelligence <br />
            <span className="text-primary italic font-serif">Accelerated.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed font-medium">
            LearnHub is not a content library; it is an elite synchronization
            layer between the world's most ambitious students and the top 1% of
            subject matter experts. We replace passive consumption with active
            mastery.
          </p>
        </div>
      </section>

      {/* 2. ECOSYSTEM STATS: Institutional Trust */}
      <section className="py-12 border-y border-border bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatBlock label="Active Mentors" value="2.4k+" />
            <StatBlock label="Learning Hours" value="180k+" />
            <StatBlock label="Success Rate" value="98.2%" />
            <StatBlock label="Global Reach" value="45+" />
          </div>
        </div>
      </section>

      {/* 3. CORE PILLARS: Bento Grid of Values */}
      <section className="py-24 container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-4">
            The Methodology
          </h2>
          <p className="text-3xl font-black tracking-tight uppercase">
            Built on three core principles.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard
            icon={<Target className="size-6" />}
            title="Surgical Precision"
            description="We bypass the fluff. Our mentors identify your specific bottlenecks and provide the exact architectural guidance needed to move the needle."
          />
          <ValueCard
            icon={<ShieldCheck className="size-6" />}
            title="Vetted Pedigree"
            description="Only the top 1% of applicants pass our technical and pedagogical screening. You learn from practitioners, not just theorists."
          />
          <ValueCard
            icon={<Zap className="size-6" />}
            title="Atomic Feedback"
            description="Real-time correction prevents the formation of bad habits. Mastery is achieved through high-frequency, high-quality feedback loops."
          />
        </div>
      </section>

      {/* 4. THE PROBLEM: Narrative Section */}
      <section className="py-24 bg-card border-y border-border relative overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-border bg-secondary flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
              <Compass className="size-32 text-primary/20 animate-pulse" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 size-32 bg-primary/10 blur-3xl rounded-full" />
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">
              The end of <br />
              "Tutorial Hell."
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg font-medium">
              <p>
                The digital age has a content problem. Information is infinite,
                but <strong>direction</strong> is scarce. Students spend months
                watching video courses, only to realize they cannot build a
                project from scratch.
              </p>
              <p className="border-l-2 border-primary/30 pl-6 italic">
                "Passive learning creates the illusion of competence. Active
                mentorship creates the reality of mastery."
              </p>
              <p>
                LearnHub was engineered to solve this. By connecting students
                directly with verified architects, developers, and scholars, we
                turn abstract concepts into tangible career capital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. USER PATHWAYS: Deep Information */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="p-12 rounded-[3rem] bg-secondary/50 border border-border">
            <GraduationCap className="size-10 text-primary mb-6" />
            <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">
              For the Aspirant
            </h4>
            <ul className="space-y-4 text-muted-foreground font-medium">
              <li className="flex gap-3 items-start">
                <ArrowRight className="size-4 text-primary mt-1 shrink-0" />{" "}
                Tailored learning roadmaps for your specific goals.
              </li>
              <li className="flex gap-3 items-start">
                <ArrowRight className="size-4 text-primary mt-1 shrink-0" />{" "}
                Direct access to mentors from FAANG, Ivy Leagues, and top
                startups.
              </li>
              <li className="flex gap-3 items-start">
                <ArrowRight className="size-4 text-primary mt-1 shrink-0" />{" "}
                Private session recordings for lifelong review.
              </li>
            </ul>
          </div>
          <div className="p-12 rounded-[3rem] bg-foreground text-background border border-border">
            <Briefcase className="size-10 text-primary mb-6" />
            <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">
              For the Expert
            </h4>
            <ul className="space-y-4 opacity-80 font-medium">
              <li className="flex gap-3 items-start">
                <ArrowRight className="size-4 text-primary mt-1 shrink-0" />{" "}
                Monetize your expertise at your own hourly rate.
              </li>
              <li className="flex gap-3 items-start">
                <ArrowRight className="size-4 text-primary mt-1 shrink-0" />{" "}
                Automated scheduling and global payment processing.
              </li>
              <li className="flex gap-3 items-start">
                <ArrowRight className="size-4 text-primary mt-1 shrink-0" />{" "}
                Build your professional legacy by shaping the next generation.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="pb-32 container mx-auto px-6">
        <div className="bg-primary p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-primary-foreground tracking-tighter mb-12 uppercase leading-[0.9]">
              Secure your <br /> competitive edge.
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-16 px-12 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl"
              >
                <Link href="/tutors">Find a Mentor</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary-foreground/20 bg-transparent hover:bg-primary-foreground/10 text-primary-foreground h-16 px-12 rounded-2xl text-xs font-black uppercase tracking-[0.2em]"
              >
                <Link href="/auth/register">Apply to Teach</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center md:text-left">
      <p className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">
        {value}
      </p>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-1">
        {label}
      </p>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-12 rounded-[3rem] bg-card border border-border hover:border-primary/40 transition-all duration-500 group shadow-sm hover:shadow-xl hover:shadow-primary/5">
      <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-black mb-4 uppercase tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
}
