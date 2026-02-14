"use client";

import Link from "next/link";
import Image from "next/image";
import { Send, Github, Twitter, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 shrink-0 group">
              <div className="relative rounded-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
                <Image
                  src="https://res.cloudinary.com/dioe6nj4y/image/upload/v1770392888/leader_jhzssx.png"
                  height={30}
                  width={30}
                  // Logo is inverted in light mode to stay visible, stays original in dark mode
                  className="dark:invert-0 invert"
                  alt="Learn Hub"
                />
              </div>
              <span className="font-black text-xl tracking-tighter text-foreground">
                Learn<span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="mt-6 text-muted-foreground text-sm leading-relaxed max-w-xs">
              Empowering students worldwide by connecting them with vetted,
              world-class mentors. Quality education, simplified.
            </p>
            <div className="flex gap-4 mt-6">
              {[Twitter, Github, Linkedin, Facebook].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-sm"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-foreground uppercase tracking-widest text-xs mb-6">
              Platform
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
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects (Dynamic feel) */}
          <div>
            <h4 className="font-black text-foreground uppercase tracking-widest text-xs mb-6">
              Top Subjects
            </h4>
            <ul className="space-y-4">
              {["Physics", "Higher Math", "Accounting", "English"].map(
                (subject) => (
                  <li key={subject}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {subject}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-1">
            <h4 className="font-black text-foreground uppercase tracking-widest text-xs mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on new subjects and expert tips.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-muted/50 border border-border rounded-xl py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
              <button className="absolute right-2 top-2 p-1.5 bg-primary rounded-lg text-primary-foreground hover:opacity-90 transition-all">
                <Send className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
            © 2026 LearnHub Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (policy) => (
                <Link
                  key={policy}
                  href="#"
                  className="text-[10px] font-bold text-muted-foreground/50 hover:text-foreground uppercase tracking-widest transition-colors"
                >
                  {policy}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
