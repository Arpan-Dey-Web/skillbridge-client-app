import HeroBanner from "@/components/ui/Banner";
import { Categories } from "@/components/ui/Categories";
import { FeaturedTutors } from "@/components/ui/FeaturedTutors";
import { FeaturesSection } from "@/components/ui/FeaturesSection";
import { TrustStrip } from "@/components/ui/truststrip";
import { TutorCTA } from "@/components/ui/Tutorcta";
export default function Home() {
  return (
    <div>
      <HeroBanner />
      <TrustStrip/>
      <Categories />
      <FeaturedTutors />
      <FeaturesSection />
      <TutorCTA />
    </div>
  );
}
