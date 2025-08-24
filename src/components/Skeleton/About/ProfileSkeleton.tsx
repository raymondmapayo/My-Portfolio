const ProfileSkeleton = () => {
  return (
    <div className="relative flex flex-col rounded-xl overflow-hidden shadow-md animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="h-28 sm:h-36 lg:h-44 bg-gray-300 dark:bg-gray-700 w-full"></div>

      {/* Profile Image Skeleton */}
      <div className="absolute top-[calc(50%-4rem)] left-4 sm:left-6 w-28 h-28 sm:w-32 sm:h-32 lg:w-35 lg:h-35 rounded-full border-4 border-white object-cover shadow-lg"></div>

      {/* Info Skeleton */}
      <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 lg:h-44 w-full flex flex-col justify-center">
        <div className="flex items-center gap-4 ml-32 sm:ml-35">
          <div className="flex flex-col gap-2 w-full">
            <div className="h-6 w-32 sm:w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-24 sm:w-36 bg-gray-300 dark:bg-gray-700 rounded mt-1"></div>
            <div className="h-9 w-36 sm:w-44 bg-gray-300 dark:bg-gray-700 rounded mt-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
