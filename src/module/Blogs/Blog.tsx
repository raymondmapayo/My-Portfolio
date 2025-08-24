import BlogSkeleton from "@/components/Skeleton/Blog/BlogSkeleton";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

// Import blogs directly from schema
import myBlogData from "@/schema/MyBlog/MyBlog";

const MyBlogs = () => {
  const [localLoading, setLocalLoading] = useState(true);

  // Simulate a delay for skeleton
  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const blogs = myBlogData; // Use schema data
  const loading = false; // No hook loading
  const error = null; // No hook error

  if (loading || localLoading) return <BlogSkeleton />;

  if (error) return <div className="text-red-500">Error loading blogs</div>;

  // Featured blog: take the first featured or fallback to the first blog
  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];

  // Other blogs: exclude featured and take first 2
  const otherBlogs = blogs.filter((b) => b.id !== featuredBlog.id).slice(0, 2);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 min-w-[130px] transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <FaRegPenToSquare className="w-5 h-5 sm:w-7 sm:h-7 text-gray-700 dark:text-gray-100" />
        <h2 className="text-base sm:text-2xl font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap">
          My Blogs
        </h2>
      </div>

      {/* Featured Blog (Top Big Card) */}
      {featuredBlog && (
        <Link to={`/myblog/${featuredBlog.id}`} className="block mb-6">
          <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden group">
            <img
              src={featuredBlog.image}
              alt={featuredBlog.title}
              className="w-full h-full object-cover object-[center_20%] rounded-xl transform transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white dark:text-gray-100 space-y-1">
              <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-300 dark:text-gray-300">
                <FaRegCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 dark:text-gray-300" />
                <span>{featuredBlog.date}</span>
              </div>
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold leading-snug max-w-md block overflow-hidden text-ellipsis whitespace-nowrap">
                {featuredBlog.title}
              </h1>
            </div>
          </div>
        </Link>
      )}

      {/* Other Blogs (Cards Below) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {otherBlogs.map((blog) => (
          <Link to={`/myblog/${blog.id}`} key={blog.id} className="block">
            <div className="relative h-56 sm:h-60 rounded-xl overflow-hidden group">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white dark:text-gray-100 space-y-1">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 dark:text-gray-300">
                  <FaRegCalendarAlt className="w-3 h-3 text-gray-300 dark:text-gray-300" />
                  <span>{blog.date}</span>
                </div>
                <h2 className="text-sm sm:text-base font-semibold leading-snug max-w-[200px] block overflow-hidden text-ellipsis whitespace-nowrap">
                  {blog.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
