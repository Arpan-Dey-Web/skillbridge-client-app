"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Star,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function TutorProfilePage() {
  const params = useParams();
  // Handle both [id] (string) and [...id] (array)
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
    return <div className="p-20 text-center">Loading Profile...</div>;
  if (!tutor) return <div className="p-20 text-center">Tutor not found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Left Column: Bio & Reviews --- */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                {tutor.user?.name[0]}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {tutor.user?.name}
                </h1>
                <p className="text-indigo-600 font-medium">
                  {tutor.category?.name}
                </p>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">About Me</h3>
            <p className="text-slate-600 leading-relaxed">{tutor.bio}</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> Student Reviews
            </h3>
            {tutor.bookings?.filter((b: any) => b.review).length > 0 ? (
              tutor.bookings.map((booking: any) => (
                <Card
                  key={booking.id}
                  className="border-none shadow-sm rounded-2xl"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 text-amber-500 mb-2">
                      {[...Array(booking.review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 italic">
                      "{booking.review.comment}"
                    </p>
                    <p className="text-sm text-slate-500 mt-3">
                      — {booking.review.student?.name}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-slate-400 italic">
                No reviews yet for this tutor.
              </p>
            )}
          </section>
        </div>

        {/* --- Right Column: Booking Widget --- */}
        <div className="space-y-6">
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden sticky top-8">
            <div className="bg-slate-900 p-6 text-white text-center">
              <p className="text-sm opacity-80">Hourly Rate</p>
              <h2 className="text-4xl font-bold">${tutor.hourlyRate}</h2>
            </div>
            <CardContent className="p-6 space-y-6">
              <div>
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Weekly Availability
                </h4>
                <div className="space-y-2">
                  {tutor.availability?.map((slot: any) => (
                    <div
                      key={slot.id}
                      className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl"
                    >
                      <span className="font-medium text-slate-700">
                        {getDayName(slot.dayOfWeek)}
                      </span>
                      <span className="text-slate-500">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-lg font-bold shadow-lg shadow-indigo-100"
                onClick={() => toast.success("Redirecting to booking...")}
              >
                Book a Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper to convert number 0-6 to Day Name
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
