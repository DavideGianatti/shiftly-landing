import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { EarlyAccessSection } from "@/components/EarlyAccessSection";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <EarlyAccessSection />
      </main>
      <Footer />
    </>
  );
}
