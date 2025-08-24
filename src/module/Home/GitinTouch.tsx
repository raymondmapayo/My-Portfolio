// frontend/src/components/GitinTouch.tsx
import GitinTouchSkeleton from "@/components/Skeleton/Home/GitinTouchSkeleton";
import { Tooltip } from "antd"; // <-- Ant Design Tooltip
import { useEffect, useState, type JSX } from "react";
import { BsMessenger } from "react-icons/bs";
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { LuMessageSquareMore } from "react-icons/lu";

// Import your schema
import { socialLinks as schemaSocialLinks } from "@/schema/Home/SocialLink";

const iconMap: Record<string, JSX.Element> = {
  Messenger: <BsMessenger />,
  Facebook: <FaFacebook />,
  GitHub: <FaGithub />,
  Email: <FaEnvelope />,
  LinkedIn: <FaLinkedin />,
};

const GitinTouch = () => {
  const [loading, setLoading] = useState(true);
  const [socialLinks] = useState(schemaSocialLinks);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <GitinTouchSkeleton />;

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md font-[Poppins] overflow-hidden mx-0 lg:mx-0 lg:mr-4 pb-10 transition-colors duration-300 min-h-[230px]">
      {/* Title */}
      <div className="flex items-center gap-2 mb-5">
        <LuMessageSquareMore className="text-gray-700 dark:text-gray-200 w-6 h-6" />
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Git in Touch
        </h1>
      </div>

      {/* Social Links + Bottom Text aligned left */}
      <div className="flex flex-col items-start gap-4">
        {/* Social Links */}
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((link) => {
            let href = link.url;

            // Hardcode Email link to your address
            if (link.platform === "Email") {
              href = "mailto:raymondmapayo@gmail.com";
            }

            return (
              <Tooltip key={link.id} title={link.platform} placement="top">
                <a
                  href={href}
                  target={link.platform === "Email" ? "_self" : "_blank"} // emails open in same window
                  rel="noopener noreferrer"
                  className="text-4xl sm:text-5xl hover:scale-110 transition-transform text-gray-800 dark:text-gray-200"
                >
                  {iconMap[link.platform] || link.platform}
                </a>
              </Tooltip>
            );
          })}
        </div>

        {/* Bottom Text */}
        <p className="text-gray-400 dark:text-gray-300 text-sm sm:text-base font-medium leading-relaxed">
          Let’s build something great together — feel free to connect with me
          through any of the platforms above.
        </p>
      </div>
    </div>
  );
};

export default GitinTouch;
