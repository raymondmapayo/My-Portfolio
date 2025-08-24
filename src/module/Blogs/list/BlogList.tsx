import ListBlogSkeleton from "@/components/Skeleton/Blog/ListBlogSkeleton";
import GitinTouch from "@/module/Home/GitinTouch";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import RecentBlog from "../RecentBlog";

// Import blogs directly from schema
import myBlogData from "@/schema/MyBlog/MyBlog";

const BlogsSinglePage = () => {
  const { id } = useParams(); // use id from route
  const navigate = useNavigate();

  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Find blog by ID from schema data
  const blog = myBlogData.find((b) => String(b.id) === String(id));
  const loading = false; // No hook loading

  if (loading || localLoading) return <ListBlogSkeleton />;

  if (!blog) {
    return (
      <div className="text-red-500 text-lg font-medium p-6">
        Blog not found.
      </div>
    );
  }
  return (
    <div className="flex flex-col xl:flex-row gap-6 p-4">
      {/* Left Section */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 transition-colors duration-300">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 text-gray-700 dark:text-gray-100 hover:border-[#1890ff] hover:text-[#1890ff] transition-colors duration-300 mb-2 bg-transparent"
          >
            <IoArrowBackSharp className="text-lg" />
          </button>

          {/* Title */}
          <h2 className="text-base sm:text-2xl font-bold text-gray-800 dark:text-gray-100 whitespace-normal mb-2">
            {blog.title}
          </h2>

          {/* Date */}
          <div className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
            <FaRegCalendarAlt className="text-gray-400" />
            <span>
              {blog.date}, {blog.time}
            </span>
          </div>

          {/* Main Image */}
          {blog.image && (
            <div className="relative w-full h-72 sm:h-96 lg:h-[500px] rounded-xl overflow-hidden mb-4">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover object-top rounded-xl"
                loading="lazy"
              />
            </div>
          )}

          {/* ContentBlocks in order */}
          <div className="flex flex-col gap-4">
            {blog.contentBlocks.map((block: any, index: number) => {
              if (block.type === "text") {
                const processedText = block.text.split(
                  /(YouTube|Google|XAMPP|full-stack developer|University of Mindanao|HackerRank)/g
                );

                return (
                  <p
                    key={index}
                    className="text-gray-700 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line"
                  >
                    {processedText.map((part: string, idx: number) => {
                      if (part === "YouTube") {
                        return (
                          <a
                            key={idx}
                            href="https://www.youtube.com/watch?v=7S_tz1z_5bA&ab_channel=ProgrammingwithMosh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500"
                          >
                            {part}
                          </a>
                        );
                      } else if (part === "Google") {
                        return (
                          <a
                            key={idx}
                            href="https://www.outrightcrm.com/blog/crud-operations-mysql-xampp-phpmyadmin/#section-7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500"
                          >
                            {part}
                          </a>
                        );
                      } else if (part === "full-stack developer") {
                        return (
                          <a
                            key={idx}
                            href="https://www.w3schools.com/whatis/whatis_fullstack.asp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500"
                          >
                            {part}
                          </a>
                        );
                      } else if (part === "University of Mindanao") {
                        return (
                          <a
                            key={idx}
                            href="https://www.umindanao.edu.ph/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500"
                          >
                            {part}
                          </a>
                        );
                      } else if (part === "HackerRank") {
                        return (
                          <a
                            key={idx}
                            href="https://www.hackerrank.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500"
                          >
                            {part}
                          </a>
                        );
                      } else if (part === "XAMPP") {
                        return (
                          <a
                            key={idx}
                            href="https://www.apachefriends.org/index.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500"
                          >
                            {part}
                          </a>
                        );
                      } else {
                        return part;
                      }
                    })}
                  </p>
                );
              } else if (block.type === "image") {
                return (
                  <div
                    key={index}
                    className="relative w-full rounded-xl overflow-hidden mb-4"
                  >
                    <img
                      src={block.src}
                      alt={block.alt || "Blog image"}
                      className="w-full h-full object-cover object-top rounded-xl"
                      loading="lazy"
                    />
                  </div>
                );
              } else if (block.type === "video") {
                return (
                  <div
                    key={index}
                    className="relative w-full mb-4 rounded-xl overflow-hidden bg-black"
                    style={{ paddingTop: "60.25%" }} // maintains 16:9 aspect ratio; remove or change if your video has different ratio
                  >
                    <video
                      src={block.src}
                      poster={block.poster || "/video-poster.jpg"}
                      controls
                      playsInline
                      className="absolute inset-0 w-full h-full object-contain rounded-xl"
                    />
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <RecentBlog /> {/* just render your existing component */}
        <GitinTouch />
      </div>
    </div>
  );
};

export default BlogsSinglePage;
