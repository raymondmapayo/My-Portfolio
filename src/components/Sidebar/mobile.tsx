// mobile.tsx
import { Layout } from "antd";
import type { ReactNode, RefObject } from "react";
import { useEffect, useState } from "react";

const { Sider } = Layout;

interface MobileSidebarProps {
  sidebarRef: RefObject<HTMLDivElement | null>;
  isSidebarOpen: boolean;
  children: ReactNode;
}

export default function MobileSidebar({
  sidebarRef,
  isSidebarOpen,
  children,
}: MobileSidebarProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const className = `bg-slate-50 dark:bg-gray-900 rounded-2xl shadow-md p-4
    flex flex-col transition-transform duration-300
    ${isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
    ${isMobile ? "fixed z-50 left-0 top-0" : ""}`;

  return (
    <Sider
      ref={sidebarRef as any}
      width={250}
      className={className}
      style={{
        height: "100vh",
        overflow: "visible",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {children}
    </Sider>
  );
}
