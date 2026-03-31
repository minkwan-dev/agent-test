"use client";

import { Novitas } from "@/components/novitas";

export default function OnboardingPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:max-w-6xl lg:px-12">
      <Novitas.OnboardingWizard />
    </div>
  );
}
