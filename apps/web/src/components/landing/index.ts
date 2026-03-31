import { DailyOpsShowcase } from "./daily-ops-showcase";
import { CtaVisual } from "./cta-visual";
import { FaqSideVisual } from "./faq-side-visual";
import { FlowPipelineVisual } from "./flow-pipeline-visual";
import { HeroPreview } from "./hero-preview";
import { LandingCtaSection } from "./landing-cta-section";
import { LandingFaqSection } from "./landing-faq-section";
import { LandingFeaturesSection } from "./landing-features-section";
import { LandingFlowSection } from "./landing-flow-section";
import { LandingFooter } from "./landing-footer";
import { LandingHeader } from "./landing-header";
import { LandingHero } from "./landing-hero";
import { LandingPage } from "./landing-page";
import { LandingPreviewSection } from "./landing-preview-section";
import { LandingStatsSection } from "./landing-stats-section";
import { PreviewDashboardPanel } from "./preview-dashboard-panel";
import { ProtocolStackVisual } from "./protocol-stack-visual";
import { Reveal, RevealItem, RevealStagger } from "./reveal";
import { ScrollToTopButton } from "./scroll-to-top-button";
import { StatsVisual } from "./stats-visual";
import * as landingData from "./landing-data";

/** 랜딩 페이지 구성 요소 */
export const Landing = {
  Page: LandingPage,
  Header: LandingHeader,
  Hero: LandingHero,
  StatsSection: LandingStatsSection,
  FeaturesSection: LandingFeaturesSection,
  FlowSection: LandingFlowSection,
  PreviewSection: LandingPreviewSection,
  FaqSection: LandingFaqSection,
  CtaSection: LandingCtaSection,
  Footer: LandingFooter,
  ScrollToTopButton,
  DailyOpsShowcase,
  HeroPreview,
  PreviewDashboardPanel,
  StatsVisual,
  ProtocolStackVisual,
  FlowPipelineVisual,
  FaqSideVisual,
  CtaVisual,
  Reveal,
  RevealItem,
  RevealStagger,
  data: landingData,
} as const;

export type LandingNamespace = typeof Landing;
