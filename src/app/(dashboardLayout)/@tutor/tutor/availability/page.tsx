"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, Save, Info } from "lucide-react";

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
  // 1. Initialize with the DAYS structure immediately
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
          // Map the backend data back to your frontend 'schedule' state
          setSchedule((prev) =>
            prev.map((d) => {
              const found = json.data.find(
                (item: any) => item.dayOfWeek === d.dayOfWeek,
              );
              if (found) {
                return { ...found, enabled: true };
              }
              return d;
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
    const toastId = toast.loading("Updating your schedule...");

    // Only send the "enabled" days to the backend
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

      if (res.ok) {
        toast.success("Availability updated!", { id: toastId });
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to save schedule", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
        <div className="h-2 bg-indigo-600 w-full" />
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">
                Weekly Availability
              </CardTitle>
              <CardDescription>
                Set the days and hours you are available for tutoring sessions.
              </CardDescription>
            </div>
            <Button
              onClick={saveAvailability}
              disabled={loading}
              className="bg-indigo-600 rounded-xl hover:bg-indigo-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3 mb-6">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800 leading-relaxed">
              Note: Students will only be able to book you during these hours.
              Ensure you account for your time zone.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {DAYS.map((day) => {
              const dayData = schedule.find((d) => d.dayOfWeek === day.value);
              return (
                <div
                  key={day.value}
                  className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-37.5">
                    <Switch
                      checked={dayData?.enabled}
                      onCheckedChange={() => handleToggle(day.value)}
                    />
                    <span
                      className={`font-bold ${dayData?.enabled ? "text-slate-900" : "text-slate-400"}`}
                    >
                      {day.label}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-4 transition-opacity ${dayData?.enabled ? "opacity-100" : "opacity-30 pointer-events-none"}`}
                  >
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
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
                        className="pl-9 rounded-xl border-slate-200"
                      />
                    </div>
                    <span className="text-slate-400 font-medium">to</span>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type="time"
                        value={dayData?.endTime}
                        onChange={(e) =>
                          handleTimeChange(day.value, "endTime", e.target.value)
                        }
                        className="pl-9 rounded-xl border-slate-200"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
