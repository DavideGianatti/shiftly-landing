import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { DifferentiationSection } from "@/components/DifferentiationSection";
import { BrandStatement } from "@/components/BrandStatement";
import { EarlyAccessSection } from "@/components/EarlyAccessSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <DifferentiationSection />
        <BrandStatement />
        <EarlyAccessSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
