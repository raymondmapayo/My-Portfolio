import ImageSlider from "@/components/ImageSlider/ImageSlider";
import FeaturesSkeleton from "@/components/Skeleton/Home/FeaturesSkeleton";
import myBlogData from "@/schema/MyBlog/MyBlog";

import { ClockCircleOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { LuPin } from "react-icons/lu";
import { Link } from "react-router-dom";

const Features = () => {
  const [localLoading, setLocalLoading] = useState(true);
  const blogs = myBlogData;

  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 2000); // 2s skeleton
    return () => clearTimeout(timer);
  }, []);

  if (localLoading) return <FeaturesSkeleton />;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-none xl:rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <LuPin className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Features
        </h2>
      </div>

      {/* Slider with full cards */}
      <ImageSlider
        slidesToShow={3}
        slides={blogs.map((blog) => (
          <Link to={`/myblog/${blog.id}`} key={blog.id} className="block">
            <Card
              hoverable
              className="rounded-2xl overflow-hidden shadow-md font-[Poppins] bg-white dark:bg-gray-800 transition-colors duration-300"
              cover={
                <img
                  alt={blog.title}
                  src={blog.image}
                  className="h-48 w-full object-cover rounded-t-2xl"
                />
              }
            >
              <div className="flex flex-col items-start text-left">
                <h3
                  className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate whitespace-nowrap overflow-hidden w-full"
                  title={blog.title}
                >
                  {blog.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300 text-sm mt-1">
                  <ClockCircleOutlined className="text-gray-400 dark:text-gray-300" />
                  <span>{blog.date}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      />
    </div>
  );
};

export default Features;
