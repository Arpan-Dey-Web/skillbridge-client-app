"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Sparkles,
  DollarSign,
  BookOpen,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SetTutorProfile() {
  const { data: session, isPending } = authClient.useSession();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState({
    bio: "",
    hourlyRate: 0,
    categoryId: "",
  });

  // 1. Fetch Categories
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setCategories(res.data || []));
  }, []);

  // 2. Fetch Existing Profile Data to pre-fill the form
  useEffect(() => {
    if (session?.user?.id) {
      fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tutor/availability/${session?.user.id}`,
        {
          credentials: "include",
        },
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            setFormData({
              bio: res.data.bio || "",
              hourlyRate: res.data.hourlyRate || 0,
              categoryId: res.data.categoryId || "",
            });
          }
          setFetchingData(false);
        })
        .catch(() => setFetchingData(false));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) return toast.error("Please select a specialty");

    setLoading(true);
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
        router.push("/dashboard/tutor");
      }
    } catch (error) {
      toast.error("Failed to update profile", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (isPending || fetchingData) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#020617]">
        <Loader2 className="size-6 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-[#020617] text-slate-200">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles className="size-3" /> Profile Configuration
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter italic">
            Edit Your <span className="text-primary">Tutor Identity.</span>
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-white/[0.02] border border-white/5 p-8 rounded-3xl shadow-2xl"
        >
          {/* CATEGORY SELECT */}
          <div className="space-y-3">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
              <BookOpen className="size-3 text-primary" /> Select Specialty
            </Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) =>
                setFormData({ ...formData, categoryId: value })
              }
            >
              <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl text-white focus:ring-primary/20">
                <SelectValue placeholder="Choose your primary subject..." />
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

          {/* HOURLY RATE */}
          <div className="space-y-3">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
              <DollarSign className="size-3 text-primary" /> Hourly Rate (USD)
            </Label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-black">
                $
              </span>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.hourlyRate}
                className="pl-10 h-14 bg-white/5 border-white/10 text-white font-black rounded-2xl focus-visible:ring-primary/20"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hourlyRate: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          {/* BIO SECTION */}
          <div className="space-y-3">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
              Your Story & Experience
            </Label>
            <Textarea
              placeholder="Tell students why they should learn from you..."
              rows={6}
              value={formData.bio}
              className="rounded-2xl bg-white/5 border-white/10 text-white p-6 leading-relaxed focus-visible:ring-primary/20 resize-none"
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>

          {/* SUBMIT */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-black h-14 rounded-2xl text-md font-black shadow-lg shadow-primary/10 transition-all active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "SAVE CHANGES"
              )}
            </Button>
            <p className="text-center mt-4 text-[9px] text-slate-600 font-black uppercase tracking-[0.4em]">
              Updates reflect immediately on discovery page
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
