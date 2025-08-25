import MyProjectSkeleton from "@/components/Skeleton/Project/MyProjectSkeleton";
import { Button, Card, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { TbFolderSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

// Import projects from schema instead of using hooks
import { Project as schemaProjects } from "@/schema/Projects/Project";

const Project = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(4); // Initially show 4 cards
  const [loading, setLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const projects = schemaProjects; // use schema data
  const isLoading = localLoading || loading;

  if (isLoading) return <MyProjectSkeleton />;

  if (!projects || projects.length === 0)
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300 w-full">
        <div className="flex items-center gap-3 mb-6">
          <TbFolderSearch className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            My Projects
          </h2>
        </div>
        <p className="text-center py-6 text-red-500"></p>
      </div>
    );

  if (!projects || projects.length === 0)
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300 w-full">
        <div className="flex items-center gap-3 mb-6">
          <TbFolderSearch className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            My Projects
          </h2>
        </div>
        <p className="text-center py-6 text-gray-700 dark:text-gray-300">
          No projects found.
        </p>
      </div>
    );

  // Load more handler (only affects client-side visible count)
  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-none xl:rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300 w-full">
      <div className="flex items-center gap-3 mb-6">
        <TbFolderSearch className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          My Projects
        </h2>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {projects.slice(0, visibleCount).map((project: any, index: number) => (
          <Link
            to={`/myprojects/${encodeURIComponent(
              project.title.replace(/\s+/g, "-")
            )}`} // ← Link using project title
            key={project.id ?? index}
            className="block"
          >
            <Card
              hoverable
              className="rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] flex flex-col bg-white dark:bg-gray-800 cursor-pointer"
              styles={{
                body: {
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                },
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-start gap-3">
                <TbFolderSearch
                  className={`w-6 h-6 mt-1 flex-shrink-0 transition-colors duration-300 ${
                    hoveredIndex === index
                      ? "text-blue-500"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`!text-lg !font-semibold block whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-300 flex-1 min-w-0 ${
                        hoveredIndex === index
                          ? "text-blue-500"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                      title={project.title}
                    >
                      {project.title}
                    </span>
                    <Tag
                      color={project.visibility === "Public" ? "green" : "red"}
                      className="flex-shrink-0"
                    >
                      {project.visibility}
                    </Tag>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {project.date}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < projects.length && (
        <div className="flex justify-center mt-5">
          <Button type="link" onClick={handleLoadMore} loading={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Spin size="small" /> Loading...
              </span>
            ) : (
              "Load More"
            )}
          </Button>{" "}
        </div>
      )}
    </div>
  );
};

export default Project;
