import CertificatesSkeleton from "@/components/Skeleton/About/CertificatesSkeleton";
import { certificates as certificateData } from "@/schema/Home/Certificate"; // <-- import from schema
import { CalendarOutlined, ExportOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { FaAward } from "react-icons/fa";
import { Link } from "react-router-dom";

const Certificates = () => {
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (localLoading) return <CertificatesSkeleton />;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-none xl:rounded-2xl  shadow-md p-4 min-w-[130px]">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <FaAward className="w-5 h-5 sm:w-7 sm:h-7 text-gray-700 dark:text-gray-200" />
        <h2 className="text-base sm:text-2xl font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap">
          Certificates
        </h2>
      </div>
      {/* Certificate List */}
      <div className="space-y-4 sm:space-y-6">
        {certificateData.slice(0, 8).map((cert) => (
          <div key={cert.id} className="flex items-center gap-3 sm:gap-4">
            <img
              src={cert.avatarImage}
              alt={cert.title}
              className="w-12 h-12 sm:w-18 sm:h-18 object-cover rounded-md shadow-sm"
            />

            <div className="flex-1 flex justify-between items-start">
              <div className="flex flex-col">
                <h3 className="text-sm sm:text-[19px] font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                  {cert.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-300 text-xs sm:text-base mt-1 whitespace-nowrap">
                  {cert.organization}
                </p>

                <div className="flex items-center gap-1 sm:gap-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1 whitespace-nowrap">
                  <CalendarOutlined className="text-xs sm:text-sm" />
                  <span>{cert.dateIssued}</span>
                </div>
              </div>

              <Button
                type="default"
                icon={<ExportOutlined />}
                href={cert.certificateLink}
                target="_blank"
                className="flex items-center justify-center rounded-lg w-7 h-7 sm:w-auto sm:h-auto sm:px-4 sm:py-3 text-[10px] sm:text-base ml-2 sm:ml-0"
              >
                <span className="hidden sm:inline">Show Credentials</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Show All Link */}

      <div className="mt-5 sm:mt-6 flex justify-center">
        <Link
          to="/myachievements"
          className="flex items-center gap-1 sm:gap-2 text-blue-600 hover:underline text-sm sm:text-base whitespace-nowrap"
        >
          <ExportOutlined />
          Show All Licenses & Certificates
        </Link>
      </div>
    </div>
  );
};

export default Certificates;
