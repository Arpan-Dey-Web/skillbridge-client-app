import { Star, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "./card";
import Link from "next/link";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default function TutorCard({ tutor }: { tutor: any }) {
  return (
    <Card className="group relative bg-white/5 hover:bg-white/[0.08] transition-all duration-500 border border-white/10 hover:border-amber-500/50 rounded-[2rem] overflow-hidden">
      <CardContent className="p-0">
        <div className="p-8 space-y-5">
          {/* Header: Avatar & Pricing */}
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <Avatar className="size-14 border-2 border-white/10 group-hover:border-amber-500/50 transition-colors">
                <AvatarImage src={tutor.user.image} alt={tutor.user.name} />
                <AvatarFallback className="bg-amber-500 text-black font-black">
                  {tutor.user.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-xl text-white tracking-tight">
                  {tutor.user.name}
                </h3>
                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest">
                  {tutor.category?.name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-white">
                ${tutor.hourlyRate}
              </p>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">
                per hour
              </p>
            </div>
          </div>

          {/* Bio Section */}
          <p className="text-slate-400 line-clamp-2 text-sm leading-relaxed">
            {tutor.bio}
          </p>

          {/* Rating & Action Section */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-sm font-bold text-white">
                {tutor.averageRating.toFixed(1)}
              </span>
            </div>

            <Link href={`/tutors/${tutor.id}`} className="w-1/2">
              <Button className="w-full bg-white text-black hover:bg-amber-500 hover:text-black font-bold rounded-xl transition-all flex items-center gap-2 group/btn">
                View
                <ArrowUpRight className="size-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
