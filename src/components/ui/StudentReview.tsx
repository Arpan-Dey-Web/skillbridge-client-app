"use client";

import * as React from "react";
import Image from "next/image";
import { Star, Quote, Award, GraduationCap } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Sarah Jenkins",
    achievement: "A* in Physics & Math",
    university: "Oxford University",
    image: "https://i.pravatar.cc/150?u=sarah",
    content:
      "The mentors here didn't just teach me formulas; they taught me how to think. I went from a B to an A* in just four months.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    achievement: "Top 1% SAT Score",
    university: "Stanford Candidate",
    image: "https://i.pravatar.cc/150?u=marcus",
    content:
      "The personalized approach is what makes LearnHub different. My tutor identified my weak spots in the first session.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    achievement: "98% in Accounting",
    university: "LSE Placement",
    image: "https://i.pravatar.cc/150?u=elena",
    content:
      "The virtual classroom tools are incredible. It felt like my tutor was right there in the room with me.",
    rating: 5,
  },
  // --- New Reviews Added Below ---
  {
    name: "Arjun Mehta",
    achievement: "Full-Stack Mastery",
    university: "Google Intern",
    image: "https://i.pravatar.cc/150?u=arjun",
    content:
      "I was struggling with Next.js architecture. My mentor broke down complex concepts into digestible pieces. Now I'm building production apps.",
    rating: 5,
  },
  {
    name: "Chloe Whitmore",
    achievement: "IELTS 8.5 Band",
    university: "Cambridge Admission",
    image: "https://i.pravatar.cc/150?u=chloe",
    content:
      "The language experts here are phenomenal. The feedback on my writing was detailed and precisely what I needed to reach the top band.",
    rating: 5,
  },
  {
    name: "David Okoro",
    achievement: "95% in Chemistry",
    university: "MIT Aspirant",
    image: "https://i.pravatar.cc/150?u=david",
    content:
      "Organic Chemistry was a nightmare until I joined LearnHub. The visualization techniques used by my tutor were a complete game-changer.",
    rating: 5,
  },
];

export function StudentReviews() {
  return (
    <section className="py-24 bg-background relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-10 bg-primary" />
              <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">
                Student Testimonials
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-none uppercase">
              The LearnHub <br />
              <span className="text-primary italic font-serif lowercase">
                Experience.
              </span>
            </h2>
          </div>
          <div className="max-w-xs border-l-2 border-primary/30 pl-6 pb-2">
            <p className="text-muted-foreground font-medium text-lg leading-relaxed">
              Join thousands who have secured their academic future with us.
            </p>
          </div>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="group h-full p-10 rounded-[3rem] bg-card border border-border relative transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.05)]">
                  {/* Decorative Quote */}
                  <Quote className="absolute top-8 right-10 size-16 text-primary/[0.03] group-hover:text-primary/10 transition-colors duration-500" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Professional Rating Display */}
                    <div className="flex gap-1.5 mb-8">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="size-4 fill-primary text-primary"
                        />
                      ))}
                    </div>

                    {/* Content with precise typography */}
                    <p className="text-foreground/90 font-medium italic text-lg leading-relaxed mb-10 flex-grow">
                      "{review.content}"
                    </p>

                    <div className="mt-auto pt-8 border-t border-border flex items-center gap-5">
                      <div className="relative size-16 rounded-[1.25rem] overflow-hidden border border-border shadow-sm group-hover:border-primary/30 transition-colors">
                        <Image
                          src={review.image}
                          alt={review.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="font-black text-foreground uppercase tracking-tight text-lg leading-none mb-2">
                          {review.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Award className="size-3 text-primary" />
                          <span className="text-[10px] font-black text-primary uppercase tracking-[0.1em]">
                            {review.achievement}
                          </span>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                          {review.university}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation with Theme-Aware Overrides */}
          <div className="flex justify-center gap-6 mt-16">
            <CarouselPrevious className="static translate-y-0 size-14 rounded-2xl bg-card border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 shadow-sm" />
            <CarouselNext className="static translate-y-0 size-14 rounded-2xl bg-card border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 shadow-sm" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
