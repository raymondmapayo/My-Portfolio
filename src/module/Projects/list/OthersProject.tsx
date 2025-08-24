import { Button, Card, Spin, Tag } from "antd";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { TbFolderSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

// Skeleton
import OthersProjectSkeleton from "@/components/Skeleton/Project/OthersProjectSkeleton";

// Import projects from schema
import { Project as myProjectData } from "@/schema/Projects/Project";

const OthersProject = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Local loading simulation
  const [localLoading] = useState(false);

  const projects = myProjectData; // use schema data
  const error = null; // no hook error

  if (loading || localLoading) return <OthersProjectSkeleton />;

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
    }, 1200);
  };

  // If error
  if (error)
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300 w-full">
        <div className="flex items-center gap-3 mb-6">
          <FaGithub className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Others
          </h2>
        </div>
        <p className="text-center py-6 text-red-500">
          Failed to load projects: {String(error)}
        </p>
      </div>
    );

  // If no projects to show
  if (!projects || projects.length === 0)
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300 w-full">
        <div className="flex items-center gap-3 mb-6">
          <FaGithub className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Others
          </h2>
        </div>
        <p className="text-center py-6 text-gray-700 dark:text-gray-300">
          No projects found.
        </p>
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300 w-full">
      <div className="flex items-center gap-3 mb-6">
        <FaGithub className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Others
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        {projects.slice(0, visibleCount).map((project: any, index: number) => (
          <Card
            key={project.id ?? index}
            className="rounded-lg shadow-md flex flex-col bg-white dark:bg-gray-800"
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
                  <Link
                    to={`/myprojects/${encodeURIComponent(project.title.replace(/\s+/g, "-"))}`}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    } // ← scroll to top
                    className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-500 transition-colors duration-300 flex-1 min-w-0 block overflow-hidden text-ellipsis whitespace-nowrap"
                    title={project.title}
                  >
                    {project.title}
                  </Link>

                  <Tag
                    color={project.visibility === "Public" ? "green" : "red"}
                    className="flex-shrink-0"
                  >
                    {project.visibility}
                  </Tag>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  {project.date}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {visibleCount < projects.length && (
        <div className="flex justify-center mt-5">
          <Button type="link" onClick={handleLoadMore} disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Spin size="small" /> Loading...
              </span>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default OthersProject;
