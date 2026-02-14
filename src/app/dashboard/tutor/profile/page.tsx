"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  Edit3,
  User,
  DollarSign,
  BookOpen,
  Sparkles,
  Loader2,
  Clock,
  CalendarDays,
  Camera,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";

// Shadcn UI Dialog & Form Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DAYS_MAP: Record<number, string> = {
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  7: "Sun",
};

export default function TutorSetupPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();

  // Data States
  const [tutorData, setTutorData] = useState<any>(null);
  const [availability, setAvailability] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // UI States
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    bio: "",
    hourlyRate: 0,
    categoryId: "",
  });

  // Fetch initial data
  const fetchData = async () => {
    if (session?.user?.id) {
      setCurrentImage(session.user.image || "");
      try {
        const [profileRes, availRes, catRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/tutor/profile/${session.user.id}`,
            {
              credentials: "include",
            },
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/tutor/availability/${session.user.id}`,
            {
              credentials: "include",
            },
          ),
          fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
            credentials: "include",
          }),
        ]);

        const profileJson = await profileRes.json();
        const availJson = await availRes.json();
        const catJson = await catRes.json();

        if (profileJson.success) {
          setTutorData(profileJson.data);
          // Sync form data with profile data
          setFormData({
            bio: profileJson.data.bio || "",
            hourlyRate: profileJson.data.hourlyRate || 0,
            categoryId: profileJson.data.categoryId || "",
          });
        }
        if (availJson.success) setAvailability(availJson.data);
        if (catJson.success) setCategories(catJson.data || []);
      } catch (error) {
        console.error("Failed to fetch tutor details", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!sessionPending) {
      fetchData();
    }
  }, [session, sessionPending]);

  // Handle Form Submission
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) return toast.error("Please select a specialty");

    setIsUpdating(true);
    const toastId = toast.loading("Updating your teaching profile...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tutor/profile`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ...formData, userId: session?.user?.id }),
        },
      );

      if (response.ok) {
        toast.success("Profile updated successfully!", { id: toastId });
        setDialogOpen(false);
        fetchData(); // Refresh page data
      } else {
        toast.error("Update failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  // Image upload handler
  const onUploadSuccess = async (result: any) => {
    const uploadedUrl = result.info.secure_url;
    setCurrentImage(uploadedUrl);

    const { error } = await authClient.updateUser({
      image: uploadedUrl,
    });

    if (error) {
      toast.error("Upload successful, but failed to sync profile.");
    } else {
      toast.success("Tutor profile identity updated!");
    }
  };

  if (sessionPending || loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#020617]">
        <Loader2 className="size-8 text-primary animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen py-20 px-4 bg-[#020617]">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* HEADER */}
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-widest"
            >
              <Sparkles className="size-3" /> Public Presence
            </motion.div>
            <h1 className="text-5xl font-black text-white tracking-tighter italic">
              Tutor <span className="shimmer-gold">Profile.</span>
            </h1>
          </div>

          {/* EDIT DIALOG TRIGGER */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl bg-primary hover:bg-primary/90 text-black font-black px-6 shadow-lg shadow-primary/10">
                <Edit3 className="mr-2 size-4" /> EDIT DETAILS
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#020617] border-white/10 text-white max-w-lg rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
              <DialogHeader className="space-y-2 mb-4">
                <DialogTitle className="text-3xl font-black italic tracking-tighter">
                  Update <span className="text-primary">Identity.</span>
                </DialogTitle>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                  Modify your public teaching credentials
                </p>
              </DialogHeader>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                {/* SPECIALTY */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Teaching Specialty
                  </Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(val) =>
                      setFormData({ ...formData, categoryId: val })
                    }
                  >
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-primary/20">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                      {categories.map((cat: any) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id}
                          className="focus:bg-primary focus:text-black"
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* RATE */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Hourly Rate (USD)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary" />
                    <Input
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hourlyRate: Number(e.target.value),
                        })
                      }
                      className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl focus-visible:ring-primary/20"
                    />
                  </div>
                </div>

                {/* BIO */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Professional Bio
                  </Label>
                  <Textarea
                    value={formData.bio}
                    rows={4}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="bg-white/5 border-white/10 rounded-xl focus-visible:ring-primary/20 resize-none"
                    placeholder="Describe your experience..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full bg-primary hover:bg-primary/90 text-black font-black h-12 rounded-xl transition-all active:scale-95"
                >
                  {isUpdating ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "SAVE CHANGES"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-8">
          {/* MAIN PROFILE CARD */}
          <SpotlightCard className="p-8 border-white/10 bg-white/[0.02]">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              {/* IMAGE UPLOAD SECTION */}
              <div className="relative group">
                <div className="relative size-28 rounded-[2rem] bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center border border-primary/20 shadow-inner overflow-hidden">
                  {currentImage || session?.user?.image ? (
                    <Image
                      src={currentImage || session?.user?.image || ""}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      alt="Profile"
                    />
                  ) : (
                    <User className="size-12 text-primary" />
                  )}
                </div>

                <CldUploadWidget
                  uploadPreset="ml_default"
                  onSuccess={onUploadSuccess}
                >
                  {({ open }) => (
                    <button
                      onClick={() => open()}
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-[2rem] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-primary/40"
                    >
                      <Camera className="text-white size-6 mb-1" />
                      <span className="text-[8px] font-black text-white uppercase tracking-tighter">
                        Update
                      </span>
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
                  {session?.user?.name}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-primary font-black text-xs uppercase tracking-widest">
                    <BookOpen className="size-3" /> Expert Instructor
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-700" />
                  <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                    Level 1 Elite
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 hover:border-primary/20 transition-colors">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">
                    Hourly Investment
                  </p>
                  <p className="text-xl text-white font-black">
                    ${tutorData?.hourlyRate?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 hover:border-primary/20 transition-colors">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">
                    Current Specialty
                  </p>
                  <p className="text-xl text-white font-black">
                    {tutorData?.category?.name || "Unassigned"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-4">
                Professional Narrative
              </p>
              <p className="text-slate-400 leading-relaxed font-medium italic">
                "
                {tutorData?.bio ||
                  "No biography provided yet. Hit edit to tell your story."}
                "
              </p>
            </div>
          </SpotlightCard>

          {/* AVAILABILITY SECTION */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                  <CalendarDays className="size-4 text-primary" />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">
                  Active Teaching Hours
                </h3>
              </div>
              <Link href="/dashboard/tutor/availability">
                <Button
                  variant="link"
                  className="text-xs text-primary font-black uppercase tracking-widest p-0 hover:no-underline hover:text-white transition-colors"
                >
                  Manage Schedule
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {availability.length > 0 ? (
                availability.map((slot, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={slot.id}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all cursor-default"
                  >
                    <div className="space-y-1">
                      <p className="text-[10px] text-primary font-black uppercase tracking-widest">
                        {DAYS_MAP[slot.dayOfWeek]}
                      </p>
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <Clock className="size-3 text-slate-500" />
                        {slot.startTime} - {slot.endTime}
                      </div>
                    </div>
                    <div className="size-2 rounded-full bg-primary/40 group-hover:bg-primary animate-pulse" />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full p-8 rounded-2xl border border-dashed border-white/10 text-center">
                  <p className="text-slate-500 text-sm italic font-medium">
                    No availability slots defined yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
