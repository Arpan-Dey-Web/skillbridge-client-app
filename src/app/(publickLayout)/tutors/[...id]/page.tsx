"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Star,
  MessageSquare,
  ShieldCheck,
  ArrowLeft,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

/**
 * Converts a slot (dayOfWeek, startTime) into real Date objects for the upcoming week
 */
function generateBookingDates(slot: any) {
  const now = new Date();
  const result = new Date(now);

  // Find the next occurrence of that day of the week
  result.setDate(now.getDate() + ((slot.dayOfWeek + 7 - now.getDay()) % 7));

  const [startHours, startMins] = slot.startTime.split(":");
  const [endHours, endMins] = slot.endTime.split(":");

  const startISO = new Date(
    result.setHours(parseInt(startHours), parseInt(startMins), 0, 0),
  ).toISOString();
  const endISO = new Date(
    result.setHours(parseInt(endHours), parseInt(endMins), 0, 0),
  ).toISOString();

  return { startISO, endISO };
}

export default function TutorProfilePage() {
  const params = useParams();
  const tutorId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // Track which slot the user clicked
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  useEffect(() => {
    if (tutorId) {
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tutors/${tutorId}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) setTutor(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [tutorId]);

  const bookSession = async () => {
    if (!selectedSlot) {
      toast.error("Please select an availability slot first");
      return;
    }

    const toastId = toast.loading("Confirming your session...");


    try {
      // Helper: Generate actual ISO strings for the backend
      const { startISO, endISO } = generateBookingDates(selectedSlot);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            startTime: startISO,
            endTime: endISO,
            tutorProfileId: tutor.id, 
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed");
      }

      toast.success("Session booked successfully!", { id: toastId });
      setSelectedSlot(null); // Reset selection
      return result.data;
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred", {
        id: toastId,
      });
      console.error("Booking Error:", error);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-pulse text-amber-500 font-bold tracking-widest">
          LOADING PROFILE...
        </div>
      </div>
    );

  if (!tutor)
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        Tutor not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] text-white py-20">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Button
          variant="ghost"
          asChild
          className="text-slate-500 hover:text-amber-500 hover:bg-white/5 transition-all group px-0"
        >
          <Link href="/tutors" className="flex items-center gap-2">
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-[10px]">
              Back to all tutors
            </span>
          </Link>
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* --- Left Column --- */}
          <div className="lg:col-span-2 space-y-12">
            <section className="relative">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <Avatar className="size-32 border-4 border-white/5 shadow-2xl">
                  <AvatarImage src={tutor.user?.image} />
                  <AvatarFallback className="bg-amber-500 text-black text-4xl font-black">
                    {tutor.user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center md:text-left space-y-3">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <h1 className="text-5xl font-black tracking-tighter">
                      {tutor.user?.name}
                    </h1>
                    <Badge
                      variant="secondary"
                      className="bg-amber-500/10 text-amber-500 border-amber-500/20 px-3 py-1 uppercase tracking-widest text-[10px] font-bold"
                    >
                      <ShieldCheck className="size-3 mr-1" /> Verified Expert
                    </Badge>
                  </div>
                  <p className="text-amber-500 font-bold text-lg tracking-wide uppercase">
                    {tutor.category?.name}
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400">
                    <Star className="size-5 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-white text-lg">
                      {tutor.averageRating.toFixed(1)}
                    </span>
                    <span className="text-sm">
                      ({tutor.bookings?.length || 0} sessions)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="size-2 bg-amber-500 rounded-full" />
                  About the Mentor
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg max-w-3xl">
                  {tutor.bio}
                </p>
              </div>
            </section>

            {/* Reviews Section */}
            <section className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-amber-500" />
                Student Feedback
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {tutor.bookings?.filter((b: any) => b.review).length > 0 ? (
                  tutor.bookings.map((booking: any) => (
                    <Card
                      key={booking.id}
                      className="bg-white/5 border-white/10 rounded-3xl group hover:border-amber-500/30 transition-colors"
                    >
                      <CardContent className="p-8">
                        <div className="flex items-center gap-1 text-amber-500 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < booking.review.rating ? "fill-current" : "opacity-20"}`}
                            />
                          ))}
                        </div>
                        <p className="text-white text-lg font-medium leading-relaxed italic">
                          {booking.review.comment}
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                          <div className="size-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold uppercase">
                            {booking.review.student?.name?.[0]}
                          </div>
                          <p className="text-sm font-bold text-slate-500 tracking-widest uppercase">
                            {booking.review.student?.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="bg-white/5 rounded-3xl p-12 text-center border border-dashed border-white/10">
                    <p className="text-slate-500 italic">
                      No reviews yet for this tutor.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* --- Right Column: Booking Widget --- */}
          <aside>
            <Card className="bg-white/5 border border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden sticky top-8 backdrop-blur-sm">
              <div className="bg-amber-500 p-8 text-black">
                <p className="text-xs font-black uppercase tracking-[0.2em] mb-1">
                  Investment
                </p>
                <div className="flex items-baseline gap-1">
                  <h2 className="text-5xl font-black">${tutor.hourlyRate}</h2>
                  <span className="text-sm font-bold">/hr</span>
                </div>
              </div>

              <CardContent className="p-8 space-y-8">
                <div>
                  <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" /> 1. Select
                    Availability
                  </h4>
                  <div className="space-y-3">
                    {tutor.availability?.map((slot: any) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        className={`w-full flex justify-between items-center text-sm p-4 rounded-2xl border transition-all ${
                          selectedSlot?.id === slot.id
                            ? "border-amber-500 bg-amber-500/10"
                            : "bg-white/5 border-white/5 hover:border-amber-500/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {selectedSlot?.id === slot.id && (
                            <CheckCircle2 className="size-4 text-amber-500" />
                          )}
                          <span className="font-bold text-slate-200">
                            {getDayName(slot.dayOfWeek)}
                          </span>
                        </div>
                        <span className="text-amber-500 font-mono">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  className={`w-full h-16 transition-all rounded-[1.25rem] text-lg font-black uppercase tracking-widest ${
                    selectedSlot
                      ? "bg-white text-black hover:bg-amber-500"
                      : "bg-white/10 text-slate-500 cursor-not-allowed"
                  }`}
                  onClick={bookSession}
                  disabled={!selectedSlot}
                >
                  {selectedSlot ? "Secure Session" : "Choose a Slot"}
                </Button>
                <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                  100% Satisfaction Guarantee
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

// --- Helpers ---

function getDayName(day: number) {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][day];
}
