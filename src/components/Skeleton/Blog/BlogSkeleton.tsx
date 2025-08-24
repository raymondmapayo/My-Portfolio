const BlogSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 min-w-[130px] transition-colors duration-300 animate-pulse">
      {/* Section Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-5 sm:h-7 w-24 sm:w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Featured Blog Skeleton */}
      <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden mb-6">
        <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 space-y-2">
          <div className="h-4 w-24 bg-gray-400 dark:bg-gray-600 rounded"></div>
          <div className="h-6 w-48 sm:w-64 bg-gray-400 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Other Blogs Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative h-56 sm:h-60 rounded-xl overflow-hidden"
          >
            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
            <div className="absolute bottom-3 left-3 space-y-2">
              <div className="h-3 w-20 bg-gray-400 dark:bg-gray-600 rounded"></div>
              <div className="h-5 w-32 bg-gray-400 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSkeleton;
