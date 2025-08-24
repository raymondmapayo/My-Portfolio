import fs from "fs";
import path from "path";

// Path to JSON file inside dist
const statsFilePath = path.resolve(process.cwd(), "dist/stats.json");

// Stat interface
interface Stat {
  id: number; // auto-increment ID
  experienceYears: number;
  certificates: number;
  projects: number;
  technologies: number;
}

// Load stats array from file or start empty
let stats: Stat[] = [];
if (fs.existsSync(statsFilePath)) {
  try {
    stats = JSON.parse(fs.readFileSync(statsFilePath, "utf-8"));
    if (!Array.isArray(stats)) stats = [];
  } catch {
    stats = [];
  }
}

// Track last used ID
let lastId = stats.length > 0 ? Math.max(...stats.map((s) => s.id)) : 0;

// Helper to save stats to JSON
const saveStats = () => {
  fs.mkdirSync(path.dirname(statsFilePath), { recursive: true });
  fs.writeFileSync(statsFilePath, JSON.stringify(stats, null, 2), "utf-8");
};

export const statsResolver = {
  Query: {
    // Get all stats rows or filter by optional id
    stats: (_: any, args?: { id?: string | number }): Stat[] => {
      if (args?.id !== undefined) {
        const id = Number(args.id);
        return stats.filter((s) => s.id === id);
      }
      return stats;
    },
    // Get single stat by ID
    statById: (_: any, args: { id: string | number }): Stat | null => {
      const id = Number(args.id);
      return stats.find((s) => s.id === id) || null;
    },
  },
  Mutation: {
    // Create a new stat entry with auto-increment id
    createStats: (
      _: any,
      args: {
        experienceYears: number;
        certificates: number;
        projects: number;
        technologies: number;
      }
    ): Stat => {
      lastId += 1;
      const newStat: Stat = { id: lastId, ...args };
      stats.push(newStat);
      saveStats();
      return newStat;
    },

    // Update stat by ID (partial update)
    updateStats: (
      _: any,
      args: {
        id: string | number;
        experienceYears?: number;
        certificates?: number;
        projects?: number;
        technologies?: number;
      }
    ): Stat => {
      const id = Number(args.id);
      const stat = stats.find((s) => s.id === id);
      if (!stat) throw new Error("Stats row not found");

      if (typeof args.experienceYears === "number")
        stat.experienceYears = args.experienceYears;
      if (typeof args.certificates === "number")
        stat.certificates = args.certificates;
      if (typeof args.projects === "number") stat.projects = args.projects;
      if (typeof args.technologies === "number")
        stat.technologies = args.technologies;

      saveStats();
      return stat;
    },

    // Delete stat by ID
    deleteStats: (_: any, args: { id: string | number }): Stat => {
      const id = Number(args.id);
      const index = stats.findIndex((s) => s.id === id);
      if (index === -1) throw new Error("Stats row not found");
      const deleted = stats.splice(index, 1)[0];
      saveStats();
      return deleted;
    },

    // Delete all stat rows (like your deleteAllFeatures)
    deleteAllStats: (): Stat[] => {
      const deleted = [...stats];
      stats = [];
      lastId = 0;
      saveStats();
      return deleted;
    },
  },
};
