import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavLink({
  children,
  icon,
  active,
  href,
  onNavigate,
  badge,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  active?: boolean;
  href: string;
  onNavigate?: () => void;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "grid w-full items-center gap-x-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition",
        badge != null
          ? "grid-cols-[1rem_minmax(0,1fr)_auto]"
          : "grid-cols-[1rem_minmax(0,1fr)]",
        active
          ? "bg-white text-[var(--color-foreground)] shadow-sm ring-1 ring-[var(--color-border)]"
          : "text-[#4e5968] hover:bg-white/60 hover:text-[var(--color-foreground)]",
      )}
    >
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center [&>svg]:size-4",
          active ? "text-[#191f28]" : "text-[#8b95a1]",
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 leading-snug">{children}</span>
      {badge != null ? (
        <span className="flex min-w-[1.25rem] shrink-0 items-center justify-center justify-self-end rounded-full bg-[#f84848] px-1.5 text-[10px] font-bold text-white">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}
