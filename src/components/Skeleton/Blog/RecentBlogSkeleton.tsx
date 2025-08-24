const RecentBlogSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-3 sm:p-5 transition-colors duration-300 max-w-full animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-6 w-40 sm:w-56 rounded bg-gray-300 dark:bg-gray-700" />
      </div>

      {/* Rows (simulate AntD table rows) */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-5">
              {/* Image placeholder */}
              <div className="relative w-36 h-28 overflow-hidden rounded-xl shadow-md">
                <div className="w-full h-full bg-gray-300 dark:bg-gray-700" />
              </div>

              {/* Date + Title placeholders */}
              <div className="flex-1">
                <div className="h-4 w-28 sm:w-32 mb-3 rounded bg-gray-300 dark:bg-gray-700" />
                <div className="space-y-2">
                  <div className="h-5 w-[75%] max-w-[400px] rounded bg-gray-300 dark:bg-gray-700" />
                  <div className="h-5 w-[55%] max-w-[320px] rounded bg-gray-300 dark:bg-gray-700" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination placeholder */}
      <div className="mt-6 flex items-center justify-end gap-2">
        <div className="h-8 w-20 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-8 w-8 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-8 w-8 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-8 w-8 rounded bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  );
};

export default RecentBlogSkeleton;
