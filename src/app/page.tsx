import { Navbar } from "@/components/layout/Navbar";
import HeroBanner from "@/components/ui/Banner";
import { Categories } from "@/components/ui/Categories";
import { FeaturedTutors } from "@/components/ui/FeaturedTutors";
import { FeaturesSection } from "@/components/ui/FeaturesSection";
import { TutorCTA } from "@/components/ui/Tutorcta";
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <Categories />
      <FeaturedTutors />
      <FeaturesSection />
      <TutorCTA />
    </div>
  );
}
