// backend/src/graphql/resolvers/aboutMeResolver.ts
import fs from "fs";
import path from "path";

const aboutMeFilePath = path.resolve(process.cwd(), "dist/aboutMe.json");

interface AboutMe {
  id: number;
  content: string[];
}

let aboutMe: AboutMe[] = [];
if (fs.existsSync(aboutMeFilePath)) {
  try {
    aboutMe = JSON.parse(fs.readFileSync(aboutMeFilePath, "utf-8"));
    if (!Array.isArray(aboutMe)) aboutMe = [];
  } catch {
    aboutMe = [];
  }
}

let lastId = aboutMe.length > 0 ? Math.max(...aboutMe.map((a) => a.id)) : 0;

const save = () => {
  fs.mkdirSync(path.dirname(aboutMeFilePath), { recursive: true });
  fs.writeFileSync(aboutMeFilePath, JSON.stringify(aboutMe, null, 2), "utf-8");
};

export const aboutMeResolver = {
  Query: {
    getAboutMe: () => aboutMe[0] || null,
    getAboutMeById: (_: any, args: { id: string | number }) => {
      const id = Number(args.id);
      return aboutMe.find((a) => a.id === id) || null;
    },
  },
  Mutation: {
    createAboutMe: (_: any, args: { input: { content: string[] } }) => {
      lastId += 1;
      const newItem = { id: lastId, ...args.input };
      aboutMe.push(newItem);
      save();
      return newItem;
    },

    updateAboutMe: (
      _: any,
      args: { id: string | number; input: { content: string[] } }
    ) => {
      const id = Number(args.id);
      const item = aboutMe.find((a) => a.id === id);
      if (!item) throw new Error("AboutMe not found");
      item.content = args.input.content;
      save();
      return item;
    },
    deleteAboutMe: (_: any, args: { id: string | number }) => {
      const id = Number(args.id);
      const idx = aboutMe.findIndex((a) => a.id === id);
      if (idx === -1) throw new Error("AboutMe not found");
      aboutMe.splice(idx, 1);
      save();
      return true;
    },
  },
};
