import { DownloadOutlined } from "@ant-design/icons";
import { FaFolderOpen } from "react-icons/fa6";

const Resume = () => {
  return (
    <div className="flex flex-col p-4 gap-4 bg-[#E6FAFD] dark:bg-gray-800 min-h-screen rounded-2xl transition-colors duration-300 relative">
      {/* Section Title */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <FaFolderOpen className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Resume
          </h2>
        </div>

        {/* Custom Download Button */}
        <a
          href="/Mapayo-Raymond.pdf"
          download="Raymond_Mapayo_Resume.pdf"
          className="flex items-center gap-2 px-4 py-2 border border-gray-700 dark:border-gray-200 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <DownloadOutlined />
          Download
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="w-full overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700">
        <iframe
          src="/Mapayo-Raymond.pdf#toolbar=0&navpanes=0&scrollbar=0"
          className="w-full min-h-[70vh] sm:min-h-[80vh] md:min-h-[85vh]"
          title="My Resume"
        />
      </div>
    </div>
  );
};

export default Resume;
