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

  // ✅ highlight state for clicked item
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!id) return;
    if (localLoading) return;

    const hash = window.location.hash;
    const targetId = hash ? hash.slice(1) : "top";
    const el = document.getElementById(targetId);

    if (el) {
      el.scrollIntoView({ behavior: "auto", block: "start" });
    } else {
      const t = setTimeout(() => {
        const el2 = document.getElementById(targetId);
        if (el2) el2.scrollIntoView({ behavior: "auto", block: "start" });
      }, 50);
      return () => clearTimeout(t);
    }

    // flash highlight
    setFlash(true);
    const tf = setTimeout(() => setFlash(false), 1200);
    return () => clearTimeout(tf);
  }, [id, localLoading]);

  // Find blog by ID from schema data
  const blog = myBlogData.find((b) => String(b.id) === String(id));

  // Show skeleton if still loading
  if (localLoading) return <ListBlogSkeleton />;

  if (!blog) {
    return (
      <div className="text-red-500 text-lg font-medium p-6">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="  bg-[#E6FAFD] dark:bg-gray-800 flex flex-col xl:flex-row gap-6 xl:p-4 w-full">
      {/* ✅ anchor target at the very top */}
      <div id="top" style={{ scrollMarginTop: "64px" }} />

      {/* Left Section */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        <div
          className={`bg-white dark:bg-gray-900 rounded-none xl:rounded-2xl shadow-md p-4 transition-colors duration-300
            ${flash ? "bg-gray-100 dark:bg-gray-800" : ""} 
            xl:-ml-6`} // <-- responsive left shift
        >
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
                      if (
                        [
                          "YouTube",
                          "Google",
                          "XAMPP",
                          "full-stack developer",
                          "University of Mindanao",
                          "HackerRank",
                        ].includes(part)
                      ) {
                        const links: Record<string, string> = {
                          YouTube:
                            "https://www.youtube.com/watch?v=7S_tz1z_5bA&ab_channel=ProgrammingwithMosh",
                          Google:
                            "https://www.outrightcrm.com/blog/crud-operations-mysql-xampp-phpmyadmin/#section-7",
                          "full-stack developer":
                            "https://www.w3schools.com/whatis/whatis_fullstack.asp",
                          "University of Mindanao":
                            "https://www.umindanao.edu.ph/",
                          HackerRank: "https://www.hackerrank.com/",
                          XAMPP: "https://www.apachefriends.org/index.html",
                        };
                        return (
                          <a
                            key={idx}
                            href={links[part]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500"
                          >
                            {part}
                          </a>
                        );
                      }
                      return part;
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
                    style={{ paddingTop: "60.25%" }}
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
        <RecentBlog />
        <GitinTouch />
      </div>
    </div>
  );
};

export default BlogsSinglePage;
