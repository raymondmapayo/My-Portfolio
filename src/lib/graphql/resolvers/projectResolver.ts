// backend/src/graphql/resolvers/projectResolver.ts
import fs from "fs";
import path from "path";

type ProjectImage = {
  src: string;
  paragraphs: string[];
};

type InfoItem = {
  icon?: string;
  label: string;
};

type Project = {
  id: number;
  title: string;
  tech: string[];
  visibility: string;
  info: InfoItem[];
  images: ProjectImage[];
  date: string; // ISO string
};

const projectsFilePath = path.resolve(process.cwd(), "dist/projects.json");

// load existing projects from disk (if present)
let projects: Project[] = [];
if (fs.existsSync(projectsFilePath)) {
  try {
    const raw = fs.readFileSync(projectsFilePath, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) projects = parsed;
    else projects = [];
  } catch {
    projects = [];
  }
}

// If there are no projects on disk, prepopulate with your provided data (with date)
if (projects.length === 0) {
  projects = [
    {
      id: 1,
      title: "JGAA RESTAURANT From Better and Gooder",
      tech: [
        "React",
        "Vite",
        "MysQL",
        "NPM",
        "Git",
        "Javascript",
        "styled-components",
        "Ant Design",
      ],
      visibility: "Public",
      info: [
        { icon: "CiDesktop", label: "Full-Stack Developer" },
        {
          icon: "IoHammerOutline",
          label: "JGAA Restaurant Management Maintenance",
        },
        { icon: "GrLocationPin", label: "1 Frontend, 1 Backend, 1 PM, Q&A" },
        { icon: "RiCalendarTodoLine", label: "5 months" },
      ],
      images: [
        {
          src: "/design.jpg",
          paragraphs: [
            "This is the main dashboard showing an overview of employee stats and HR data.",
            "It allows managers to quickly review important metrics at a glance.",
          ],
        },
        {
          src: "/design2.jpg",
          paragraphs: [
            "Individual employee profiles with editable details and attendance tracking.",
            "You can also see the employee's leave history and performance notes.",
          ],
        },
        {
          src: "/design3.jpg",
          paragraphs: [
            "Payroll management interface for calculating salaries and benefits automatically.",
            "Supports exporting reports and bulk operations for efficiency.",
          ],
        },
      ],
      date: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Hotel Management",
      tech: ["React", "Ant Design"],
      visibility: "Private",
      info: [
        { icon: "CiDesktop", label: "Full-Stack Developer" },
        { icon: "IoHammerOutline", label: "Hotel Management Maintenance" },
        { icon: "GrLocationPin", label: "2 Frontend, 1 Backend, 1 PM" },
        { icon: "RiCalendarTodoLine", label: "4 months" },
      ],
      images: [],
      date: new Date().toISOString(),
    },
  ];
  // write initial file to disk
  fs.mkdirSync(path.dirname(projectsFilePath), { recursive: true });
  fs.writeFileSync(
    projectsFilePath,
    JSON.stringify(projects, null, 2),
    "utf-8"
  );
}

// helpers
let lastId = projects.length ? Math.max(...projects.map((p) => p.id)) : 0;
const save = () => {
  fs.mkdirSync(path.dirname(projectsFilePath), { recursive: true });
  fs.writeFileSync(
    projectsFilePath,
    JSON.stringify(projects, null, 2),
    "utf-8"
  );
};

export const projectResolver = {
  Query: {
    getProjects: () => projects,
    getProjectById: (_: any, args: { id: string | number }) => {
      const id = Number(args.id);
      return projects.find((p) => p.id === id) || null;
    },
  },

  Mutation: {
    createProject: (_: any, args: { input: Partial<Project> }) => {
      lastId += 1;
      const input = args.input || {};
      const newProject: Project = {
        id: lastId,
        title: input.title || "Untitled Project",
        tech: input.tech || [],
        visibility: input.visibility || "Private",
        info: input.info || [],
        images: input.images || [],
        date: input.date || new Date().toISOString(), // store string as-is if provided
      };
      projects.push(newProject);
      save();
      return newProject;
    },

    updateProject: (
      _: any,
      args: { id: string | number; input: Partial<Project> }
    ) => {
      const id = Number(args.id);
      const idx = projects.findIndex((p) => p.id === id);
      if (idx === -1) throw new Error("Project not found");

      const existing = projects[idx];
      const input = args.input || {};
      const updated: Project = {
        ...existing,
        title: input.title !== undefined ? input.title : existing.title,
        tech: input.tech !== undefined ? input.tech : existing.tech,
        visibility:
          input.visibility !== undefined
            ? input.visibility
            : existing.visibility,
        info: input.info !== undefined ? input.info : existing.info,
        images: input.images !== undefined ? input.images : existing.images,
        date: input.date !== undefined ? input.date : existing.date, // store as-is
      };

      projects[idx] = updated;
      save();
      return updated;
    },

    deleteProject: (_: any, args: { id: string | number }) => {
      const id = Number(args.id);
      const idx = projects.findIndex((p) => p.id === id);
      if (idx === -1) throw new Error("Project not found");
      projects.splice(idx, 1);
      save();
      return true;
    },
  },
};
