"use client";

import { Novitas } from "@/components/novitas";

export default function OnboardingPage() {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 lg:max-w-6xl lg:px-12">
      <Novitas.OnboardingWizard />
    </div>
  );
}
