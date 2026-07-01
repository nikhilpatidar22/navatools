export function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 animate-pulse">
          <div className="w-12 h-12 rounded-2xl bg-gray-200 dark:bg-gray-800 mb-4" />
          <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg mb-2" />
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-lg mb-1" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        </div>
      ))}
    </div>
  )
}
