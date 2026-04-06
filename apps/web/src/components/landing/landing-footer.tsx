import Link from "next/link";
import { Brand } from "@/components/brand";

export function LandingFooter() {
  return (
    <footer className="border-t border-[#e5e8eb] bg-[#f9fafb]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)] lg:gap-16">
          <div>
            <Link href="/" className="inline-block">
                <Brand.SemosoLogoLockup size="lg" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#4e5968]">
              식료품 매장·단체급식·소매 팀을 위한 운영 콘솔이에요. 재고부터 발주·기록까지 한 흐름으로
              다룰 수 있어요.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#a78bfa]">서비스</p>
              <ul className="mt-4 space-y-3 text-sm text-[#4e5968]">
                <li>
                  <a href="#features" className="transition hover:text-[#191f28]">
                    기능 소개
                  </a>
                </li>
                <li>
                  <a href="#stats" className="transition hover:text-[#191f28]">
                    운영 지표
                  </a>
                </li>
                <li>
                  <a href="#flow" className="transition hover:text-[#191f28]">
                    업무 순서
                  </a>
                </li>
                <li>
                  <a href="#faq" className="transition hover:text-[#191f28]">
                    자주 묻는 질문
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#a78bfa]">
                법인 · 고객센터
              </p>
              <dl className="mt-4 space-y-4 text-sm text-[#4e5968]">
                <div>
                  <dt className="text-xs font-semibold text-[#8b95a1]">상호</dt>
                  <dd className="mt-1 text-[#191f28]">semoso</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-[#8b95a1]">주소</dt>
                  <dd className="mt-1 leading-relaxed text-[#191f28]">
                    서울특별시 강남구 테헤란로
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-[#8b95a1]">고객문의</dt>
                  <dd className="mt-1">
                    <a
                      href="mailto:business@novitas.io"
                      className="font-medium text-[#191f28] underline-offset-2 transition hover:text-[#a78bfa] hover:underline"
                    >
                      business@semoso.io
                    </a>
                    <p className="mt-2 text-xs leading-relaxed text-[#8b95a1]">
                      평일 10:00 – 18:00 (점심 12:00 – 13:00, 주말·공휴일 휴무)
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-[#e5e8eb] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-[#8b95a1]">
            © {new Date().getFullYear()} semoso. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#8b95a1]">
            <a href="#features" className="transition hover:text-[#191f28]">
              사이트맵
            </a>
            <span className="hidden text-[#d1d6db] sm:inline" aria-hidden>
              |
            </span>
            <a href="#" className="transition hover:text-[#191f28]">
              이용약관
            </a>
            <a href="#" className="transition hover:text-[#191f28]">
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
