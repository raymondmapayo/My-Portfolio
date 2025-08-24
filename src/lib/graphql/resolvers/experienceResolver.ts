import fs from "fs";
import path from "path";

const experienceFilePath = path.resolve(process.cwd(), "dist/experiences.json");

interface Experience {
  id: number; // numeric internally
  title: string;
  business: string;
  location: string;
  date: string;
  image: string;
  details: string[];
}

// Load experiences from JSON and convert IDs to numbers
let experiences: Experience[] = [];
if (fs.existsSync(experienceFilePath)) {
  try {
    experiences = JSON.parse(fs.readFileSync(experienceFilePath, "utf-8")).map(
      (e: any) => ({ ...e, id: Number(e.id) }) // ensures numeric IDs
    );
    if (!Array.isArray(experiences)) experiences = [];
  } catch {
    experiences = [];
  }
}

// Track last numeric ID
let lastId =
  experiences.length > 0 ? Math.max(...experiences.map((e) => e.id)) : 0;

// Save experiences to JSON
const save = () => {
  fs.mkdirSync(path.dirname(experienceFilePath), { recursive: true });
  fs.writeFileSync(
    experienceFilePath,
    JSON.stringify(experiences, null, 2),
    "utf-8"
  );
};

export const experienceResolver = {
  Query: {
    getExperiences: () => experiences,
    getExperienceById: (_: any, args: { id: string | number }) => {
      const id = Number(args.id); // convert incoming ID to number
      return experiences.find((e) => e.id === id) || null;
    },
  },
  Mutation: {
    createExperience: (_: any, args: Omit<Experience, "id">) => {
      lastId += 1;
      const newExp: Experience = { id: lastId, ...args };
      experiences.push(newExp);
      save();
      return newExp;
    },
    updateExperience: (
      _: any,
      args: Partial<Experience> & { id: string | number }
    ) => {
      const id = Number(args.id); // numeric comparison
      const exp = experiences.find((e) => e.id === id);
      if (!exp) throw new Error("Experience not found");

      Object.assign(exp, args);
      save();
      return exp;
    },
    deleteExperience: (_: any, args: { id: string | number }) => {
      const id = Number(args.id); // numeric comparison
      const index = experiences.findIndex((e) => e.id === id);
      if (index === -1) throw new Error("Experience not found");

      experiences.splice(index, 1);
      save();
      return true;
    },
  },
};
