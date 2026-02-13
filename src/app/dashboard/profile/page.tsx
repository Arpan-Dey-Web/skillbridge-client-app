"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Shield,
  Bell,
  Camera,
  MapPin,
  Calendar,
  Award,
  Pencil,
  BookOpen,
  History,
  TrendingUp,
  Zap,
  Loader2,
  Save,
  X,
  Phone,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldUploadWidget } from "next-cloudinary";

export default function StudentProfile() {
  const { data: session } = authClient.useSession();
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setPhone((session.user as any).phone || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const { error } = await authClient.updateUser({
        name: name,
        image: image,
        phone: phone,
      });

      if (error) {
        toast.error(error.message || "Update failed");
      } else {
        toast.success("Identity synchronized successfully!");
        setOpen(false);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  const onUploadSuccess = async (result: any) => {
    const newImageUrl = result.info.secure_url;
    setImage(newImageUrl);
    const { error } = await authClient.updateUser({
      image: newImageUrl,
    });

    if (error) {
      toast.error("Cloud upload success, but profile sync failed.");
    } else {
      toast.success("Profile picture updated!");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 font-sans">
      {/* 1. HERO IDENTITY CARD */}
      <SpotlightCard className="relative p-0 border-white/5 overflow-hidden rounded-[3rem]">
        <div className="h-44 bg-gradient-to-br from-amber-500/10 via-primary/5 to-transparent relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="px-10 pb-10 flex flex-col md:flex-row items-end gap-8 -mt-20 relative z-10">
          {/* PROFILE IMAGE + CLOUDINARY UPLOAD SECTION */}
          <div className="relative group">
            <div className="size-44 rounded-[3rem] bg-[#0c0c0e] border-[8px] border-[#0c0c0e] overflow-hidden shadow-2xl relative">
              {image || session?.user?.image ? (
                <Image
                  src={image || session?.user?.image || ""}
                  alt="Profile"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5 text-primary">
                  <User size={64} />
                </div>
              )}
            </div>

           
            <CldUploadWidget
              uploadPreset="ml_default" 
              onSuccess={onUploadSuccess}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="absolute inset-4 bg-black/60 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-white/20"
                >
                  <Camera className="text-white size-7 mb-1" />
                  <span className="text-[8px] font-black text-white uppercase tracking-tighter">
                    Update
                  </span>
                </button>
              )}
            </CldUploadWidget>
          </div>

          <div className="flex-1 pb-2">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none">
                {session?.user?.name || "Student Name"}
              </h1>
              <div className="px-3 py-1 bg-primary rounded-lg text-[10px] font-black text-black uppercase tracking-widest mt-1">
                {session?.user?.role || "STUDENT"}
              </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                <MapPin size={14} className="text-primary" /> Global Access
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                <Calendar size={14} className="text-primary" /> Member Since
                2026
              </div>
            </div>
          </div>

          {/* EDIT PROFILE MODAL */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-black hover:bg-primary font-black rounded-2xl px-8 h-14 transition-all uppercase tracking-widest text-[11px] group">
                <Pencil className="size-4 mr-2 group-hover:rotate-12 transition-transform" />
                Edit Details
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0c0c0e] border-white/10 text-white rounded-[2.5rem] p-10 max-w-lg shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-4xl font-black uppercase italic tracking-tighter">
                  Update <span className="shimmer-gold">Profile</span>
                </DialogTitle>
                <DialogDescription className="text-slate-500 font-medium italic mt-2">
                  Modify your public identity and contact information.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleUpdate} className="space-y-6 mt-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                      Full Name
                    </Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/[0.03] border-white/10 rounded-xl h-12 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                      Phone Number
                    </Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-white/[0.03] border-white/10 rounded-xl h-12 focus:border-primary/50 transition-all"
                    />
                  </div>
                
                </div>

                <DialogFooter className="pt-6">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary hover:bg-white text-black font-black uppercase h-14 rounded-2xl transition-all gap-3 active:scale-95"
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin size-5" />
                    ) : (
                      <Save size={18} />
                    )}
                    {isPending ? "Syncing..." : "Apply Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </SpotlightCard>

      {/* 2. DYNAMIC BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            icon={<BookOpen size={20} />}
            label="Total Sessions"
            value="24"
            color="text-primary"
          />
          <StatCard
            icon={<History size={20} />}
            label="Study Hours"
            value="128h"
            color="text-amber-500"
          />
          <StatCard
            icon={<TrendingUp size={20} />}
            label="Success Rate"
            value="98%"
            color="text-emerald-500"
          />
        </div>

        <SpotlightCard className="md:col-span-4 md:row-span-2 p-8 border-white/5 overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <Zap size={16} className="text-primary" /> Focus Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js",
                "Physics",
                "Linear Algebra",
                "UI Design",
                "Tailwind",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest hover:border-primary/40 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-white/5">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                Current Goal
              </h3>
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 italic">
                <p className="text-xs text-white/80 font-bold leading-relaxed">
                  "Mastering full-stack architecture and real-time data sync by
                  late 2026."
                </p>
              </div>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard className="md:col-span-8 p-10 border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">
              The <span className="shimmer-gold">Brief</span>
            </h3>
            <Award className="text-primary/40 size-6" />
          </div>
          <p className="text-slate-400 text-sm leading-[1.8] italic mb-10 max-w-2xl">
            Passionate learner currently focusing on mastering Next.js and
            Physics. Aiming to become a full-stack engineer by late 2026.
            Focused on high-performance web systems and interactive UI
            animations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoTile
              label="Registered Email"
              value={session?.user?.email || "n/a"}
            />
            <InfoTile
              label="Contact Number"
              value={(session?.user as any)?.phone || "No contact linked"}
            />
          </div>
        </SpotlightCard>

        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            icon={<Shield size={18} />}
            title="Two-Factor Security"
            status="Active"
            statusColor="bg-emerald-500"
          />
          <ActionCard
            icon={<Bell size={18} />}
            title="System Notifications"
            status="Enabled"
            statusColor="bg-primary"
          />
          <ActionCard
            icon={<User size={18} />}
            title="Identity Privacy"
            status="Public"
            statusColor="bg-slate-700"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <SpotlightCard className="p-6 border-white/5 flex flex-col items-center text-center group">
      <div
        className={cn(
          "mb-4 p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-500",
          color,
        )}
      >
        {icon}
      </div>
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">
        {label}
      </span>
      <span className="text-2xl font-black text-white tracking-tighter">
        {value}
      </span>
    </SpotlightCard>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="group p-5 bg-white/[0.02] border border-white/5 rounded-[1.5rem] hover:bg-white/[0.04] transition-all">
      <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2">
        {label}
      </p>
      <p className="text-sm text-white font-bold tracking-tight">{value}</p>
    </div>
  );
}

function ActionCard({ icon, title, status, statusColor }: any) {
  return (
    <SpotlightCard className="p-5 flex items-center justify-between border-white/5 group">
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-xl bg-white/5 text-primary group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
          {title}
        </span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
        <div
          className={cn("size-1.5 rounded-full animate-pulse", statusColor)}
        />
        <span className="text-[8px] font-black text-white uppercase">
          {status}
        </span>
      </div>
    </SpotlightCard>
  );
}
