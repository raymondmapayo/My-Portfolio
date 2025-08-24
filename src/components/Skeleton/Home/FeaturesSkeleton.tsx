import { Card } from "antd";
import React from "react";

const FeaturesSkeleton: React.FC = () => {
  // Show 3 placeholder cards
  const skeletonCards = Array.from({ length: 3 });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Skeleton cards */}
      <div className="flex gap-4 overflow-x-auto">
        {skeletonCards.map((_, idx) => (
          <Card
            key={idx}
            className="rounded-2xl overflow-hidden shadow-md flex-shrink-0 w-64 bg-gray-300 dark:bg-gray-700 animate-pulse"
          >
            <div className="h-48 w-full bg-gray-400 dark:bg-gray-600 rounded-t-2xl" />
            <div className="mt-2 h-4 w-3/4 bg-gray-400 dark:bg-gray-600 rounded" />
            <div className="mt-1 h-3 w-1/2 bg-gray-400 dark:bg-gray-600 rounded" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSkeleton;
