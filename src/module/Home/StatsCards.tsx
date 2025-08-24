// frontend/src/components/StatsCards.tsx
import AnimatedNumber from "@/components/Animate/AnimatedNumber";
import StatsSkeleton from "@/components/Skeleton/Home/StatsSkeleton";

import { useEffect, useState } from "react";
import { CgTime } from "react-icons/cg";
import { FiAward } from "react-icons/fi";
import { LuChartSpline, LuFolderGit2 } from "react-icons/lu";
import { TbBracketsAngle } from "react-icons/tb";

// Import stats from schema
import { statsData } from "@/schema/Home/StatsCards";

const StatsCards = () => {
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const loading = localLoading;
  if (loading) return <StatsSkeleton />;

  const row = statsData?.[0] ?? null;
  const experienceYears = row?.experienceYears ?? 0;
  const certificates = row?.certificates ?? 0;
  const projects = row?.projects ?? 0;
  const technologies = row?.technologies ?? 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <LuChartSpline className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Career Stats
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Experience */}
        <div className="group bg-gray-300 dark:bg-gray-800 hover:bg-[rgb(0,51,102)] transition-colors duration-300 rounded-2xl shadow p-5 flex flex-col min-h-[125px]">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-t from-[rgb(161,140,209)] to-[rgb(251,194,235)] flex items-center justify-center">
              <CgTime className="text-[2.2rem] text-white group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-black dark:text-white group-hover:text-white">
                <AnimatedNumber target={experienceYears} />
              </span>
              <span className="text-base font-normal text-gray-500 dark:text-gray-300 group-hover:text-white">
                Years
              </span>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-300 text-[19px] text-base font-medium mt-auto group-hover:text-white transition-colors duration-300">
            Experience
          </p>
        </div>

        {/* Certificates */}
        <div className="group bg-gray-300 dark:bg-gray-800 hover:bg-[rgb(0,51,102)] transition-colors duration-300 rounded-2xl shadow p-5 flex flex-col min-h-[125px]">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[rgb(246,211,101)] to-[rgb(253,160,133)] flex items-center justify-center">
              <FiAward className="text-[2rem] text-white group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="text-3xl font-bold text-black dark:text-white group-hover:text-white">
              <AnimatedNumber target={certificates} />
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-300 text-[19px] text-base font-medium mt-auto group-hover:text-white transition-colors duration-300">
            Certificates
          </p>
        </div>

        {/* Projects */}
        <div className="group bg-gray-300 dark:bg-gray-800 hover:bg-[rgb(0,51,102)] transition-colors duration-300 rounded-2xl shadow p-5 flex flex-col min-h-[125px]">
          <div className=" flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-t from-[rgb(0,122,223)] to-[rgb(0,236,188)] flex items-center justify-center">
              <LuFolderGit2 className="text-[2rem] text-white group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="text-3xl font-bold text-black dark:text-white group-hover:text-white">
              <AnimatedNumber target={projects} />
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-300 text-[19px] text-base font-medium mt-auto group-hover:text-white transition-colors duration-300">
            Projects
          </p>
        </div>

        {/* Technologies */}
        <div className="group bg-gray-300 dark:bg-gray-800 hover:bg-[#003366] transition-colors duration-300 rounded-2xl shadow p-5 flex flex-col min-h-[125px]">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-l from-[rgb(10,207,254)] to-[rgb(73,90,255)] flex items-center justify-center">
              <TbBracketsAngle className="text-[2rem] text-white group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="text-3xl font-bold text-black dark:text-white group-hover:text-white">
              <AnimatedNumber target={technologies} />
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-300 text-[19px] text-base font-medium mt-auto group-hover:text-white transition-colors duration-300">
            Technologies
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
