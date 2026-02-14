import HeroBanner from "@/components/ui/Banner";
import { Categories } from "@/components/ui/Categories";
import { FeaturedTutors } from "@/components/ui/FeaturedTutors";
import { FeaturesSection } from "@/components/ui/FeaturesSection";
import { StudentReviews } from "@/components/ui/StudentReview";
import { TopStudents } from "@/components/ui/TopStudents";
import { TrustStrip } from "@/components/ui/truststrip";
import { TutorCTA } from "@/components/ui/Tutorcta";
import { WhatWeOffer } from "@/components/ui/WhatWeOffer";
import { WhyStudents } from "@/components/ui/WhyStudentCome";
export default function Home() {
  return (
    <div>
      <HeroBanner />
      <TrustStrip />
      <Categories />
      <WhyStudents />
      <FeaturesSection />
      <FeaturedTutors />
      <WhatWeOffer />
      <TopStudents />
      <StudentReviews />
      <TutorCTA />
    </div>
  );
}
