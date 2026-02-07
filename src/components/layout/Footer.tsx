"use client";

import Link from "next/link";
import Image from "next/image";
import { Send, Github, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 shrink-0 group">
              <div className="relative rounded-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110 ">
                <Image
                  src="https://res.cloudinary.com/dioe6nj4y/image/upload/v1770392888/leader_jhzssx.png"
                  height={30}
                  width={30}
                  className=" invert "
                  alt="Learn Hub"
                />
              </div>
              <span className="font-black text-xl tracking-tighter text-white">
                Learn<span className="text-amber-500">Hub</span>
              </span>
            </Link>
            <p className="mt-6 text-foreground/50 text-sm leading-relaxed max-w-xs">
              Empowering students worldwide by connecting them with vetted,
              world-class mentors. Quality education, simplified.
            </p>
            <div className="flex gap-4 mt-6">
              {[Twitter, Github, Linkedin, Facebook].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-2 rounded-lg bg-card border border-border text-foreground/40 hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-white uppercase tracking-widest text-xs mb-6">
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
                    className="text-sm text-foreground/50 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects (Dynamic feel) */}
          <div>
            <h4 className="font-black text-white uppercase tracking-widest text-xs mb-6">
              Top Subjects
            </h4>
            <ul className="space-y-4">
              {["Physics", "Higher Math", "Accounting", "English"].map(
                (subject) => (
                  <li key={subject}>
                    <Link
                      href="#"
                      className="text-sm text-foreground/50 hover:text-primary transition-colors"
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
            <h4 className="font-black text-white uppercase tracking-widest text-xs mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-foreground/50 mb-4">
              Get the latest updates on new subjects and expert tips.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-card border border-border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
              <button className="absolute right-2 top-2 p-1.5 bg-primary rounded-lg text-background hover:bg-primary/80 transition-all">
                <Send className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
            © 2026 SkillBridge Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="#"
              className="text-[10px] font-bold text-foreground/30 hover:text-white uppercase tracking-widest"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[10px] font-bold text-foreground/30 hover:text-white uppercase tracking-widest"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-[10px] font-bold text-foreground/30 hover:text-white uppercase tracking-widest"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
