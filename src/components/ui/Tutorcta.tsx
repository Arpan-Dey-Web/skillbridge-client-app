import { Button } from "./button";

export function TutorCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="relative rounded-[3rem] bg-secondary p-8 md:p-16 overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -top-24 -right-24 size-64 bg-white/10 rounded-full" />

          <div className="relative z-10 grid md:grid-cols-2 items-center gap-12">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to share your knowledge?
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Join our community of expert tutors and start earning while
                making a difference. Set your own rates, choose your hours, and
                teach the subjects you love.
              </p>
              <Button
                size="lg"
                className="bg-white text-secondary hover:bg-white/90 rounded-2xl px-10 h-14 font-bold"
              >
                Become a Tutor
              </Button>
            </div>
            <div className="hidden md:flex justify-center">
              {/* Illustration or Image of a Tutor */}
              <div className="size-72 bg-white/20 rounded-full border-8 border-white/10 flex items-center justify-center">
                <span className="text-8xl">🎓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
