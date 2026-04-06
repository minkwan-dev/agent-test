export function NavSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2">
      {/** pl = 링크 px-3(12px) + 아이콘 열(16px) + gap(10px) — 항목 라벨과 같은 시작선 */}
      <div className="pr-3 pb-1.5 pt-2 pl-[2.375rem] text-[11px] font-semibold text-[#8b95a1]">
        {label}
      </div>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}
