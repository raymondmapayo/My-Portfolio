import Blog from "@/module/Blogs/Blog";
import RecentBlog from "@/module/Blogs/RecentBlog";

const BlogLayouts = () => {
  return (
    <div
      className="bg-[#E6FAFD] dark:bg-gray-800
        p-0 sm:p-4 xl:p-6
        rounded-none xl:rounded-2xl
        shadow-md
        flex-1 min-w-[130px]
        flex flex-col xl:flex-row gap-6
        transition-colors duration-300
        w-full"
    >
      {/* Left Side */}
      <div className="w-full xl:w-[70%] flex flex-col gap-4">
        <Blog />
      </div>
      {/* Right Side (Optional) */}
      <div className="w-full xl:w-[30%] flex flex-col gap-4">
        <RecentBlog />
      </div>
    </div>
  );
};

export default BlogLayouts;
