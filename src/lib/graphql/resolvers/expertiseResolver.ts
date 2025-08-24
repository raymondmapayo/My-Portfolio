import fs from "fs";
import path from "path";

const expertiseFilePath = path.resolve(process.cwd(), "dist/expertise.json");

interface Expertise {
  id: number;
  title: string;
  description: string;
}

let expertise: Expertise[] = [];
if (fs.existsSync(expertiseFilePath)) {
  try {
    expertise = JSON.parse(fs.readFileSync(expertiseFilePath, "utf-8"));
    if (!Array.isArray(expertise)) expertise = [];
  } catch {
    expertise = [];
  }
}

let lastId = expertise.length > 0 ? Math.max(...expertise.map((e) => e.id)) : 0;

const save = () => {
  fs.mkdirSync(path.dirname(expertiseFilePath), { recursive: true });
  fs.writeFileSync(
    expertiseFilePath,
    JSON.stringify(expertise, null, 2),
    "utf-8"
  );
};

export const expertiseResolver = {
  Query: {
    expertise: () => expertise,
    expertiseById: (_: any, args: { id: string | number }) => {
      const id = Number(args.id);
      return expertise.find((e) => e.id === id) || null;
    },
  },
  Mutation: {
    createExpertise: (_: any, args: { title: string; description: string }) => {
      lastId += 1;
      const newItem = { id: lastId, ...args };
      expertise.push(newItem);
      save();
      return newItem;
    },
    updateExpertise: (
      _: any,
      args: { id: string | number; title?: string; description?: string }
    ) => {
      const id = Number(args.id);
      const item = expertise.find((e) => e.id === id);
      if (!item) throw new Error("Expertise not found");
      if (args.title !== undefined) item.title = args.title;
      if (args.description !== undefined) item.description = args.description;
      save();
      return item;
    },
    deleteExpertise: (_: any, args: { id: string | number }) => {
      const id = Number(args.id);
      const idx = expertise.findIndex((e) => e.id === id);
      if (idx === -1) throw new Error("Expertise not found");
      const removed = expertise.splice(idx, 1)[0];
      save();
      return removed;
    },
    deleteAllExpertise: () => {
      const old = [...expertise];
      expertise = [];
      lastId = 0;
      save();
      return old;
    },
  },
};
