"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { EventsSection } from "@/components/EventsSection";
import { PongalSection } from "@/components/PongalSection";
import { TeamSection } from "@/components/TeamSection";
import { GallerySection } from "@/components/GallerySection";
import { KanaiyazhiSection } from "@/components/KanaiyazhiSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <PongalSection />
      <TeamSection />
      <GallerySection />
      <KanaiyazhiSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
