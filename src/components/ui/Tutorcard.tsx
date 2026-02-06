import { Star } from "lucide-react";
import { Card, CardContent } from "./card";
import Link from "next/link";
import { Button } from "./button";

export default function TutorCard({ tutor }: { tutor: any }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-none rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                {tutor.user.name[0]}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  {tutor.user.name}
                </h3>
                <p className="text-indigo-600 text-sm font-medium">
                  {tutor.category?.name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-slate-900">
                ${tutor.hourlyRate}
              </p>
              <p className="text-xs text-slate-500">per hour</p>
            </div>
          </div>

          <p className="text-slate-600 line-clamp-2 text-sm">{tutor.bio}</p>

          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-current" />{" "}
              {tutor.averageRating.toFixed(1)}
            </div>
          </div>

          <Link href={`/tutors/${tutor.id}`}>
            <Button className="w-full mt-2 bg-slate-900 hover:bg-slate-800 rounded-xl">
              View Profile & Book
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
