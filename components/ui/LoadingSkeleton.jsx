export function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113] p-5 animate-pulse">
          <div className="w-10 h-10 rounded-[10px] bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.04)] mb-3" />
          <div className="h-4 w-3/4 bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.04)] rounded-md mb-2" />
          <div className="h-3 w-full bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.04)] rounded-md mb-1" />
          <div className="h-3 w-2/3 bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.04)] rounded-md" />
        </div>
      ))}
    </div>
  )
}
