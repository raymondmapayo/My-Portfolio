import React from "react";

const MyProjectSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-transparent rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300 w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
        <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Grid layout (4 columns on large screens) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md transition-transform duration-300 flex flex-col bg-white dark:bg-gray-800 cursor-pointer"
            aria-hidden
          >
            <div className="p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-gray-300 dark:bg-gray-700 flex-shrink-0 animate-pulse" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                  <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
                </div>

                <div className="mt-2 h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>

            {/* card footer small spacing to match card height */}
            <div className="px-4 pb-4 pt-2">
              <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Load More placeholder */}
      <div className="flex justify-center mt-5">
        <div className="h-8 w-28 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
      </div>
    </div>
  );
};

export default MyProjectSkeleton;
