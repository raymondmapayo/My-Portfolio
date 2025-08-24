import CreatedProjectSkeleton from "@/components/Skeleton/Project/CreatedProject";
import { useEffect, useState } from "react";
import { LuPin } from "react-icons/lu";
import { TbFolderSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

// Import projects from schema instead of GraphQL hook
import { Project as schemaProjects } from "@/schema/Projects/Project";

type LocalProject = {
  id: number;
  title: string;
  image: string;
  tech: string[];
  paragraphs?: string[];
};

const CreatedProject = () => {
  const [loading] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);

  // Simulate a delay for skeleton
  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const projects = schemaProjects; // use schema data
  const isLoading = localLoading || loading;

  if (isLoading) return <CreatedProjectSkeleton />;

  // Map schema projects to the UI shape you used previously
  const mappedProjects: LocalProject[] =
    projects && projects.length > 0
      ? projects.map((p: any, idx: number) => {
          const firstImage =
            p.images && p.images.length > 0 ? p.images[0] : null;
          return {
            id: Number(p.id ?? idx),
            title: p.title,
            image: firstImage?.src ?? "/design.jpg",
            tech: p.tech ?? [],
            paragraphs: firstImage?.paragraphs ?? [],
          };
        })
      : [];

  // Slice to only display 2 projects
  const displayedProjects = mappedProjects.slice(0, 2);

  // If no projects after mapping
  if (!displayedProjects || displayedProjects.length === 0)
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 transition-colors duration-300 w-full">
        <div className="flex items-center gap-3 mb-6">
          <LuPin className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            My Featured Projects
          </h2>
        </div>
        <p className="text-center py-6 text-gray-700 dark:text-gray-300">
          No projects found.
        </p>
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 transition-colors duration-300 w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <LuPin className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          My Featured Projects
        </h2>
      </div>

      {/* Responsive container */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-10">
        {displayedProjects.map((project) => (
          <Link
            key={project.id}
            to={`/myprojects/${encodeURIComponent(
              project.title.replace(/\s+/g, "-")
            )}`}
            className="flex flex-col md:flex-row items-start gap-6 w-full md:w-[48%]"
          >
            {/* Project Image */}
            <div className="w-full md:w-64 h-44 md:h-44 overflow-hidden rounded-lg shadow-md">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Project Details */}
            <div className="flex flex-col gap-3 flex-1 text-gray-800 dark:text-gray-100">
              {/* Title with 3-line clamp */}
              <div className="flex items-center gap-2">
                <TbFolderSearch className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                <h3
                  className="text-lg md:text-xl leading-snug overflow-hidden text-ellipsis line-clamp-3 truncate max-w-[280px] font-semibold break-words"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                  title={project.title}
                >
                  {project.title}
                </h3>
              </div>

              {/* Paragraph preview with 3-line clamp */}
              {project.paragraphs && project.paragraphs.length > 0 && (
                <p
                  className="text-sm leading-snug overflow-hidden text-ellipsis text-gray-600 dark:text-gray-300 line-clamp-3"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                  title={project.paragraphs.join(" ")}
                >
                  {project.paragraphs.join(" ")}
                </p>
              )}

              {/* Tech Stack — show only first 3 */}
              <div className="flex gap-2 flex-wrap">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-gray-700 dark:text-gray-200 text-xs font-medium px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CreatedProject;
