import { useState } from "react";
import { HeroSection } from "../components/HeroSection";
import { FeaturedCourts } from "../components/FeaturedCourts";
import { SportCategories } from "../components/SportCategories";
import { HowItWorks } from "../components/HowItWorks";
import { Testimonials } from "../components/Testimonials";
import { CTABanner } from "../components/CTABanner";
import { Footer } from "../components/Footer";
import { CourtDetail } from "../components/CourtDetail";
import { useNavigate } from "react-router-dom";

interface Court {
  id: string;
  name: string;
  location: string;
  sport: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
}

export function HomePage() {
  const navigate = useNavigate();
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);

  return (
    <div className="flex-1 flex flex-col pt-24">
      <main className="flex-1">
        <HeroSection onFindCourtsClick={() => navigate("/listing")} />
        <SportCategories />
        <FeaturedCourts onCourtClick={setSelectedCourt} />
        <HowItWorks />
        <Testimonials />
        <CTABanner />
      </main>

      {selectedCourt && (
        <CourtDetail
          court={selectedCourt as any}
          isOpen={!!selectedCourt}
          onClose={() => setSelectedCourt(null)}
        />
      )}

      <Footer />
    </div>
  );
}
