import HeroSection from "@/components/wedding/HeroSection";
import CountdownSection from "@/components/wedding/CountdownSection";
import DetailsSection from "@/components/wedding/DetailsSection";
import AgendaSection from "@/components/wedding/AgendaSection";
import CoupleMessageSection from "@/components/wedding/CoupleMessageSection";
import RSVPSection from "@/components/wedding/RSVPSection";
import FooterSection from "@/components/wedding/FooterSection";
import MusicToggle from "@/components/wedding/MusicToggle";

const Index = () => {
  return (
    <main className="bg-background">
      <MusicToggle />
      <HeroSection />
      <CountdownSection />
      <DetailsSection />
      <AgendaSection />
      <CoupleMessageSection />
      <RSVPSection />
      <FooterSection />
    </main>
  );
};

export default Index;
