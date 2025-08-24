import React from "react";

const MyContributionSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 w-full">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
        <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Calendar Wrapper */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 p-4">
        <div
          className="calendar-wrapper"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
            minWidth: "900px",
          }}
        >
          {/* Calendar Grid */}
          <div className="flex-1 flex justify-start">
            <div className="flex gap-[5px]">
              {Array.from({ length: 52 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[5px]">
                  {Array.from({ length: 7 }).map((_, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="w-3.5 h-3.5 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Year Buttons */}
          <div
            className="flex flex-col gap-3"
            style={{
              alignItems: "flex-start",
              marginRight: "200px",
              marginTop: "20px",
            }}
          >
            {["2025", "2024", "2023", "last"].map((_, i) => (
              <div
                key={i}
                className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyContributionSkeleton;
