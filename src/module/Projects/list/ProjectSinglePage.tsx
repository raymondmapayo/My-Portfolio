// keep these imports — DO NOT remove
import { CiDesktop } from "react-icons/ci";
import { GrLocationPin } from "react-icons/gr";
import { IoArrowBackSharp, IoHammerOutline } from "react-icons/io5";
import { RiCalendarTodoLine } from "react-icons/ri";

import { useNavigate, useParams } from "react-router-dom";

// type-only import for Project
import type { Project as ProjectType } from "@/hooks/useProjects";

// Import project data from schema
import { Project as myProjectData } from "@/schema/Projects/Project";

type ProjectImage = {
  src: string;
  paragraphs?: string[];
};

// Map string icon names (from schema) to actual imported components
const ICONS_MAP: Record<string, any> = {
  CiDesktop,
  IoHammerOutline,
  GrLocationPin,
  RiCalendarTodoLine,
};

const ProjectSinglePage = () => {
  const navigate = useNavigate();
  const params = useParams<{ title: string }>();

  // Use schema data directly
  const projects: ProjectType[] = myProjectData.map((p) => ({
    ...p,
    id: String(p.id),
  }));

  // -------------------------
  // Title-based lookup (slug-safe)
  // -------------------------
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const titleSlug = params.title ? params.title.toLowerCase() : "";

  const project: ProjectType | undefined = projects.find(
    (p) => slugify(p.title) === titleSlug
  );

  if (!project) return <p className="text-center p-6">Project not found.</p>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 transition-colors duration-300 w-full">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 text-gray-700 dark:text-gray-100 hover:border-[#1890ff] hover:text-[#1890ff] transition-colors duration-300 mb-4 bg-transparent"
      >
        <IoArrowBackSharp className="text-lg" />
      </button>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {project.title}
        </h2>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-md ${
            project.visibility === "Public"
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
          }`}
        >
          {project.visibility}
        </span>
      </div>

      {/* Tech Stack */}
      <div className="flex gap-2 flex-wrap mb-6">
        {project.tech.map((tech: string) => (
          <span
            key={tech}
            className="text-gray-700 dark:text-gray-200 text-xs font-semibold px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-4 mb-6">
        {project.info?.map((item, idx) => {
          const iconValue = (item as any).icon;
          let IconComp: any = null;

          if (
            typeof iconValue === "function" ||
            (typeof iconValue === "object" && iconValue !== null)
          ) {
            IconComp = iconValue;
          } else if (typeof iconValue === "string" && ICONS_MAP[iconValue]) {
            IconComp = ICONS_MAP[iconValue];
          } else {
            IconComp = null;
          }

          return (
            <div
              key={idx}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 text-base"
            >
              {IconComp ? (
                <IconComp className="w-5 h-5 flex-shrink-0" />
              ) : (
                <span className="w-5 h-5 flex-shrink-0" />
              )}
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      {project.images.map((image: ProjectImage, index: number) => (
        <div key={index} className="mb-8">
          <div className="w-full h-[400px] flex items-center justify-center overflow-hidden rounded-lg shadow-md mb-3 bg-gray-100 dark:bg-gray-800">
            <img
              src={image.src}
              className="max-w-full max-h-full object-contain"
              alt={`project-image-${index}`}
            />
          </div>
          {image.paragraphs &&
            image.paragraphs.map((p, idx) => (
              <p key={idx} className="text-gray-800 dark:text-gray-100 mb-2">
                {p}
              </p>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectSinglePage;
