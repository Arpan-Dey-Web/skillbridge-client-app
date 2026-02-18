"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ShieldCheck,
  ArrowLeft,
  Clock,
  Timer,
  AlertCircle,
  MessageSquareQuote,
  Quote,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { format } from "date-fns";
import TutorCardSkeleton from "@/components/ui/TutorCardSkeleton";

// --- Types & Interfaces ---
interface User {
  name: string;
  image?: string;
}

interface Category {
  name: string;
}

interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string; // e.g., "11:00 AM"
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  student: {
    name: string;
    image?: string;
  };
}

interface Booking {
  id: string;
  startTime: string;
  studentId: string;
  review?: Review;
}

interface Tutor {
  id: string;
  bio: string;
  hourlyRate: number;
  averageRating: number;
  user: User;
  category: Category;
  availability: Availability[];
  bookings: Booking[];
}

// --- Helper Functions ---
const parseTimeToNumber = (timeStr: string): number => {
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
const getDayName = (day: number): string => daysOrder[day] || "Unknown";

export default function TutorProfilePage() {
  const params = useParams();
  const { data: session } = authClient.useSession();
  const tutorId = typeof params.id === "string" ? params.id : params.id?.[0];

  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSlot, setSelectedSlot] = useState<Availability | null>(null);
  const [duration, setDuration] = useState<number>(15);
  const [hasBookedToday, setHasBookedToday] = useState<boolean>(false);
  const { data: sessionData } = authClient.useSession();
  const token = sessionData?.session?.token;
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
    const day = parts.find((p) => p.type === "weekday")?.value || "";
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
      dayIndex: daysOrder.indexOf(day),
    };
  }, []);

  useEffect(() => {
    if (tutorId) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tutors/${tutorId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            const data: Tutor = res.data;
            setTutor(data);
            if (session?.user?.id) {
              const alreadyBooked = data.bookings?.some((b) => {
                const bookingDate = b.startTime.split("T")[0];
                return (
                  bookingDate === dhakaContext.dateString &&
                  b.studentId === session.user.id
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

  const bookSession = async () => {
    if (!selectedSlot || !tutor)
      return toast.error("Please select a time slot first!");
    const toastId = toast.loading("Synchronizing with mentor...");

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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

      toast.success("Request sent for approval.", { id: toastId });
      setHasBookedToday(true);
      setSelectedSlot(null);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(message, { id: toastId });
    }
  };

  const reviews = useMemo(
    () =>
      tutor?.bookings
        ?.filter((b): b is Booking & { review: Review } => !!b.review)
        .map((b) => b.review) || [],
    [tutor],
  );
  return (
    <div className="min-h-screen bg-background text-foreground py-24 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <Button
          variant="ghost"
          asChild
          className="text-muted-foreground hover:text-primary mb-12 px-0 group"
        >
          <Link href="/tutors" className="flex items-center gap-2">
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-black uppercase tracking-[0.2em] text-[10px]">
              Directory Return
            </span>
          </Link>
        </Button>
        {tutor ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: Content */}
            <div className="lg:col-span-8 space-y-24">
              <header className="flex flex-col md:flex-row items-center md:items-start gap-10">
                <div className="relative">
                  <Avatar className="size-44 rounded-[2.5rem] border border-border shadow-2xl">
                    <AvatarImage
                      src={tutor?.user.image}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-black">
                      {tutor?.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-background border border-border p-2 rounded-xl">
                    <ShieldCheck className="size-6 text-primary" />
                  </div>
                </div>

                <div className="text-center md:text-left pt-4">
                  <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
                    {tutor?.user.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase tracking-widest px-4 py-1">
                      {tutor?.category.name} Architect
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Star className="size-4 fill-primary text-primary" />
                      <span className="font-black text-sm">
                        {tutor?.averageRating.toFixed(1)}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                        ({reviews.length} Feedbacks)
                      </span>
                    </div>
                  </div>
                </div>
              </header>

              <section className="border-l-2 border-primary/10 pl-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">
                  Manifesto
                </h3>
                <p className="text-muted-foreground text-2xl italic leading-relaxed font-medium">
                  {tutor?.bio}
                </p>
              </section>

              <section className="space-y-12">
                <h3 className="text-lg font-black uppercase tracking-[0.2em] flex items-center gap-3">
                  <MessageSquareQuote className="size-5 text-primary" />{" "}
                  Verified Reviews
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-card border border-border rounded-[3rem] p-10 relative overflow-hidden group"
                    >
                      <Quote className="absolute -top-4 -right-4 size-24 text-primary/3 group-hover:text-primary/[0.07] transition-all" />
                      <div className="relative z-10 space-y-6">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "size-3",
                                i < review.rating
                                  ? "fill-primary text-primary"
                                  : "text-border",
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground text-sm font-medium italic">
                          {review.comment}
                        </p>
                        <div className="flex items-center gap-4 pt-6 border-t border-border">
                          <Avatar className="size-10">
                            <AvatarImage src={review.student.image} />
                            <AvatarFallback className="text-[10px] font-black">
                              {review.student.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider">
                              {review.student.name}
                            </p>
                            <p className="text-[8px] text-muted-foreground font-bold uppercase">
                              {format(new Date(review.createdAt), "MMM yyyy")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right: Booking */}
            <aside className="lg:col-span-4">
              <Card className="bg-card border-border rounded-[3.5rem] sticky top-28 overflow-hidden shadow-2xl">
                <div className="bg-primary p-12 text-primary-foreground">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-70">
                    Investment
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-6xl font-black tracking-tighter">
                      ${((tutor?.hourlyRate / 60) * duration).toFixed(2)}
                    </h2>
                    <span className="text-xs font-black uppercase tracking-widest">
                      / {duration}m
                    </span>
                  </div>
                </div>

                <CardContent className="p-10 space-y-10">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <Timer className="size-4 text-primary" /> 01. Interval
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      {durations.map((d) => (
                        <button
                          key={d}
                          onClick={() => setDuration(d)}
                          className={cn(
                            "py-4 rounded-2xl border text-[10px] font-black transition-all",
                            duration === d
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-muted-foreground",
                          )}
                        >
                          {d}m
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <Clock className="size-4 text-primary" /> 02.
                      Synchronization
                    </h4>
                    <div className="space-y-3 max-h-62.5 overflow-y-auto custom-scrollbar pr-2">
                      {tutor?.availability.map((slot) => {
                        const dayName = getDayName(slot.dayOfWeek);
                        const isToday = dayName === dhakaContext.day;
                        const isAvailable = isToday
                          ? parseTimeToNumber(slot.startTime) >
                            dhakaContext.timeValue
                          : true;

                        return (
                          <button
                            key={slot.id}
                            disabled={!isAvailable}
                            onClick={() => setSelectedSlot(slot)}
                            className={cn(
                              "w-full flex justify-between items-center p-5 rounded-2xl border transition-all",
                              selectedSlot?.id === slot.id
                                ? "border-primary bg-primary/5 shadow-inner"
                                : "bg-background border-border",
                              !isAvailable &&
                                "opacity-20 grayscale cursor-not-allowed",
                            )}
                          >
                            <span className="text-[9px] font-black uppercase tracking-widest text-primary">
                              {dayName}
                            </span>
                            <span className="text-sm font-black tracking-tight">
                              {slot.startTime}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Button
                    disabled={!selectedSlot || hasBookedToday}
                    onClick={bookSession}
                    className="w-full h-18 py-8 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl"
                  >
                    {hasBookedToday
                      ? "Session Secured"
                      : selectedSlot
                        ? "Confirm Matrix"
                        : "Select Slot"}
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        ) : (
          <TutorCardSkeleton />
        )}
      </div>
    </div>
  );
}
