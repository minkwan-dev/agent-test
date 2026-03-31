import { protocolLayers } from "@/components/landing/landing-data";

export function ProtocolStackVisual() {
  return (
    <div className="relative mx-auto w-full max-w-2xl sm:max-w-3xl">
      <div className="pointer-events-none absolute inset-x-14 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#cbd5e1] to-transparent" />
      <div className="relative flex min-h-[340px] flex-col sm:min-h-[380px]">
        {protocolLayers.map((layer, i) => (
          <div
            key={layer.id}
            className={`relative rounded-2xl border border-[#e5e8eb] bg-white p-6 shadow-md transition-[box-shadow,transform] duration-200 hover:shadow-lg motion-safe:hover:animate-protocol-stack-wobble sm:p-7 ${i > 0 ? "-mt-10 sm:-mt-11" : ""}`}
            style={{ zIndex: i + 1 }}
          >
            <div
              className={`flex items-center justify-between gap-4 rounded-xl bg-gradient-to-r ${layer.tone} px-6 py-5 sm:px-7 sm:py-6`}
            >
              <span className="text-xl font-bold text-[#191f28] sm:text-2xl">{layer.id}</span>
              <span className="text-base font-medium text-[#4e5968] sm:text-xl">{layer.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
