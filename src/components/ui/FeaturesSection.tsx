import { cn } from "@/lib/utils";
import { ShieldCheck, Zap, Video, Calendar } from "lucide-react";

const features = [
  {
    title: "Verified Experts",
    desc: "Every tutor is background-checked and vetted for quality.",
    icon: <ShieldCheck className="text-primary" />,
    className: "md:col-span-2",
  },
  {
    title: "Instant Booking",
    desc: "Schedule sessions in seconds.",
    icon: <Zap className="text-secondary" />,
    className: "md:col-span-1",
  },
  {
    title: "Virtual Classroom",
    desc: "Integrated video and whiteboarding tools.",
    icon: <Video className="text-primary" />,
    className: "md:col-span-1",
  },
  {
    title: "Flexible Timing",
    desc: "Learn on your own schedule, anytime, anywhere.",
    icon: <Calendar className="text-secondary" />,
    className: "md:col-span-2",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-accent/20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-muted-foreground">
            SkillBridge provides the tools for both students and tutors to have
            a seamless learning experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className={cn(
                "p-8 rounded-3xl bg-white border border-border flex flex-col gap-4",
                f.className,
              )}
            >
              <div className="size-12 rounded-2xl bg-muted flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
