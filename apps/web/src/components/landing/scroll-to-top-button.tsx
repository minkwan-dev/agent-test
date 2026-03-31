import { ChevronUp } from "lucide-react";

export function ScrollToTopButton({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e8eb] bg-white text-[#191f28] shadow-lg transition hover:bg-[#f9fafb] sm:bottom-8 sm:right-8 sm:h-12 sm:w-12"
      aria-label="페이지 최상단으로 이동"
    >
      <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />
    </button>
  );
}
