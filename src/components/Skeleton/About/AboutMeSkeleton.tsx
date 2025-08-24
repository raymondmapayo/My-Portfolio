const AboutMeSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 min-w-[130px] animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Paragraph Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* See More Skeleton */}
      <div className="mt-4 h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  );
};

export default AboutMeSkeleton;
