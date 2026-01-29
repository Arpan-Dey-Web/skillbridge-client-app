import { Button } from "./button";
import { Star, Clock, ShieldCheck } from "lucide-react";


const tutors = [
  {
    id: "1",
    name: "Dr. Aris Thorne",
    role: "Mathematics Professor",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aris",
    subjects: ["Calculus", "Linear Algebra"],
    rating: 4.9,
    reviewCount: 128,
    pricePerHour: 45,
    bio: "Specializing in making complex engineering mathematics simple and approachable for university students.",
    badge: "Top Rated",
    color: "primary",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    role: "Senior Software Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    subjects: ["React", "Node.js", "Python"],
    rating: 5.0,
    reviewCount: 85,
    pricePerHour: 60,
    bio: "Industry veteran helping students build real-world applications and master full-stack development.",
    badge: "Popular",
    color: "secondary",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Language Specialist",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    subjects: ["Spanish", "French"],
    rating: 4.8,
    reviewCount: 210,
    pricePerHour: 35,
    bio: "Native speaker with a focus on conversational fluency and professional business communication.",
    badge: "Super Tutor",
    color: "primary",
  },
  {
    id: "4",
    name: "Marcus Vane",
    role: "Physics Researcher",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    subjects: ["Quantum Physics", "Mechanics"],
    rating: 4.7,
    reviewCount: 56,
    pricePerHour: 50,
    bio: "Breaking down the laws of the universe for high school and college-level physics students.",
    badge: "Fast Responder",
    color: "secondary",
  },
];


export function FeaturedTutors() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold">Top Rated Tutors</h2>
            <p className="text-muted-foreground">
              Learn from the best in the community
            </p>
          </div>
          <Button variant="link" className="text-primary font-bold">
            See all tutors →
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="group relative bg-white rounded-3xl border border-border p-5 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Top Info: Badge & Price */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-accent text-primary rounded-lg">
                  {tutor.badge}
                </span>
                <p className="font-bold text-foreground">
                  ${tutor.pricePerHour}
                  <span className="text-xs text-muted-foreground font-normal">
                    /hr
                  </span>
                </p>
              </div>

              {/* Profile Section */}
              <div className="flex flex-col items-center text-center gap-2 mb-4">
                <div className="relative">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="size-20 rounded-2xl bg-accent p-1"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
                    <ShieldCheck className="size-5 text-primary fill-primary/10" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">
                    {tutor.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{tutor.role}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-4">
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold">{tutor.rating}</span>
                <span className="text-xs text-muted-foreground">
                  ({tutor.reviewCount} reviews)
                </span>
              </div>

              {/* Subjects (Mapping internal array) */}
              <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                {tutor.subjects.map((sub) => (
                  <span
                    key={sub}
                    className="text-[10px] font-medium px-2 py-1 rounded-md bg-secondary/10 text-secondary-foreground border border-secondary/20"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 group-hover:gap-3">
                Book Session
                <Clock className="size-4 opacity-70" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
