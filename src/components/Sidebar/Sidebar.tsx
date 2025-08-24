import SideBarSkeleton from "@/components/Skeleton/Home/SideBarSkeleton";
import { DownloadOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Switch } from "antd";
import { useEffect, useRef, useState } from "react";
import { LuSunMoon } from "react-icons/lu";
import { Outlet } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import Header from "./Header";
import MenuItems from "./menuItems";
import MobileSidebar from "./mobile";

export default function SidebarLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <Layout
      style={{ minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}
      className=""
    >
      {/* Sidebar (handled in mobile.tsx) */}
      <MobileSidebar sidebarRef={sidebarRef} isSidebarOpen={isSidebarOpen}>
        {loading ? (
          <SideBarSkeleton />
        ) : (
          <div className="sticky top-4">
            <div>
              <Avatar
                size={120}
                src="/maps_image.jpg"
                style={{
                  border: "3px solid #d9d9d9",
                  display: "block",
                  marginBottom: 16,
                }}
              />
              <div className="text-center">
                <h2 className="text-gray-900 dark:text-gray-100 text-lg font-bold">
                  Raymond Mapayo
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base mt-1 pr-3">
                  Full Stack Developer
                </p>
                <Button
                  icon={<DownloadOutlined />}
                  href="/resume"
                  className="w-[100%] !h-9 text-base font-semibold mt-3 md:mt-6 rounded-lg flex items-center justify-center gap-2"
                >
                  Resume
                </Button>
              </div>

              {/* Navigation */}

              <MenuItems />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between gap-3 max-w-[240px] bg-gray-100 dark:bg-gray-700 rounded-lg px-6 py-3 cursor-pointer">
                <LuSunMoon className="text-2xl text-gray-600 dark:text-gray-200" />
                <span className="whitespace-nowrap text-gray-600 dark:text-gray-200 text-sm sm:text-base">
                  Dark Mode
                </span>
                <Switch checked={isDarkMode} onChange={toggleTheme} />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row flex-wrap justify-center text-center sm:text-left gap-1 text-xs sm:text-sm">
                <small className="text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  Designed &amp; Built by Raymond Mapayo
                </small>
                <small className="text-gray-400 dark:text-gray-400 sm:ml-2">
                  © 2025, All rights reserved.
                </small>
              </div>
            </div>
          </div>
        )}
      </MobileSidebar>

      {/* Main Content */}
      <div
        className="w-full  bg-[#F7F8FA] dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col"
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <Outlet />
      </div>
    </Layout>
  );
}
