import HeroBannerSkeleton from "@/components/Skeleton/Home/HeroBannerSkeleton";
import TodayDate from "@/components/TodayDate/TodayDate";
import Expertise from "@/module/Home/Expertise";
import Features from "@/module/Home/Features";
import GitinTouch from "@/module/Home/GitinTouch";
import Skills from "@/module/Home/Skills";
import StatsCards from "@/module/Home/StatsCards";
import { useEffect, useRef, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import Typed from "typed.js";

const Home = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const [loading, setLoading] = useState(true);

  // Initialize Typed.js only after loading is false
  useEffect(() => {
    if (loading || !typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: [
        "Welcome to My Codebase",
        "Deploying Ideas Into Reality",
        "Engineering Pixels with Purpose",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: "_",
    });

    return () => {
      typed.destroy();
    };
  }, [loading]);

  // Simulate skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="
        w-full
        bg-[#E6FAFD] dark:bg-gray-800
        transition-colors duration-300

        /* mobile: full edge-to-edge */
        p-0 rounded-none

        /* restore padding and  corners on xl */
        xl:p-4 xl:rounded-2xl

        /* layout */
        flex-1 flex flex-col xl:flex-row gap-4
    pb-8 
      "
    >
      {/* Left Side */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        {/* Hero Section */}
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          {loading ? (
            <HeroBannerSkeleton />
          ) : (
            <div className="relative flex-1 min-w-[250px] h-64 sm:h-80 lg:h-96 rounded-none xl:rounded-xl overflow-hidden bg-[url('/design.jpg')] bg-cover bg-center">
              <img
                src="/design.jpg"
                alt="Design"
                className="w-full h-full object-cover rounded-none xl:rounded-xl"
              />

              {/* Date */}
              <div className="absolute top-6 left-6 sm:top-10 sm:left-10 text-gray-100 dark:text-gray-300 text-base sm:text-lg font-bold flex items-center gap-2">
                <CiCalendarDate className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-gray-300" />
                <TodayDate />
              </div>

              {/* Typed Text */}
              <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-6 text-slate-200 dark:text-gray-100 text-lg sm:text-2xl font-bold px-3 py-2 rounded-none xl:rounded-md akira-font">
                <span ref={typedRef} className="inline-block"></span>
              </div>
            </div>
          )}
        </div>

        {/* Stats & Features */}
        <StatsCards />
        <Features />
      </div>

      {/* Right Side */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <Skills />
        <Expertise />
        <GitinTouch />
      </div>
    </div>
  );
};

export default Home;
