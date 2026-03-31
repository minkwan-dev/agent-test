"use client";

import { useEffect, useState } from "react";
import { DailyOpsShowcase } from "@/components/landing/daily-ops-showcase";
import { LandingCtaSection } from "@/components/landing/landing-cta-section";
import { LandingFaqSection } from "@/components/landing/landing-faq-section";
import { LandingFeaturesSection } from "@/components/landing/landing-features-section";
import { LandingFlowSection } from "@/components/landing/landing-flow-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingPreviewSection } from "@/components/landing/landing-preview-section";
import { LandingStatsSection } from "@/components/landing/landing-stats-section";
import { ScrollToTopButton } from "@/components/landing/scroll-to-top-button";

export function LandingPage() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-dvh bg-[#f2f4f6] text-[#191f28]">
      <LandingHeader />

      <main>
        <LandingHero />
        <LandingStatsSection />
        <DailyOpsShowcase />
        <LandingFeaturesSection />
        <LandingFlowSection />
        <LandingPreviewSection />
        <LandingFaqSection />
        <LandingCtaSection />
      </main>

      <ScrollToTopButton visible={showTop} />
      <LandingFooter />
    </div>
  );
}
