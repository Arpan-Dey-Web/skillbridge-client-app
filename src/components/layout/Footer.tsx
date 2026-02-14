"use client";

import Link from "next/link";
import Image from "next/image";
import { Send, Github, Twitter, Linkedin, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-24 pb-12 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 group mb-8"
            >
              <div className="relative size-8 rounded-lg flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:rotate-12">
                <Image
                  src="https://res.cloudinary.com/dioe6nj4y/image/upload/v1770392888/leader_jhzssx.png"
                  height={32}
                  width={32}
                  className="dark:invert-0 invert transition-all duration-500"
                  alt="Learn Hub"
                />
              </div>
              <span className="font-black text-2xl tracking-tighter text-foreground uppercase">
                Learn
                <span className="text-primary italic font-serif lowercase">
                  Hub
                </span>
              </span>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px] font-medium italic opacity-80">
              Connecting ambition with expertise. Our platform facilitates elite
              1-on-1 mentorship for the next generation of global leaders.
            </p>

            <div className="flex gap-3 mt-8">
              {[Twitter, Github, Linkedin, Facebook].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="size-10 flex items-center justify-center rounded-xl bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-10">
            <h4 className="font-black text-foreground uppercase tracking-[0.3em] text-[10px] mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {[
                "Find Tutors",
                "Join as Tutor",
                "Success Stories",
                "About Us",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-black text-foreground uppercase tracking-[0.3em] text-[10px] mb-8">
              Curriculum
            </h4>
            <ul className="space-y-4">
              {[
                "Physics Mastery",
                "Higher Mathematics",
                "Strategic Accounting",
                "English Literature",
              ].map((subject) => (
                <li key={subject}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
                  >
                    {subject}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-1">
            <h4 className="font-black text-foreground uppercase tracking-[0.3em] text-[10px] mb-8">
              Intelligence
            </h4>
            <p className="text-sm text-muted-foreground mb-6 font-medium leading-relaxed">
              Receive exclusive academic insights and platform updates.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Institutional Email"
                className="w-full bg-card border border-border rounded-2xl py-4 px-5 text-xs text-foreground placeholder:text-muted-foreground/50 placeholder:uppercase placeholder:tracking-widest focus:outline-none focus:border-primary/40 transition-all duration-500"
              />
              <button className="absolute right-2 top-2 size-10 flex items-center justify-center bg-primary rounded-xl text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20">
                <Send className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="size-1.5 rounded-full bg-primary/40" />
            <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">
              © 2026 LearnHub Global Architecture.
            </p>
          </div>

          <div className="flex gap-10">
            {["Privacy", "Terms", "Legal"].map((policy) => (
              <Link
                key={policy}
                href="#"
                className="text-[9px] font-black text-muted-foreground/40 hover:text-primary uppercase tracking-[0.2em] transition-colors duration-300"
              >
                {policy}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
