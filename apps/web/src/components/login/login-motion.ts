import type { Variants } from "framer-motion";

/** 좌·우 로그인 패널 공통 이징·등장 모션 */
export const loginContentEase = [0.22, 1, 0.36, 1] as const;

export const loginContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};

export const loginItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: loginContentEase },
  },
};
