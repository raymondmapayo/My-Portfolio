// ProjectSinglePageSkeleton.tsx

const ProjectSinglePageSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 w-full animate-pulse">
      {/* Back Button Skeleton */}
      <div className="w-10 h-10 mb-4 rounded-full bg-gray-300 dark:bg-gray-700" />

      {/* Title and visibility */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="w-1/3 h-6 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="w-20 h-5 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>

      {/* Tech Stack Skeleton */}
      <div className="flex gap-2 flex-wrap mb-6">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded-md"
            />
          ))}
      </div>

      {/* Info Items Skeleton */}
      <div className="flex flex-col gap-4 mb-6">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="w-1/3 h-4 bg-gray-200 dark:bg-gray-700 rounded-md" />
            </div>
          ))}
      </div>

      {/* Project Images Skeleton */}
      {Array(2)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="mb-8">
            <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 rounded-lg mb-3" />
            {Array(2)
              .fill(0)
              .map((__, j) => (
                <div
                  key={j}
                  className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"
                />
              ))}
          </div>
        ))}
    </div>
  );
};

export default ProjectSinglePageSkeleton;
