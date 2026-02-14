"use client";

import { Star, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "./card";
import Link from "next/link";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";

// --- Strict Interface for VS Code IntelliSense ---
interface TutorCardProps {
  tutor: {
    id: string;
    hourlyRate: number;
    bio: string;
    averageRating: number;
    user: {
      name: string;
      image?: string;
    };
    category?: {
      name: string;
    };
  };
}

export default function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="group relative bg-card hover:bg-accent/50 transition-all duration-500 border-border hover:border-primary/50 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5">
      <CardContent className="p-0">
        <div className="p-8 space-y-6">
          {/* Header: Identity & Pricing */}
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="relative">
                <Avatar className="size-16 border border-border group-hover:border-primary/50 transition-colors duration-500 rounded-2xl">
                  <AvatarImage
                    src={tutor.user.image}
                    alt={tutor.user.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-secondary text-foreground font-black text-xl">
                    {tutor.user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-background border border-border rounded-full p-1 shadow-sm">
                  <ShieldCheck className="size-3 text-primary" />
                </div>
              </div>

              <div className="pt-1">
                <h3 className="font-black text-lg text-foreground tracking-tight leading-none mb-1.5">
                  {tutor.user.name}
                </h3>
                <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                  {tutor.category?.name || "Specialist"}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-baseline justify-end gap-0.5">
                <span className="text-xs font-bold text-muted-foreground">
                  $
                </span>
                <p className="text-2xl font-black text-foreground tracking-tighter">
                  {tutor.hourlyRate}
                </p>
              </div>
              <p className="text-[9px] uppercase font-black text-muted-foreground/60 tracking-widest">
                hr rate
              </p>
            </div>
          </div>

          {/* Bio Preview */}
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed font-medium italic">
            {tutor.bio}
          </p>

          {/* Footer: Rating & CTA */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 bg-background border border-border px-3 py-1.5 rounded-xl shadow-inner">
              <Star className="size-3 fill-primary text-primary" />
              <span className="text-xs font-black text-foreground">
                {tutor.averageRating.toFixed(1)}
              </span>
            </div>

            <Link href={`/tutors/${tutor.id}`} className="w-[45%]">
              <Button
                className={cn(
                  "w-full h-10 rounded-xl px-0 font-black text-[10px] uppercase tracking-widest transition-all duration-300",
                  "flex items-center justify-center gap-2 group/btn",
                  "bg-foreground text-background hover:bg-primary hover:text-primary-foreground",
                  "shadow-md hover:shadow-primary/20 hover:-translate-y-0.5",
                )}
              >
                Profile
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
