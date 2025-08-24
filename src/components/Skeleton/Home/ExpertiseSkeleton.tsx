import React from "react";

const ExpertiseSkeleton: React.FC = () => {
  const panels = Array.from({ length: 4 });

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md font-[Poppins] overflow-hidden mx-0 lg:mx-0 lg:mr-4 pb-10 transition-colors duration-300">
      {/* Title Skeleton */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Panels Skeleton */}
      <div className="space-y-4">
        {panels.map((_, idx) => (
          <div
            key={idx}
            className="h-16 sm:h-20 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default ExpertiseSkeleton;
