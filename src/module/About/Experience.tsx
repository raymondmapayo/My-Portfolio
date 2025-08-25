import ExperienceSkeleton from "@/components/Skeleton/About/ExperienceSkeleton";
import { useEffect, useState } from "react"; // Only for skeleton delay

import experienceData from "@/schema/About/Experirence";
import { CalendarOutlined } from "@ant-design/icons";
import { FaUserCheck } from "react-icons/fa";

const Experience = () => {
  const [loading, setLoading] = useState(true);

  // Simulate skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <ExperienceSkeleton />;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-none xl:rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300 max-w-full">
      {/* Title */}
      <div className="flex items-center gap-2 mb-5">
        <FaUserCheck className="w-6 h-6 text-gray-700 dark:text-gray-200 ml-2" />
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Experience
        </h1>
      </div>

      {/* Experience List */}
      <ul className="space-y-6">
        {experienceData.map((section, idx) => (
          <li
            key={section.id}
            className="flex flex-wrap sm:flex-nowrap items-start gap-4"
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md shadow-sm flex-shrink-0"
            />

            <div className="flex-1">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                {section.title}
              </h1>

              <span className="block text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                {section.business}
              </span>
              <span className="block text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                {section.location}
              </span>

              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mt-1">
                <CalendarOutlined />
                <span>{section.date}</span>
              </div>

              {/* Checkbox hack for toggling details */}
              <input
                type="checkbox"
                id={`toggleExp${idx}`}
                className="hidden peer"
              />
              <div className="mt-3 text-gray-700 dark:text-gray-300 text-xs sm:text-sm transition-all duration-500 ease-in-out overflow-hidden max-h-12 peer-checked:max-h-96 opacity-80 peer-checked:opacity-100">
                {section.details.map((text, i) => (
                  <p key={i} className={`${i > 0 ? "mt-2" : ""}`}>
                    {text}
                  </p>
                ))}
              </div>

              <label
                htmlFor={`toggleExp${idx}`}
                className="text-blue-600 hover:underline mt-2 text-xs sm:text-sm md:text-base font-medium block cursor-pointer"
              >
                <span className="peer-checked:hidden">See More</span>
                <span className="hidden peer-checked:inline">See Less</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Experience;
