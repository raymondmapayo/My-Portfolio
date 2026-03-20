import SideBarSkeleton from "@/components/Skeleton/Home/SideBarSkeleton";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Layout, Switch } from "antd";
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
          <div className="flex flex-col h-screen">
            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col items-center">
                {/* IMAGE */}
                <div className="relative w-[120px] h-[120px] group cursor-pointer">
                  {/* DEFAULT IMAGE */}
                  <img
                    src="/maps_image.jpg"
                    alt="profile"
                    className="w-full h-full object-cover rounded-full border-2 border-gray-300 transition-none group-hover:opacity-0"
                  />

                  {/* HOVER IMAGE */}
                  <img
                    src="/act-1.jpg" // 👉 your 2nd image
                    alt="hover profile"
                    className="absolute inset-0 w-full h-full object-cover rounded-full border-2 border-gray-300 opacity-0 group-hover:opacity-100 transition-none"
                  />
                </div>

                {/* TEXT */}
                <div className="text-center mt-3">
                  <h2 className="text-gray-900 dark:text-gray-100 text-lg font-bold">
                    Raymond Mapayo
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-base mt-1">
                    Full Stack Developer
                  </p>

                  <Button
                    icon={<DownloadOutlined />}
                    href="/resume"
                    className="w-full !h-9 text-base font-semibold mt-3 md:mt-6 rounded-lg flex items-center justify-center gap-2"
                  >
                    Resume
                  </Button>
                </div>
              </div>

              {/* MENU */}
              <MenuItems />
            </div>

            {/* ✅ FIXED FOOTER */}
            <div className="pt-4 pb-6 px-2">
              {/* BOX */}
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-xl p-4 shadow-sm">
                {/* Dark Mode Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <LuSunMoon className="text-xl text-green-600 dark:text-green-300" />
                    <span className="text-green-700 dark:text-green-200 text-sm font-medium">
                      Dark Mode
                    </span>
                  </div>
                  <Switch checked={isDarkMode} onChange={toggleTheme} />
                </div>

                {/* Divider */}
                <div className="my-3 border-t border-green-200 dark:border-green-700"></div>

                {/* Footer Text */}
                <div className="text-center text-xs">
                  <p className="text-green-700 dark:text-green-300">
                    Designed & Built by Raymond Mapayo
                  </p>
                  <p className="text-green-500 dark:text-green-400">
                    © 2025 All rights reserved
                  </p>
                </div>
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
