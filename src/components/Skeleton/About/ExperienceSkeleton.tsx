const ExperienceSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 max-w-full animate-pulse">
      {/* Title Skeleton */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="h-6 w-32 sm:w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Experience List Skeleton */}
      <ul className="space-y-6">
        {[...Array(3)].map((_, idx) => (
          <li
            key={idx}
            className="flex flex-wrap sm:flex-nowrap items-start gap-4"
          >
            {/* Image Skeleton */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 dark:bg-gray-700 rounded-md shadow-sm flex-shrink-0"></div>

            {/* Details Skeleton */}
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 sm:w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-24 sm:w-36 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-20 sm:w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-28 sm:w-40 bg-gray-300 dark:bg-gray-700 rounded mt-1"></div>

              {/* Description Skeleton */}
              <div className="mt-2 space-y-1">
                <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>

              {/* See More Skeleton */}
              <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceSkeleton;
