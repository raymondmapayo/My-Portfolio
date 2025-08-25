import { CalendarOutlined, ExportOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useState } from "react";
import { FiAward } from "react-icons/fi";

// Import certificates from schema
import { certificates } from "@/schema/Home/Certificate";

const Achievements = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // No need to redeclare 'certificates', use the imported one directly

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <div className="bg-white dark:bg-gray-900 rounded-none xl:rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300 w-full">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <FiAward className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          My Achievements
        </h2>
      </div>

      {/* Responsive Grid of Certificates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {certificates.map((item: any) => (
          <div
            key={item.id}
            className="relative w-full"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Card with shadow + white background */}
            <Card
              hoverable
              className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg"
              styles={{
                body: {
                  display: "none",
                },
              }}
              cover={
                <div className="relative">
                  <img
                    alt={item.title}
                    src={item.certificateImage}
                    className="w-full h-52 object-cover rounded-lg"
                  />

                  {/* Hover Button */}
                  <div
                    className={`absolute left-2 bottom-2 z-10 transition-all duration-500 ease-in-out ${
                      hoveredId === item.id
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <Button
                      icon={<ExportOutlined />}
                      size="middle"
                      className="bg-white text-gray-700 border border-gray-300 px-3 py-1 text-sm font-medium hover:shadow-lg"
                      onClick={() => handleOpenLink(item.certificateLink)}
                    >
                      Show Credentials
                    </Button>
                  </div>
                </div>
              }
            />

            {/* Info Section (outside the shadowed card) */}
            <div className="flex items-start gap-3 mt-3">
              <img
                src={item.avatarImage}
                alt={item.title}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 whitespace-nowrap">
                  {item.title}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.organization}
                </span>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mt-1 text-xs">
                  <CalendarOutlined className="text-[10px]" />
                  <span>{item.dateIssued}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
