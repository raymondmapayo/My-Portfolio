import React from "react";

const CreatedProjectSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 transition-colors duration-300 w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
        <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Project list skeletons */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-10">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start gap-6 w-full md:w-[48%]"
            aria-hidden
          >
            {/* Image skeleton */}
            <div className="w-full md:w-64 h-44 md:h-44 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse" />

            {/* Details */}
            <div className="flex flex-col gap-3 flex-1">
              {/* Title */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
                <div className="h-5 w-60 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              </div>

              {/* Paragraph preview */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-3 w-4/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              </div>

              {/* Tech tags */}
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 3 }).map((__, i) => (
                  <div
                    key={i}
                    className="h-6 w-14 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatedProjectSkeleton;
