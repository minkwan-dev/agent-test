import Image from "next/image";
import { cn } from "@/lib/utils";

/** 로컬 기본 이미지 (프로필 URL 없을 때) */
export const PROFILE_FALLBACK_SRC = "/media/profile-avatar.png";

const sizePx = { sm: 28, md: 56 } as const;

type ProfileAvatarProps = {
  size?: keyof typeof sizePx;
  /** 외부 URL이면 `unoptimized`로 표시. 없으면 `PROFILE_FALLBACK_SRC` 캐릭터 이미지 */
  src?: string | null;
  className?: string;
};

export function ProfileAvatar({ size = "md", src, className }: ProfileAvatarProps) {
  const px = sizePx[size];
  const resolved = src?.trim() ? src.trim() : PROFILE_FALLBACK_SRC;
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full bg-[#e8eaec]",
        size === "sm" ? "h-7 w-7" : "h-14 w-14",
        className,
      )}
    >
      <Image
        src={resolved}
        alt="프로필"
        width={px}
        height={px}
        className="h-full w-full object-cover object-center"
        sizes={size === "sm" ? "28px" : "56px"}
        priority={size === "sm"}
        unoptimized={resolved.startsWith("http")}
      />
    </span>
  );
}
