"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Save,
  Info,
  CheckCircle2,
  Sunrise,
  Sun,
  Moon,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

// কনস্ট্যান্টস
const SHIFT_CONFIG = [
  {
    id: "morning",
    label: "Morning",
    start: "11:00 AM",
    end: "01:00 PM",
    icon: Sunrise,
    color: "text-amber-400",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    start: "04:00 PM",
    end: "06:00 PM",
    icon: Sun,
    color: "text-orange-400",
  },
  {
    id: "night",
    label: "Night",
    start: "09:00 PM",
    end: "11:00 PM",
    icon: Moon,
    color: "text-indigo-400",
  },
];

const DAYS = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

export default function AvailabilityPage() {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const [schedule, setSchedule] = useState<{ [key: number]: string[] }>({});

  // ১. ডাটা ফেচ করা (GET Availability)
  const { data: serverResponse, isLoading: isFetching } = useQuery({
    queryKey: ["tutor-availability", session?.user?.id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tutor/availability/${session?.user?.id}`,
      );
      // যদি নতুন টিউটর হয় বা ডাটা না থাকে (404/500), তবে খালি অ্যারে রিটার্ন করবে
      if (!res.ok) return { success: true, data: [] };
      return res.json();
    },
    enabled: !!session?.user?.id,
  });

  // ২. ডাটাবেস ডাটাকে UI স্টেটে কনভার্ট করা (নিখুঁত রূপান্তর লজিক)
  useEffect(() => {
    if (serverResponse?.success && Array.isArray(serverResponse.data)) {
      const transformed: { [key: number]: string[] } = {};

      serverResponse.data.forEach((item: any) => {
        const day = item.dayOfWeek;
        const shift = SHIFT_CONFIG.find((s) => s.start === item.startTime);

        if (shift) {
          if (!transformed[day]) transformed[day] = [];
          transformed[day].push(shift.id);
        }
      });
      setSchedule(transformed);
    }
  }, [serverResponse]);

  // ৩. ডাটা সেভ করা (PUT Mutation)
  const mutation = useMutation({
    mutationFn: async (newSchedule: any) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tutor/availability`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ schedule: newSchedule }),
        },
      );
      if (!response.ok) throw new Error("Could not sync schedule");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Availability Matrix Updated!");
      queryClient.invalidateQueries({ queryKey: ["tutor-availability"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const toggleShift = (day: number, shiftId: string) => {
    setSchedule((prev) => {
      const dayShifts = prev[day] || [];
      const newShifts = dayShifts.includes(shiftId)
        ? dayShifts.filter((s) => s !== shiftId)
        : [...dayShifts, shiftId];
      return { ...prev, [day]: newShifts };
    });
  };

  if (isFetching) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="size-10 animate-spin text-amber-500/50" />
      </div>
    );
  }

  return (
    <div className="w-full h-full space-y-6">
      {/* --- HEADER --- */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02] border border-white/5 p-6 rounded-2xl backdrop-blur-md">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Teaching <span className="text-amber-500">Studio</span>
          </h1>
          <p className="text-foreground/50 text-sm font-medium italic">
            Manage your daily shifts and global availability.
          </p>
        </div>

        <Button
          onClick={() => mutation.mutate(schedule)}
          disabled={mutation.isPending}
          className="px-8 h-12 bg-amber-500 hover:bg-white text-black font-black rounded-xl shadow-2xl shadow-amber-500/20 transition-all active:scale-95"
        >
          {mutation.isPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Save className="mr-2 size-4" />
          )}
          {mutation.isPending ? "SYNCING..." : "SAVE CHANGES"}
        </Button>
      </div>

      {/* --- EMPTY STATE INFO FOR NEW TUTORS --- */}
      {Object.keys(schedule).length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-center gap-3"
        >
          <Info className="size-4 text-amber-500" />
          <p className="text-xs text-amber-200/70 font-medium uppercase tracking-wider">
            No shifts selected. Click on the time slots below to set your
            availability.
          </p>
        </motion.div>
      )}

      {/* --- MATRIX GRID --- */}
      <SpotlightCard className="p-0 border-white/5 overflow-hidden bg-white/[0.01] rounded-[2rem]">
        <div className="flex flex-col divide-y divide-white/5">
          {DAYS.map((day, i) => (
            <motion.div
              key={day.value}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                "p-5 lg:p-7 flex flex-col xl:flex-row xl:items-center justify-between gap-8 transition-all duration-300",
                (schedule[day.value]?.length || 0) > 0
                  ? "bg-amber-500/[0.02]"
                  : "hover:bg-white/[0.01]",
              )}
            >
              <div className="flex items-center gap-5 min-w-[200px]">
                <div
                  className={cn(
                    "size-3 rounded-full transition-all duration-500",
                    (schedule[day.value]?.length || 0) > 0
                      ? "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)] scale-125"
                      : "bg-slate-800",
                  )}
                />
                <h3 className="text-base font-black uppercase tracking-widest text-slate-200">
                  {day.label}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
                {SHIFT_CONFIG.map((shift) => {
                  const isActive = schedule[day.value]?.includes(shift.id);
                  return (
                    <button
                      key={shift.id}
                      onClick={() => toggleShift(day.value, shift.id)}
                      className={cn(
                        "relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300",
                        isActive
                          ? "bg-white/5 border-amber-500/50 shadow-[0_10px_30px_-15px_rgba(245,158,11,0.3)]"
                          : "bg-white/[0.02] border-white/5 opacity-40 hover:opacity-100",
                      )}
                    >
                      <div
                        className={cn(
                          "p-2.5 rounded-xl",
                          isActive ? "bg-amber-500/20" : "bg-white/5",
                        )}
                      >
                        <shift.icon
                          className={cn(
                            "size-5",
                            isActive ? shift.color : "text-slate-600",
                          )}
                        />
                      </div>
                      <div className="text-left flex-1">
                        <p
                          className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            isActive ? "text-amber-500" : "text-slate-500",
                          )}
                        >
                          {shift.label}
                        </p>
                        <p className="text-sm font-mono font-bold text-white leading-none mt-1">
                          {shift.start} — {shift.end}
                        </p>
                      </div>
                      {isActive && (
                        <CheckCircle2 className="size-5 text-amber-500 absolute right-4 top-1/2 -translate-y-1/2 animate-in zoom-in" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </SpotlightCard>

      {/* --- FOOTER --- */}
      <div className="flex items-center justify-center gap-3 p-5 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
        <Info className="size-4 text-slate-500" />
        <p className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
          Settings are automatically synced. Students will book sessions based
          on these slots.
        </p>
      </div>
    </div>
  );
}
