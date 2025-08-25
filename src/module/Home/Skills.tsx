import SkillsSkeleton from "@/components/Skeleton/Home/SkillsSkeleton";
import { useEffect, useState } from "react";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaJava } from "react-icons/fa6";
import {
  SiAntdesign,
  SiBootstrap,
  SiCss3,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";
import { TbVectorBezier2 } from "react-icons/tb";

const Skills = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const row1 = [
    <SiAntdesign className="text-5xl text-orange-500" />,
    <SiBootstrap className="text-purple-500 text-5xl" />,
    <SiExpress className="text-gray-700 dark:text-gray-200 text-5xl" />,
    <SiJavascript className="text-yellow-400 text-5xl" />,
    <SiNodedotjs className="text-green-500 text-5xl" />,
    <SiReact className="text-blue-400 text-5xl" />,
    <SiFigma className="text-pink-500 text-5xl" />,
    <SiMysql className="text-blue-600 text-5xl" />,
    <FaJava className="text-red-600 text-5xl" />,
  ];

  const row2 = [
    <SiPhp className="text-indigo-500 text-5xl" />,
    <SiVite className="text-purple-400 text-5xl" />,
    <SiGithub className="text-gray-800 dark:text-gray-200 text-5xl" />,
    <SiHtml5 className="text-orange-500 text-5xl" />,
    <SiCss3 className="text-blue-500 text-5xl" />,
    <BiLogoVisualStudio className="text-blue-500 text-5xl" />,
    <SiDocker className="text-blue-500 text-5xl" />,
    <SiTailwindcss className="text-teal-400 text-5xl" />,
  ];

  const scrollingRow1 = [...row1, ...row1, ...row1, ...row1];
  const scrollingRow2 = [...row2, ...row2, ...row2, ...row2];

  const [pausedRow1, setPausedRow1] = useState(false);
  const [pausedRow2, setPausedRow2] = useState(false);
  if (loading) return <SkillsSkeleton />;
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-none xl:rounded-2xl shadow-md font-[Poppins] overflow-hidden mx-0 lg:mx-0 lg:mr-4 pb-10 transition-colors duration-300 min-h-[215px]">
      {/* Title */}
      <div className="flex items-center gap-2 mb-5">
        <TbVectorBezier2 className="text-gray-700 dark:text-gray-200 w-6 h-6" />
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Skills Set
        </h1>
      </div>

      {/* Two Continuous Scrolling Rows */}
      <div className="space-y-6">
        {/* Row 1 - Left */}
        <div
          className="fade-mask relative w-full overflow-hidden"
          onMouseEnter={() => setPausedRow1(true)}
          onMouseLeave={() => setPausedRow1(false)}
        >
          <div
            className={`flex super-loop-left ${
              pausedRow1 ? "pause-animation" : ""
            }`}
          >
            {scrollingRow1.map((icon, idx) => (
              <div
                key={`row1-${idx}`}
                className="flex justify-center items-center min-w-[88px]"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right */}
        <div
          className="fade-mask relative w-full overflow-hidden"
          onMouseEnter={() => setPausedRow2(true)}
          onMouseLeave={() => setPausedRow2(false)}
        >
          <div
            className={`flex super-loop-right ${
              pausedRow2 ? "pause-animation" : ""
            }`}
          >
            {scrollingRow2.map((icon, idx) => (
              <div
                key={`row2-${idx}`}
                className="flex justify-center items-center min-w-[88px]"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
