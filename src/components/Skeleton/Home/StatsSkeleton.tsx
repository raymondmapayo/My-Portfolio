// StatsSkeleton.tsx

const StatsSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-300 dark:bg-gray-800 rounded-2xl shadow p-5 flex flex-col min-h-[125px]"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-400 dark:bg-gray-600" />
              <div className="space-y-2 flex-1">
                <div className="h-6 w-16 bg-gray-400 dark:bg-gray-600 rounded" />
                <div className="h-4 w-12 bg-gray-400 dark:bg-gray-600 rounded" />
              </div>
            </div>
            <div className="h-5 w-3/4 bg-gray-400 dark:bg-gray-600 rounded mt-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSkeleton;
