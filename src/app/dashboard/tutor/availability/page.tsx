"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, Save, Info, Globe, CalendarCheck } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DAYS = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
  { label: "Sunday", value: 0 },
];

export default function AvailabilityPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState<any[]>(
    DAYS.map((day) => ({
      dayOfWeek: day.value,
      startTime: "09:00",
      endTime: "17:00",
      enabled: false,
    })),
  );

  useEffect(() => {
    const fetchExistingAvailability = async () => {
      if (!session?.user?.id) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/tutor/availability/${session.user.id}`,
        );
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setSchedule((prev) =>
            prev.map((d) => {
              const found = json.data.find(
                (item: any) => item.dayOfWeek === d.dayOfWeek,
              );
              return found ? { ...found, enabled: true } : d;
            }),
          );
        }
      } catch (error) {
        console.error("Failed to fetch availability", error);
      }
    };
    fetchExistingAvailability();
  }, [session?.user?.id]);

  const handleToggle = (dayValue: number) => {
    setSchedule((prev) =>
      prev.map((d) =>
        d.dayOfWeek === dayValue ? { ...d, enabled: !d.enabled } : d,
      ),
    );
  };

  const handleTimeChange = (
    dayValue: number,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setSchedule((prev) =>
      prev.map((d) =>
        d.dayOfWeek === dayValue ? { ...d, [field]: value } : d,
      ),
    );
  };

  const saveAvailability = async () => {
    if (!session?.user?.id) return toast.error("Not authenticated");
    setLoading(true);
    const toastId = toast.loading("Syncing your schedule...");

    const dataToSave = schedule
      .filter((d) => d.enabled)
      .map(({ dayOfWeek, startTime, endTime }) => ({
        dayOfWeek,
        startTime,
        endTime,
      }));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tutor/availability`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: session.user.id,
            schedule: dataToSave,
          }),
        },
      );
      if (res.ok) toast.success("Schedule live!", { id: toastId });
      else throw new Error();
    } catch (error) {
      toast.error("Failed to save schedule", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Teaching <span className="shimmer-gold">Availability</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Define your weekly slots for student bookings.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
          <Globe className="size-4 text-primary" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* --- INFO PANEL --- */}
        <div className="lg:col-span-1 space-y-6">
          <SpotlightCard className="p-6 bg-primary/5 border-primary/20">
            <Info className="size-6 text-primary mb-4" />
            <h3 className="text-white font-bold mb-2">Smart Scheduling</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Students see your availability in{" "}
              <span className="text-white">their</span> local time. Ensure your
              slots account for breaks!
            </p>
          </SpotlightCard>

          <Button
            onClick={saveAvailability}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-black font-black py-7 rounded-2xl shadow-lg shadow-primary/10 transition-all active:scale-95"
          >
            <Save className="mr-2 size-5" />
            {loading ? "Syncing..." : "Save Changes"}
          </Button>
        </div>

        {/* --- SCHEDULE LIST --- */}
        <div className="lg:col-span-3">
          <SpotlightCard className="p-0 border-white/5 overflow-hidden">
            <div className="divide-y divide-white/5 bg-white/[0.02]">
              {DAYS.map((day, i) => {
                const dayData = schedule.find((d) => d.dayOfWeek === day.value);
                const isEnabled = dayData?.enabled;

                return (
                  <motion.div
                    key={day.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors",
                      isEnabled
                        ? "bg-white/[0.03]"
                        : "bg-transparent opacity-50",
                    )}
                  >
                    <div className="flex items-center gap-6 min-w-[160px]">
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={() => handleToggle(day.value)}
                        className="data-[state=checked]:bg-primary"
                      />
                      <span
                        className={cn(
                          "text-sm font-black uppercase tracking-widest transition-colors",
                          isEnabled ? "text-white" : "text-slate-500",
                        )}
                      >
                        {day.label}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-3 transition-all",
                        !isEnabled && "pointer-events-none grayscale",
                      )}
                    >
                      <div className="relative group">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                        <Input
                          type="time"
                          value={dayData?.startTime}
                          onChange={(e) =>
                            handleTimeChange(
                              day.value,
                              "startTime",
                              e.target.value,
                            )
                          }
                          className="pl-10 w-36 bg-white/5 border-white/10 text-white font-bold rounded-xl focus-visible:ring-primary/20"
                        />
                      </div>
                      <span className="text-[10px] font-black text-slate-600 uppercase">
                        to
                      </span>
                      <div className="relative group">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                        <Input
                          type="time"
                          value={dayData?.endTime}
                          onChange={(e) =>
                            handleTimeChange(
                              day.value,
                              "endTime",
                              e.target.value,
                            )
                          }
                          className="pl-10 w-36 bg-white/5 border-white/10 text-white font-bold rounded-xl focus-visible:ring-primary/20"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
