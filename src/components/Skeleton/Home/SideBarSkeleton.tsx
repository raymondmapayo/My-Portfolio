// SideBarSkeleton.tsx
const SideBarSkeleton = () => {
  return (
    <div className="p-4 animate-pulse w-full">
      {/* Avatar Skeleton (aligned like actual sidebar) */}
      <div className="mb-6">
        <div className="w-28 h-28 rounded-full bg-gray-300 dark:bg-gray-700 mb-4" />
        <div className="text-left">
          <div className="w-32 h-5 bg-gray-300 dark:bg-gray-700 rounded-md mb-2" />
          <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded-md mb-4" />
          <div className="w-full h-9 bg-gray-300 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>

      {/* Navigation Skeleton */}
      <div className="flex flex-col gap-3 mb-6">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-full h-8 bg-gray-300 dark:bg-gray-700 rounded-md"
            />
          ))}
      </div>

      {/* Dark Mode Switch Skeleton */}
      <div className="flex items-center justify-between gap-3 max-w-[240px] bg-gray-100 dark:bg-gray-700 rounded-lg px-6 py-3 mb-4">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full" />
        <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded-md" />
        <div className="w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded-md" />
      </div>

      {/* Footer Skeleton */}
      <div className="mt-4 flex flex-col sm:flex-row flex-wrap justify-start gap-1 text-xs sm:text-sm">
        <div className="w-32 h-3 bg-gray-300 dark:bg-gray-600 rounded-md" />
        <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded-md sm:ml-2" />
      </div>
    </div>
  );
};

export default SideBarSkeleton;
