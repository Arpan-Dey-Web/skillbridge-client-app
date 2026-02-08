"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Rocket, Sparkles, DollarSign } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function TutorSetupPage() {
  const { data: session, isPending } = authClient.useSession();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    bio: "",
    hourlyRate: 0,
    categoryId: "",
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setCategories(res.data));
  }, []);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen bg-[#020617]">
        <div className="animate-pulse text-primary font-black tracking-widest uppercase text-sm">
          Loading Identity...
        </div>
      </div>
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return toast.error("You must be logged in");
    if (!formData.categoryId) return toast.error("Please select a category");

    setLoading(true);
    const toastId = toast.loading("Launching your teaching profile...");

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
        toast.success("Welcome to the elite! Profile live.", { id: toastId });
        router.push("/tutor/dashboard");
      }
    } catch (error) {
      toast.error("Failed to update profile", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-[#020617]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* HEADER */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-widest"
          >
            <Sparkles className="size-3" /> Step into Mastery
          </motion.div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic">
            Design Your <span className="shimmer-gold">Legacy.</span>
          </h1>
          <p className="text-slate-500 max-w-md mx-auto font-medium">
            Define your expertise and set your terms. Students are waiting for
            your guidance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* CATEGORY GRID */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Rocket className="size-4 text-primary" />
              </div>
              <Label className="text-sm font-black text-white uppercase tracking-[0.2em]">
                Select Specialty
              </Label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories?.map((cat: any, i: number) => {
                const isSelected = formData.categoryId === cat.id;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() =>
                      setFormData({ ...formData, categoryId: cat.id })
                    }
                    className="relative"
                  >
                    <SpotlightCard
                      className={cn(
                        "p-6 h-full cursor-pointer border transition-all duration-300 flex flex-col items-center justify-center text-center gap-3",
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-white/5 bg-white/[0.02] hover:border-white/20",
                      )}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-primary rounded-full p-1 shadow-lg shadow-primary/20">
                          <Check className="w-3 h-3 text-black" />
                        </div>
                      )}
                      <span
                        className={cn(
                          "text-xs font-black uppercase tracking-widest",
                          isSelected ? "text-primary" : "text-slate-500",
                        )}
                      >
                        {cat.name}
                      </span>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* RATE SECTION */}
            <div className="md:col-span-1 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <DollarSign className="size-4 text-primary" />
                  </div>
                  <Label className="text-sm font-black text-white uppercase tracking-[0.2em]">
                    Hourly Rate
                  </Label>
                </div>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-black">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="25.00"
                    className="pl-10 h-14 bg-white/5 border-white/10 text-white font-black rounded-2xl focus-visible:ring-primary/20 focus-visible:border-primary"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hourlyRate: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                  Suggested: $30 - $60 / hr
                </p>
              </div>
            </div>

            {/* BIO SECTION */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-black text-white uppercase tracking-[0.2em]">
                  Your Story
                </Label>
                <Textarea
                  placeholder="Tell students about your experience, teaching style, and passion..."
                  rows={6}
                  className="rounded-2xl bg-white/5 border-white/10 text-white focus-visible:ring-primary/20 focus-visible:border-primary p-6 leading-relaxed transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-black h-16 rounded-[2rem] text-lg font-black shadow-xl shadow-primary/10 transition-all active:scale-[0.98]"
            >
              {loading ? "INITIALIZING..." : "PUBLISH PROFILE"}
            </Button>
            <p className="text-center mt-6 text-[10px] text-slate-600 font-black uppercase tracking-[0.4em]">
              Verified Academic Portal Entry
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
