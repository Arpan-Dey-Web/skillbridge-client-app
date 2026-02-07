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
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function TutorProfilePage() {
  const params = useParams();
  const tutorId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      {/* Top Navigation */}
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
          {/* --- Left Column: Bio & Reviews --- */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header Section */}
            <section className="relative">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <Avatar className="size-32 border-4 border-white/5 shadow-2xl">
                  <AvatarImage src={tutor.user?.image} />
                  <AvatarFallback className="bg-amber-500 text-black text-4xl font-black">
                    {tutor.user?.name[0]}
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
                      className="bg-white/5 border-white/10 rounded-3xl overflow-hidden group hover:border-amber-500/30 transition-colors"
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
                          "{booking.review.comment}"
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                          <div className="size-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold uppercase">
                            {booking.review.student?.name[0]}
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
                    <Clock className="w-4 h-4 text-amber-500" /> Availability
                  </h4>
                  <div className="space-y-3">
                    {tutor.availability?.map((slot: any) => (
                      <div
                        key={slot.id}
                        className="flex justify-between items-center text-sm p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-amber-500/30 transition-colors"
                      >
                        <span className="font-bold text-slate-200">
                          {getDayName(slot.dayOfWeek)}
                        </span>
                        <span className="text-amber-500 font-mono">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full h-16 bg-white text-black hover:bg-amber-500 transition-all rounded-[1.25rem] text-lg font-black uppercase tracking-widest"
                  onClick={() => toast.success("Opening checkout...")}
                >
                  Secure Session
                </Button>

                <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                  100% Satisfaction Guarantee or Full Refund
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

function getDayName(day: number) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
