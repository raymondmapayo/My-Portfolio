const CertificatesSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 min-w-[130px] animate-pulse">
      {/* Section Header Skeleton */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-5 h-5 sm:w-7 sm:h-7 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="h-6 w-32 sm:w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Certificate List Skeleton */}
      <div className="space-y-4 sm:space-y-6">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-3 sm:gap-4">
            {/* Avatar Skeleton */}
            <div className="w-12 h-12 sm:w-18 sm:h-18 bg-gray-300 dark:bg-gray-700  sm:w-18 sm:h-18 object-cover rounded-md shadow-sm"></div>

            {/* Text Skeleton */}
            <div className="flex-1 flex justify-between items-start">
              <div className="flex flex-col flex-1 gap-1">
                <div className="h-4 w-32 sm:w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-24 sm:w-36 bg-gray-300 dark:bg-gray-700 rounded mt-1"></div>
                <div className="h-3 w-20 sm:w-28 bg-gray-300 dark:bg-gray-700 rounded mt-1"></div>
              </div>

              {/* Button Skeleton */}
              <div className="w-7 h-7 sm:w-24 sm:h-8 bg-gray-300 dark:bg-gray-700 rounded-lg ml-2 sm:ml-0 "></div>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Skeleton */}
      <div className="mt-5 sm:mt-6 flex justify-center">
        <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default CertificatesSkeleton;
