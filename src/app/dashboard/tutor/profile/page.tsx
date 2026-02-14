"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

// 1. Define the Extended User type for the entire component
interface ExtendedUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role?: string;
  phone?: string;
}

export default function StudentProfile() {
  const { data: session } = authClient.useSession();

  // Cast session.user to our ExtendedUser safely
  const user = session?.user as ExtendedUser | undefined;

  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
    
      const { error } = await (authClient.updateUser as any)({
        name,
        image,
        phone,
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

    const { error } = await (authClient.updateUser as any)({
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
      {/* --- HERO IDENTITY CARD --- */}
      <SpotlightCard className="relative p-0 border-border overflow-hidden rounded-[3rem] bg-card/50">
        <div className="h-44 bg-gradient-to-br from-amber-500/20 via-primary/10 to-transparent relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 dark:opacity-20" />
        </div>

        <div className="px-10 pb-10 flex flex-col md:flex-row items-end gap-8 -mt-20 relative z-10">
          <div className="relative group">
            <div className="size-44 rounded-[3rem] bg-background border-[8px] border-background overflow-hidden shadow-2xl relative">
              {image || user?.image ? (
                <Image
                  src={image || user?.image || ""}
                  alt="Profile"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary text-amber-500">
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
                  className="absolute inset-4 bg-foreground/60 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-border/50 z-20"
                >
                  <Camera className="text-background size-7 mb-1" />
                  <span className="text-[8px] font-black text-background uppercase tracking-tighter">
                    Update Identity
                  </span>
                </button>
              )}
            </CldUploadWidget>
          </div>

          <div className="flex-1 pb-2">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-5xl font-black text-foreground tracking-tighter italic uppercase leading-none">
                {user?.name || "Student Name"}
              </h1>
              <div className="px-3 py-1 bg-amber-500 rounded-lg text-[10px] font-black text-black uppercase tracking-widest mt-1">
                {user?.role || "STUDENT"}
              </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                <MapPin size={14} className="text-amber-500" /> Global Access
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                <Calendar size={14} className="text-amber-500" /> Member Since
                2026
              </div>
            </div>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-foreground text-background hover:bg-amber-500 hover:text-black font-black rounded-2xl px-8 h-14 transition-all uppercase tracking-widest text-[11px] group">
                <Pencil className="size-4 mr-2 group-hover:rotate-12 transition-transform" />
                Edit Details
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border text-foreground rounded-[2.5rem] p-10 max-w-lg shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-4xl font-black uppercase italic tracking-tighter">
                  Update <span className="shimmer-gold">Profile</span>
                </DialogTitle>
                <DialogDescription className="text-muted-foreground font-medium italic mt-2">
                  Modify your public identity and contact information.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleUpdate} className="space-y-6 mt-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 ml-1">
                      Full Name
                    </Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-secondary/50 border-border rounded-xl h-12 focus-visible:ring-amber-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 ml-1">
                      Phone Number
                    </Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-secondary/50 border-border rounded-xl h-12 focus-visible:ring-amber-500 transition-all"
                    />
                  </div>
                </div>

                <DialogFooter className="pt-6">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-amber-500 hover:bg-foreground hover:text-background text-black font-black uppercase h-14 rounded-2xl transition-all gap-3 active:scale-95 shadow-lg shadow-amber-500/20"
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

      {/* --- BENTO GRID SECTIONS --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            icon={<BookOpen size={20} />}
            label="Total Sessions"
            value="24"
            color="text-amber-500"
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

        <SpotlightCard className="md:col-span-4 md:row-span-2 p-8 border-border bg-card/50 overflow-hidden">
          <h3 className="text-sm font-black text-foreground uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <Zap size={16} className="text-amber-500" /> Focus Areas
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
                className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-[9px] font-black text-muted-foreground uppercase tracking-widest hover:border-amber-500/40 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </SpotlightCard>

        <SpotlightCard className="md:col-span-8 p-10 border-border bg-card/50">
          <h3 className="text-2xl font-black text-foreground italic uppercase tracking-tighter leading-none mb-8">
            The <span className="shimmer-gold">Brief</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoTile label="Registered Email" value={user?.email || "n/a"} />
            <InfoTile
              label="Contact Number"
              value={user?.phone || "No contact linked"}
            />
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <SpotlightCard className="p-6 border-border bg-card/50 flex flex-col items-center text-center group">
      <div
        className={cn(
          "mb-4 p-3 rounded-2xl bg-secondary border border-border group-hover:scale-110 transition-transform duration-500",
          color,
        )}
      >
        {icon}
      </div>
      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">
        {label}
      </span>
      <span className="text-2xl font-black text-foreground tracking-tighter">
        {value}
      </span>
    </SpotlightCard>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5 bg-secondary/30 border border-border rounded-[1.5rem] hover:bg-secondary/50 transition-all">
      <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] mb-2">
        {label}
      </p>
      <p className="text-sm text-foreground font-bold tracking-tight">
        {value}
      </p>
    </div>
  );
}

