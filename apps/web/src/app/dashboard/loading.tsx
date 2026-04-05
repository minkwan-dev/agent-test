export default function DashboardLoading() {
  return (
    <div className="flex flex-col">
      <div className="shrink-0 border-b border-[#e5e8eb] bg-white px-3 py-3.5 sm:px-5 lg:px-6">
        <div className="h-6 w-48 max-w-full animate-pulse rounded-md bg-[#e5e8eb]" />
        <div className="mt-2 h-4 w-72 max-w-full animate-pulse rounded-md bg-[#f2f4f6]" />
      </div>
      <div className="px-3 py-5 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-[1440px] space-y-6">
          <div className="h-40 animate-pulse rounded-2xl bg-[#e5e8eb]" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-[#e5e8eb]" />
            ))}
          </div>
          <div className="h-64 animate-pulse rounded-2xl bg-[#e5e8eb]" />
        </div>
      </div>
    </div>
  );
}
