import ExpertiseSkeleton from "@/components/Skeleton/Home/ExpertiseSkeleton";
import { Collapse } from "antd";
import { useEffect, useState } from "react";
import { FaFigma } from "react-icons/fa6";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { LuSearch } from "react-icons/lu";
import { TbBracketsAngle, TbUserSearch } from "react-icons/tb";

// Import static expertise schema
import { expertise as expertiseData } from "@/schema/Home/Expertise";

const Expertise = () => {
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (localLoading) return <ExpertiseSkeleton />;

  const expertise = expertiseData; // use schema data

  // Map icons and gradients for the first 4 items
  const iconMap = [TbBracketsAngle, HiOutlinePaintBrush, LuSearch, FaFigma];
  const gradientMap = [
    "from-[rgb(161,140,209)] to-[rgb(251,194,235)]",
    "from-[rgb(246,211,101)] to-[rgb(253,160,133)]",
    "from-[rgb(0,122,223)] to-[rgb(0,236,188)]",
    "from-[rgb(10,207,254)] to-[rgb(73,90,255)]",
  ];

  // Convert expertise items into Collapse items format
  const collapseItems = expertise.map((item, idx) => {
    const Icon = iconMap[idx % iconMap.length];
    const gradient = gradientMap[idx % gradientMap.length];

    return {
      key: item.id,
      label: (
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl bg-gradient-to-t ${gradient} flex items-center justify-center`}
          >
            <Icon className="text-white text-lg" />
          </div>
          <span className="font-semibold text-base sm:text-lg dark:text-gray-100">
            {item.title}
          </span>
        </div>
      ),
      children: (
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-[Poppins]">
          {item.description}
        </p>
      ),
    };
  });

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md font-[Poppins] mx-0 lg:mx-0 lg:mr-4 pb-10 transition-colors duration-300 h-auto">
      {/* Title */}
      <div className="flex items-center gap-2 mb-5">
        <TbUserSearch className="text-gray-700 dark:text-gray-200 w-6 h-6" />
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Expertise
        </h1>
      </div>

      {/* Collapsible Sections using items prop */}
      <Collapse
        accordion
        ghost
        expandIconPosition="end"
        className="font-[Poppins] border border-gray-200 dark:border-gray-700 rounded-lg expertise-collapse transition-all duration-300"
        items={collapseItems} // ✅ use items instead of children
      />
    </div>
  );
};

export default Expertise;
