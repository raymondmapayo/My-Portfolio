import React from "react";

const SkillsSkeleton: React.FC = () => {
  const placeholders = Array.from({ length: 9 });

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md font-[Poppins] overflow-hidden mx-0 lg:mx-0 lg:mr-4 pb-10 transition-colors duration-300">
      {/* Title Skeleton */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Scrolling Rows Skeleton */}
      <div className="space-y-6">
        {[0, 1].map((rowIdx) => (
          <div key={rowIdx} className="flex gap-4 overflow-x-auto">
            {placeholders.map((_, idx) => (
              <div
                key={idx}
                className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse flex-shrink-0"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSkeleton;
