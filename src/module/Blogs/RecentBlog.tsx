import RecentBlogSkeleton from "@/components/Skeleton/Blog/RecentBlogSkeleton";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { Link } from "react-router-dom";

// Import blogs directly from schema
import myBlogData from "@/schema/MyBlog/MyBlog";

interface RecentPost {
  key: string;
  id: string;
  image: string;
  date: string;
  title: string;
}

const RecentBlog = () => {
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const blogs = myBlogData; // Use schema data
  const loading = false; // No hook loading

  if (loading || localLoading) return <RecentBlogSkeleton />;

  const recentPosts: RecentPost[] = blogs.map((blog: any) => {
    let imageSrc = "/fallback.jpg";

    if (Array.isArray(blog.image) && blog.image.length > 0) {
      const first = blog.image[0];
      imageSrc =
        typeof first === "string"
          ? first
          : (first?.url ?? first?.src ?? imageSrc);
    } else if (typeof blog.image === "object" && blog.image !== null) {
      imageSrc =
        blog.image.url ?? blog.image.src ?? blog.image.thumbnail ?? imageSrc;
    } else if (typeof blog.image === "string" && blog.image.trim() !== "") {
      imageSrc = blog.image;
    }

    return {
      key: String(blog.id),
      id: String(blog.id),
      image: imageSrc,
      date: blog.date ?? "",
      title: blog.title ?? "",
    };
  });

  const columns: ColumnsType<RecentPost> = [
    {
      title: "Post",
      key: "post",
      render: (_, record) => (
        <Link to={`/myblog/${record.id}`} className="block w-full">
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5 w-full">
            {/* Responsive thumbnail (kept flex-shrink-0) */}
            <div
              className="relative w-24 h-20 sm:w-28 sm:h-20 md:w-36 md:h-28 overflow-hidden rounded-xl shadow-md group flex-shrink-0 bg-gray-100 dark:bg-gray-800"
              aria-hidden
            >
              <img
                src={record.image}
                alt={record.title}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.dataset.fallbackApplied) {
                    target.src = "/fallback.jpg";
                    target.dataset.fallbackApplied = "true";
                  }
                }}
                loading="lazy"
              />
            </div>

            {/* Date and Multi-line Title */}
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300 text-xs sm:text-sm mb-1 min-w-0">
                <FaRegCalendarAlt className="w-4 h-4 flex-shrink-0" />
                <span className="truncate max-w-full">{record.date}</span>
              </div>

              {/* Single-line truncate on xs; 2-line clamp on sm+; keep shrink */}
              <h3
                className="text-gray-800 dark:text-gray-100 font-semibold text-sm sm:text-base md:text-lg min-w-0
                           whitespace-nowrap sm:whitespace-normal
                           truncate sm:line-clamp-2 break-words
                           max-w-[160px] sm:max-w-[260px] md:max-w-[400px]"
              >
                {record.title}
              </h3>
            </div>
          </div>
        </Link>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-3 sm:p-5 transition-colors duration-300 max-w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <GiAnticlockwiseRotation className="text-gray-700 dark:text-gray-200 w-6 h-6" />
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
          My Recent Posts
        </h1>
      </div>

      {/* Table */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={recentPosts}
        pagination={{ pageSize: 4 }}
        showHeader={false}
        rowClassName={() =>
          "hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        }
        className="dark:bg-gray-900 dark:text-gray-100"
      />
    </div>
  );
};

export default RecentBlog;
