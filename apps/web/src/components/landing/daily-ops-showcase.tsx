"use client";

import Image from "next/image";
import { tossImage } from "@/images";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function DailyOpsShowcase() {
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  const widthFrac = useTransform(scrollYProgress, [0, 0.45, 1], [0.3, 1, 1]);
  const widthCss = useTransform(widthFrac, (f) => `${f * 100}%`);

  return (
    <div
      ref={scrollRef}
      className={
        reduce ? "relative w-full bg-[#f2f4f6]" : "relative w-full min-h-[50vh] bg-[#f2f4f6]"
      }
    >
      <div className="sticky top-0 flex w-full justify-center overflow-hidden">
        <motion.div
          className="relative shrink-0 overflow-hidden will-change-[width]"
          style={reduce ? { width: "100%" } : { width: widthCss }}
        >
          <Image
            src={tossImage}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            priority
          />
          <h2
            className="pointer-events-none absolute inset-0 z-10 m-0 flex items-center justify-center px-5 text-center text-[1.85rem] font-bold leading-[1.15] tracking-tight text-white sm:text-4xl sm:px-8 md:text-5xl lg:text-6xl"
            style={{
              textShadow:
                "0 2px 20px rgba(0,0,0,0.45), 0 0 2px rgba(0,0,0,0.35), 0 8px 48px rgba(0,0,0,0.35)",
            }}
          >
            매장 운영, 하나의 흐름으로
          </h2>
        </motion.div>
      </div>
    </div>
  );
}