import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { EarlyAccessSection } from "@/components/EarlyAccessSection";
import { Footer } from "@/components/Footer";
import { ContactModalProvider } from "@/components/ContactModalProvider";

export default function LandingPage() {
  return (
    <ContactModalProvider>
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <EarlyAccessSection />
      </main>
      <Footer />
    </ContactModalProvider>
  );
}
