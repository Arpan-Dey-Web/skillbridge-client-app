"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Shield,
  Bell,
  Camera,
  MapPin,
  Calendar,
  Award,
  Pencil,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function StudentProfile() {
  const { data: session } = authClient.useSession();

  return (
    <div className="space-y-6">
      {/* 1. HERO IDENTITY CARD */}
      <SpotlightCard className="relative p-0 border-none overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="h-32 bg-gradient-to-r from-amber-600/20 via-primary/5 to-secondary/20" />

        <div className="px-8 pb-8 flex flex-col md:flex-row items-end gap-6 -mt-12 relative z-10">
          <div className="relative group">
            <div className="size-32 rounded-[2.5rem] bg-[#020617] border-4 border-[#020617] overflow-hidden shadow-2xl relative">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  fill
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                  <User size={48} />
                </div>
              )}
            </div>
            <button className="absolute inset-0 bg-black/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white size-6" />
            </button>
          </div>

          <div className="flex-1 pb-2">
            <h1 className="text-4xl font-black text-white tracking-tighter">
              {session?.user?.name || "Student Name"}
            </h1>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/40 uppercase tracking-widest">
                <MapPin size={14} className="text-primary" /> New York, USA
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/40 uppercase tracking-widest">
                <Calendar size={14} className="text-primary" /> Joined Feb 2026
              </span>
            </div>
          </div>

          <Button className="bg-primary text-background font-black rounded-2xl px-8 h-12 shadow-lg shadow-primary/20">
            <Pencil className="size-4 mr-2" /> Edit Profile
          </Button>
        </div>
      </SpotlightCard>

      {/* 2. BENTO INFORMATION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section (Wide) */}
        <SpotlightCard className="md:col-span-2 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-white tracking-tight">
              Biography
            </h3>
            <Award className="text-primary/40 size-6" />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed italic">
            Passionate learner currently focusing on mastering Next.js and
            Physics. Aiming to become a full-stack engineer by late 2026.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-background/50 border border-border rounded-2xl">
              <p className="text-[10px] font-bold text-primary uppercase mb-1">
                Email Address
              </p>
              <p className="text-sm text-white font-medium">
                {session?.user?.email}
              </p>
            </div>
            <div className="p-4 bg-background/50 border border-border rounded-2xl">
              <p className="text-[10px] font-bold text-primary uppercase mb-1">
                Phone Number
              </p>
              <p className="text-sm text-white font-medium">
                +1 (555) 000-1234
              </p>
            </div>
          </div>
        </SpotlightCard>

        {/* Security / System Sidebar (Vertical) */}
        <div className="flex flex-col gap-6">
          <SpotlightCard className="p-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">
              Security
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-primary" />
                  <span className="text-xs font-bold text-slate-300">
                    Two-Factor Auth
                  </span>
                </div>
                <div className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Bell size={16} className="text-primary" />
                  <span className="text-xs font-bold text-slate-300">
                    Email Alerts
                  </span>
                </div>
                <div className="size-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              </button>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-primary/5 border-primary/20">
            <div className="text-center">
              <div className="text-2xl font-black text-primary mb-1">Pro</div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">
                Account Status
              </p>
              <Button
                variant="outline"
                className="w-full border-primary/20 text-primary hover:bg-primary/10 text-xs font-bold rounded-xl"
              >
                Upgrade Plan
              </Button>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
