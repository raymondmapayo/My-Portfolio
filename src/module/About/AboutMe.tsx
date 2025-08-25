import AboutMeSkeleton from "@/components/Skeleton/About/AboutMeSkeleton";
import aboutMeData from "@/schema/About/aboutMeData";
import { useEffect, useState } from "react";
import { FaUserCheck } from "react-icons/fa";

const AboutMe = () => {
  const [localLoading, setLocalLoading] = useState(true);

  // Simulate a loading delay for skeleton
  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (localLoading) return <AboutMeSkeleton />;

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-none xl:rounded-2xl  shadow-md p-4 min-w-[130px] 
        transition-all duration-500 ease-in-out`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaUserCheck className="w-6 h-6 text-gray-700 dark:text-gray-200 ml-2" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          About Me
        </h2>
      </div>

      {/* Checkbox hack for toggling */}
      <input type="checkbox" id="toggleAbout" className="hidden peer" />

      {/* About Content */}
      <div
        className={`text-gray-700 dark:text-gray-300 text-base leading-relaxed text-left space-y-4 overflow-hidden max-h-[90px] transition-all duration-500 ease-in-out peer-checked:max-h-[1000px]`}
      >
        {aboutMeData.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* "See More" / "See Less" */}
      <div className="mt-4">
        <label
          htmlFor="toggleAbout"
          className="text-blue-600 hover:underline cursor-pointer text-sm sm:text-base font-medium"
        >
          <span className="peer-checked:hidden">See More</span>
          <span className="hidden peer-checked:inline">See Less</span>
        </label>
      </div>
    </div>
  );
};

export default AboutMe;
