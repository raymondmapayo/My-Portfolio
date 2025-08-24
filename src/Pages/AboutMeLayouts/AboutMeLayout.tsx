import ProfileSkeleton from "@/components/Skeleton/About/ProfileSkeleton";
import AboutMe from "@/module/About/AboutMe";
import Certificates from "@/module/About/Certificates";
import Education from "@/module/About/Education";
import Experience from "@/module/About/Experience";
import Features from "@/module/Home/Features";
import GitinTouch from "@/module/Home/GitinTouch";
import { SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import ModalMessage from "./AboutModal/ModalMessage";

const AboutMeLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-2xl bg-[#E6FAFD] dark:bg-gray-800 p-4 flex-1 min-w-[130px]  flex flex-col xl:flex-row gap-4 transition-colors duration-300">
      {/* Left Side */}
      <div className="w-full xl:w-[52%] flex flex-col gap-4">
        {/* Hero/Profile */}
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <div className="relative flex flex-col rounded-xl overflow-hidden shadow-md">
            <div className="h-28 sm:h-36 lg:h-44 bg-[url('/design.jpg')] bg-cover bg-center w-full"></div>
            <img
              src="/maps_image.jpg"
              alt="Profile"
              className="absolute top-[calc(50%-4rem)] left-4 sm:left-6 w-28 h-28 sm:w-32 sm:h-32 lg:w-35 lg:h-35 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 lg:h-44 w-full flex flex-col justify-center">
              <div className="flex items-center gap-4 ml-32 sm:ml-35">
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100 ">
                    Raymond Mapayo
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1 dark:bg-gray-900">
                    Full Stack Developer
                  </p>
                  <Button
                    size="middle"
                    icon={
                      <SendOutlined className="transform -rotate-45 text-lg" />
                    }
                    className="mt-3 w-36 h-9 text-base font-semibold flex items-center justify-center"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <AboutMe />
        <Features />
        <Certificates />
      </div>

      {/* Right Side */}
      <div className="w-full xl:w-5/6 flex flex-col gap-4">
        <Education />
        <Experience />
        <GitinTouch />
      </div>

      {/* Modal */}
      <ModalMessage open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AboutMeLayout;
