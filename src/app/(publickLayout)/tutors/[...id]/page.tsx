"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MessageSquare,
  ShieldCheck,
  ArrowLeft,
  Clock,
  Timer,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

// Helper to convert "11:00 AM" to a comparable number
const parseTimeToNumber = (timeStr: string) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours * 100 + minutes;
};

const daysOrder = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getDayName(day: number) {
  return daysOrder[day];
}

export default function TutorProfilePage() {
  const params = useParams();
  const { data: session } = authClient.useSession();
  const tutorId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [duration, setDuration] = useState<number>(15);
  const [hasBookedToday, setHasBookedToday] = useState(false);

  const durations = [5, 10, 15, 30];

  const dhakaContext = useMemo(() => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Dhaka",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const day = parts.find((p) => p.type === "weekday")?.value;
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0");
    const minute = parseInt(
      parts.find((p) => p.type === "minute")?.value || "0",
    );

    const dateString = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Dhaka",
    }).format(now);

    return {
      day,
      timeValue: hour * 100 + minute,
      dateString,
      dayIndex: daysOrder.indexOf(day || ""),
    };
  }, []);

  useEffect(() => {
    if (tutorId) {
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tutors/${tutorId}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setTutor(res.data);
            if (session?.user?.email) {
              const alreadyBooked = res.data.bookings?.some((b: any) => {
                const bookingDate = b.startTime.split("T")[0];
                return (
                  bookingDate === dhakaContext.dateString &&
                  b.studentId === (session.user as any).id
                );
              });
              setHasBookedToday(alreadyBooked);
            }
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [tutorId, session, dhakaContext.dateString]);
  console.log(tutor);
  const bookSession = async () => {
    if (!selectedSlot) return toast.error("Please select a time slot first!");

    const toastId = toast.loading("Sending request to mentor...");

    try {
      const [time, modifier] = selectedSlot.startTime.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const targetDate = new Date();
      const dayDiff = (selectedSlot.dayOfWeek - dhakaContext.dayIndex + 7) % 7;
      targetDate.setDate(targetDate.getDate() + dayDiff);
      targetDate.setHours(hours, minutes, 0, 0);

      const endObj = new Date(targetDate);
      endObj.setMinutes(targetDate.getMinutes() + duration);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            tutorProfileId: tutor.id,
            startTime: targetDate.toISOString(),
            endTime: endObj.toISOString(),
          }),
        },
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Booking failed");

      toast.success("Request sent! Waiting for approval.", { id: toastId });
      setHasBookedToday(true);
      setSelectedSlot(null);
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred", {
        id: toastId,
      });
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-amber-500 font-bold uppercase italic">
        Loading Mentor...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <Button
          variant="ghost"
          asChild
          className="text-slate-500 hover:text-amber-500 mb-8 px-0"
        >
          <Link href="/tutors" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            <span className="font-bold uppercase tracking-widest text-[10px]">
              Back to tutors
            </span>
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <Avatar className="size-32 border-4 border-white/5">
                  <AvatarImage src={tutor.user?.image} />
                  <AvatarFallback className="bg-amber-500 text-black font-black">
                    {tutor.user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left space-y-3">
                  <div className="flex items-center gap-3">
                    <h1 className="text-5xl font-black italic tracking-tighter">
                      {tutor.user?.name}
                    </h1>
                    <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 uppercase tracking-widest text-[10px]">
                      <ShieldCheck className="size-3 mr-1" /> Verified Mentor
                    </Badge>
                  </div>
                  <p className="text-amber-500 font-bold text-lg uppercase italic">
                    {tutor.category?.name}
                  </p>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Star className="size-5 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-white text-lg">
                      {tutor.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="size-2 bg-amber-500 rounded-full" /> About
                  Mentor
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {tutor.bio}
                </p>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: BOOKING */}
          <aside>
            <Card className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden sticky top-8 backdrop-blur-md shadow-2xl">
              <div className="bg-amber-500 p-8 text-black">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                  Session Investment
                </p>
                <div className="flex items-baseline gap-1">
                  <h2 className="text-5xl font-black tracking-tighter">
                    ${((tutor.hourlyRate / 60) * duration).toFixed(2)}
                  </h2>
                  <span className="text-sm font-bold uppercase">
                    / {duration}m
                  </span>
                </div>
              </div>

              <CardContent className="p-8 space-y-8">
                <div>
                  <h4 className="font-bold mb-4 text-white uppercase tracking-widest text-[10px] flex items-center gap-2">
                    <Timer className="size-4 text-amber-500" /> 1. Duration
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {durations.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={cn(
                          "py-3 rounded-xl border text-[10px] font-black transition-all",
                          duration === d
                            ? "bg-amber-500 text-black border-amber-500"
                            : "bg-white/5 border-white/10 text-slate-400",
                        )}
                      >
                        {d}m
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-4 text-white uppercase tracking-widest text-[10px] flex items-center gap-2">
                    <Clock className="size-4 text-amber-500" /> 2. Available
                    Schedule
                  </h4>
                  <div className="space-y-3">
                    {tutor.availability?.map((slot: any) => {
                      const dayName = getDayName(slot.dayOfWeek);
                      const isToday = dayName === dhakaContext.day;
                      const slotTimeValue = parseTimeToNumber(slot.startTime);
                      const hasPassed =
                        isToday && slotTimeValue <= dhakaContext.timeValue;

                      // logic simplified to allow selection always
                      const isAvailable = isToday ? !hasPassed : true;

                      return (
                        <button
                          key={slot.id}
                          // DISABLED FEATURE REMOVED
                          onClick={() => setSelectedSlot(slot)}
                          className={cn(
                            "w-full flex justify-between items-center p-4 rounded-2xl border transition-all active:scale-95",
                            selectedSlot?.id === slot.id
                              ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5"
                              : "bg-white/5 border-white/10 hover:border-amber-500/30",
                            !isAvailable && "opacity-60 italic", // Visual hint only
                          )}
                        >
                          <div className="flex flex-col items-start">
                            <span
                              className={cn(
                                "font-black text-[10px] uppercase tracking-widest",
                                isAvailable
                                  ? "text-amber-500"
                                  : "text-slate-500",
                              )}
                            >
                              {dayName}
                            </span>
                            {hasPassed && isToday && (
                              <span className="text-[8px] text-red-500 font-black uppercase">
                                Time Passed
                              </span>
                            )}
                          </div>
                          <span className="text-white font-mono font-bold text-sm">
                            {slot.startTime}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-16 rounded-2xl text-md font-black uppercase tracking-widest transition-all",
                    selectedSlot
                      ? "bg-white text-black hover:bg-amber-500"
                      : "bg-white/10 text-slate-600",
                  )}
                  // DISABLED FEATURE REMOVED
                  onClick={bookSession}
                >
                  {selectedSlot ? "Secure Session" : "Select Time"}
                </Button>

                <div className="flex items-start gap-2 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                  <AlertCircle className="size-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[9px] text-amber-200/60 font-black uppercase tracking-wider leading-tight">
                    All slots are currently unlocked for selection. Please
                    ensure you select a future time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
