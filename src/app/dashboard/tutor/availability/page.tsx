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

const SHIFT_CONFIG = [
  {
    id: "morning",
    label: "Morning",
    start: "11:00 AM",
    end: "01:00 PM",
    icon: Sunrise,
    color: "text-amber-500", // Fixed for better contrast in light mode
  },
  {
    id: "afternoon",
    label: "Afternoon",
    start: "04:00 PM",
    end: "06:00 PM",
    icon: Sun,
    color: "text-orange-500",
  },
  {
    id: "night",
    label: "Night",
    start: "09:00 PM",
    end: "11:00 PM",
    icon: Moon,
    color: "text-indigo-500",
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
  const token = session?.session?.token;
  const [schedule, setSchedule] = useState<{ [key: number]: string[] }>({});

  const { data: serverResponse, isLoading: isFetching } = useQuery({
    queryKey: ["tutor-availability", session?.user?.id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tutor/availability/${session?.user?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        },
      );
      if (!res.ok) return { success: true, data: [] };
      return res.json();
    },
    enabled: !!session?.user?.id,
  });

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

  const mutation = useMutation({
    mutationFn: async (newSchedule: any) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tutor/availability`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
        <Loader2 className="size-10 animate-spin text-primary/50" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* --- HEADER --- */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card border border-border p-8 rounded-3xl shadow-sm transition-colors duration-500">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase italic">
            Teaching <span className="text-primary">Studio</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mt-1">
            Manage your daily shifts and global availability.
          </p>
        </div>

        <Button
          onClick={() => mutation.mutate(schedule)}
          disabled={mutation.isPending}
          className="px-10 h-14 bg-primary hover:bg-foreground hover:text-background text-primary-foreground font-black rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-widest text-xs italic"
        >
          {mutation.isPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Save className="mr-2 size-4" />
          )}
          {mutation.isPending ? "SYNCING..." : "SAVE CHANGES"}
        </Button>
      </div>

      {/* --- INFO ALERT --- */}
      {Object.keys(schedule).length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-primary/10 border border-primary/20 rounded-2xl flex items-center gap-3"
        >
          <Info className="size-4 text-primary" />
          <p className="text-[10px] text-primary font-black uppercase tracking-wider">
            No shifts selected. Click on the time slots below to register your
            presence.
          </p>
        </motion.div>
      )}

      {/* --- MATRIX GRID --- */}
      <SpotlightCard className="p-0 border-border overflow-hidden bg-card rounded-[2.5rem] shadow-sm">
        <div className="flex flex-col divide-y divide-border">
          {DAYS.map((day, i) => (
            <motion.div
              key={day.value}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                "p-6 lg:p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-8 transition-all duration-300",
                (schedule[day.value]?.length || 0) > 0
                  ? "bg-primary/[0.03]"
                  : "hover:bg-muted/50",
              )}
            >
              <div className="flex items-center gap-5 min-w-[200px]">
                <div
                  className={cn(
                    "size-3 rounded-full transition-all duration-500",
                    (schedule[day.value]?.length || 0) > 0
                      ? "bg-primary shadow-[0_0_15px_oklch(0.78_0.18_75_/_0.5)] scale-125"
                      : "bg-muted border border-border",
                  )}
                />
                <h3 className="text-base font-black uppercase tracking-tighter text-foreground italic">
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
                        "relative flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300",
                        isActive
                          ? "bg-background border-primary shadow-lg shadow-primary/10"
                          : "bg-muted/30 border-border opacity-50 hover:opacity-100 hover:border-muted-foreground/30",
                      )}
                    >
                      <div
                        className={cn(
                          "p-3 rounded-xl transition-colors",
                          isActive ? "bg-primary/10" : "bg-muted",
                        )}
                      >
                        <shift.icon
                          className={cn(
                            "size-5",
                            isActive ? shift.color : "text-muted-foreground",
                          )}
                        />
                      </div>
                      <div className="text-left flex-1">
                        <p
                          className={cn(
                            "text-[9px] font-black uppercase tracking-[0.2em]",
                            isActive ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          {shift.label}
                        </p>
                        <p className="text-sm font-mono font-bold text-foreground leading-none mt-1">
                          {shift.start} — {shift.end}
                        </p>
                      </div>
                      {isActive && (
                        <CheckCircle2 className="size-4 text-primary absolute right-4 top-4 animate-in zoom-in" />
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
      <div className="flex items-center justify-center gap-3 p-6 bg-muted/20 border border-dashed border-border rounded-3xl">
        <Info className="size-4 text-muted-foreground" />
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.15em]">
          Global synchronization active. These slots define your marketplace
          visibility.
        </p>
      </div>
    </div>
  );
}
