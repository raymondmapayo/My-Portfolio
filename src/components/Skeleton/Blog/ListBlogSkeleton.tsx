import React from "react";
// If you already created a RecentBlogSkeleton, you can import and use it below
// import RecentBlogSkeleton from "../RecentBlog/RecentBlogSkeleton";

const ListBlogSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 p-4">
      {/* Left Section */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 transition-colors duration-300 animate-pulse">
          {/* Back Button */}
          <div className="flex items-center mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700" />
          </div>

          {/* Title */}
          <div className="space-y-2 mb-3">
            <div className="h-6 sm:h-7 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-6 sm:h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>

          {/* Content Blocks (text + image patterns to mimic your contentBlocks) */}
          <div className="flex flex-col gap-4">
            {/* Paragraph */}
            <div className="space-y-2">
              <div className="h-4 w-[95%] bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 w-[92%] bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 w-[80%] bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 w-[70%] bg-gray-300 dark:bg-gray-700 rounded" />
            </div>

            {/* Image */}
            <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden">
              <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-xl" />
            </div>

            {/* Paragraph */}
            <div className="space-y-2">
              <div className="h-4 w-[90%] bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 w-[85%] bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 w-[60%] bg-gray-300 dark:bg-gray-700 rounded" />
            </div>

            {/* Optional smaller image */}
            <div className="relative w-full h-48 sm:h-60 rounded-xl overflow-hidden">
              <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-xl" />
            </div>

            {/* Paragraph */}
            <div className="space-y-2">
              <div className="h-4 w-[88%] bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 w-[76%] bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* If you have RecentBlogSkeleton, use it here.
            Otherwise, this lightweight placeholder matches the card feel. */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-3 sm:p-5 transition-colors duration-300 animate-pulse">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-6 w-40 sm:w-56 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl p-2 sm:p-3">
                <div className="flex items-center gap-5">
                  <div className="relative w-36 h-28 overflow-hidden rounded-xl">
                    <div className="w-full h-full bg-gray-300 dark:bg-gray-700" />
                  </div>
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

          {/* Pagination hint */}
          <div className="mt-6 flex items-center justify-end gap-2">
            <div className="h-8 w-20 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-8 w-8 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-8 w-8 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-8 w-8 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>

        {/* Git in Touch skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 transition-colors duration-300 animate-pulse">
          <div className="h-6 w-36 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
          <div className="space-y-3">
            <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-24 w-full bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBlogSkeleton;
