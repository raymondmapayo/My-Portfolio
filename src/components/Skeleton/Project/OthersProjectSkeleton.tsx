// OthersProjectSkeleton.tsx

const OthersProjectSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300 w-full animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>

      {/* Project Cards */}
      <div className="flex flex-col gap-5">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md flex flex-col bg-gray-200 dark:bg-gray-800 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 mt-1 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 rounded-md" />
                    <div className="w-16 h-5 bg-gray-300 dark:bg-gray-700 rounded-md" />
                  </div>
                  <div className="w-1/3 h-3 bg-gray-300 dark:bg-gray-700 rounded-md" />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Load More Skeleton */}
      <div className="flex justify-center mt-5">
        <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </div>
  );
};

export default OthersProjectSkeleton;
