const HeroBannerSkeleton = () => {
  return (
    <div className="relative flex-1 min-w-[250px] h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden bg-gray-300 dark:bg-gray-700 animate-pulse">
      {/* Skeleton for date */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 w-24 h-5 bg-gray-400 rounded-md"></div>

      {/* Skeleton for typed text */}
      <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-6 w-48 h-6 sm:h-8 bg-gray-400 rounded-md"></div>
    </div>
  );
};

export default HeroBannerSkeleton;
