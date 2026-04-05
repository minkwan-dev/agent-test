import { Fragment } from "react";
import { landingFlowSteps } from "@/components/landing/landing-data";

export function FlowPipelineVisual() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-[#e5e8eb] bg-[#f9fafb] px-4 py-8 sm:px-8">
      <div className="mx-auto w-full min-w-[min(100%,640px)] max-w-5xl sm:min-w-0">
        <div className="flex w-full items-start">
          {landingFlowSteps.map((s, i) => (
            <Fragment key={s.n}>
              <div className="relative z-10 flex min-w-0 flex-1 flex-col items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-white bg-[#6eb89a] text-sm font-bold text-white shadow-lg sm:h-16 sm:w-16 sm:text-base">
                  {s.n}
                </div>
                <p className="mx-auto mt-3 w-full max-w-[100px] text-center text-xs font-semibold leading-tight text-[#191f28] sm:max-w-[120px] sm:text-sm">
                  {s.title}
                </p>
              </div>
              {i < landingFlowSteps.length - 1 ? (
                <div className="relative min-w-0 flex-1" aria-hidden>
                  <div className="pointer-events-none absolute left-0 right-0 top-7 border-t-2 border-dashed border-[#cbd5e1] sm:top-8" />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
