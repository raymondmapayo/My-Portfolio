import MyContributionSkeleton from "@/components/Skeleton/Project/MyContributionSkeleton";
import { Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import GitHubCalendar, {
  type Activity as GHActivity,
} from "react-github-calendar";
import { FaGithub } from "react-icons/fa6";

/**
 * Use the Activity type exported by the library to avoid module/type mismatch.
 * GHActivity.level is a union type (0 | 1 | 2 | 3 | 4).
 */
type Activity = GHActivity;

const MyContribution: React.FC = () => {
  // ALL hooks must be declared before early returns
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState<number | "last">("last");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Convert count -> 0..4 (explicitly typed as union)
  const countToLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
    if (count <= 0) return 0;
    if (count <= 2) return 1;
    if (count <= 4) return 2;
    if (count <= 7) return 3;
    return 4;
  };

  /**
   * transformLastYear: accepts Activity[] and returns Activity[] (matching package type)
   * Filters to last year, maps to ensure `level` exists and is the required union.
   * If filtered is empty, return original data mapped with ensured `level`.
   */
  const transformLastYear = useCallback((data: Activity[]): Activity[] => {
    try {
      const now = new Date();
      const lastYear = new Date();
      lastYear.setFullYear(now.getFullYear() - 1);

      const mapped = data.map((item) => {
        // preserve existing level if it's already valid, otherwise compute
        const existingLevel = (item as Activity).level;
        const level: 0 | 1 | 2 | 3 | 4 =
          existingLevel === 0 ||
          existingLevel === 1 ||
          existingLevel === 2 ||
          existingLevel === 3 ||
          existingLevel === 4
            ? existingLevel
            : countToLevel(item.count);

        return {
          ...item,
          level,
        } as Activity;
      });

      const filtered = mapped.filter((item) => {
        const d = new Date(item.date);
        return d >= lastYear && d <= now;
      });

      return filtered.length > 0 ? filtered : mapped;
    } catch (e) {
      // fallback: ensure every item has level
      return data.map((item) => ({
        ...item,
        level: countToLevel(item.count),
      })) as Activity[];
    }
  }, []);

  if (loading) {
    return <MyContributionSkeleton />;
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300 w-full">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <FaGithub className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          My Contributions
        </h2>
      </div>

      {/* Calendar Wrapper */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 p-4">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
            minWidth: "900px",
          }}
          className="calendar-wrapper"
        >
          {/* GitHub Calendar */}
          <div className="flex-1 flex justify-start">
            <GitHubCalendar
              username="grubersjoe"
              year={typeof year === "number" ? year : undefined}
              blockSize={14}
              blockMargin={5}
              transformData={year === "last" ? transformLastYear : undefined}
            />
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
            {["2025", "2024", "2023", "last"].map((label) => (
              <Button
                key={label}
                type={
                  year === (label === "last" ? "last" : parseInt(label))
                    ? "primary"
                    : "default"
                }
                style={{
                  padding: "12px 30px",
                  fontSize: "16px",
                  minWidth: "150px",
                }}
                onClick={() =>
                  setYear(label === "last" ? "last" : parseInt(label))
                }
              >
                {label === "last" ? "Last Year" : label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyContribution;
