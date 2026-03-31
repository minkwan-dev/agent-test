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
        "flex w-full items-center gap-2.5 rounded-lg py-2 pl-3 pr-2 text-left text-sm font-medium transition",
        active
          ? "bg-[#f2f4f6] text-[#191f28]"
          : "text-[#4e5968] hover:bg-[#f9fafb] hover:text-[#191f28]",
      )}
    >
      <span className={cn(active ? "text-[#191f28]" : "text-[#8b95a1]")}>
        {icon}
      </span>
      <span className="flex-1">{children}</span>
      {badge != null && (
        <span className="flex min-w-[1.25rem] items-center justify-center rounded-full bg-[#f84848] px-1.5 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}
