import React from "react";

const GitinTouchSkeleton: React.FC = () => {
  const icons = Array.from({ length: 5 });

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md font-[Poppins] overflow-hidden mx-0 lg:mx-0 lg:mr-4 pb-10 transition-colors duration-300">
      {/* Title Skeleton */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Social Icons Skeleton */}
      <div className="flex flex-wrap gap-4 mb-4">
        {icons.map((_, idx) => (
          <div
            key={idx}
            className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"
          />
        ))}
      </div>

      {/* Bottom Text Skeleton */}
      <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2" />
      <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
    </div>
  );
};

export default GitinTouchSkeleton;
