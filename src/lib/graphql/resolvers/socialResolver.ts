// src/lib/graphql/resolvers/socialResolver.ts
import fs from "fs";
import path from "path";

const socialFilePath = path.resolve(process.cwd(), "dist/sociallinks.json");

interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

let socialLinks: SocialLink[] = [];
if (fs.existsSync(socialFilePath)) {
  try {
    socialLinks = JSON.parse(fs.readFileSync(socialFilePath, "utf-8"));
    if (!Array.isArray(socialLinks)) socialLinks = [];
  } catch {
    socialLinks = [];
  }
}

let lastId =
  socialLinks.length > 0 ? Math.max(...socialLinks.map((e) => e.id)) : 0;

const save = () => {
  fs.mkdirSync(path.dirname(socialFilePath), { recursive: true });
  fs.writeFileSync(
    socialFilePath,
    JSON.stringify(socialLinks, null, 2),
    "utf-8"
  );
};

export const socialResolver = {
  Query: {
    socialLinks: () => socialLinks,
    socialLinkById: (_: any, args: { id: string | number }) => {
      const id = Number(args.id);
      return socialLinks.find((e) => e.id === id) || null;
    },
  },
  Mutation: {
    createSocialLink: (_: any, args: { platform: string; url: string }) => {
      lastId += 1;
      const newItem = { id: lastId, ...args };
      socialLinks.push(newItem);
      save();
      return newItem;
    },
    updateSocialLink: (
      _: any,
      args: { id: string | number; platform?: string; url?: string }
    ) => {
      const id = Number(args.id);
      const item = socialLinks.find((e) => e.id === id);
      if (!item) throw new Error("SocialLink not found");
      if (args.platform !== undefined) item.platform = args.platform;
      if (args.url !== undefined) item.url = args.url;
      save();
      return item;
    },
    deleteSocialLink: (_: any, args: { id: string | number }) => {
      const id = Number(args.id);
      const idx = socialLinks.findIndex((e) => e.id === id);
      if (idx === -1) throw new Error("SocialLink not found");
      const removed = socialLinks.splice(idx, 1)[0];
      save();
      return removed;
    },
    deleteAllSocialLinks: () => {
      const old = [...socialLinks];
      socialLinks = [];
      lastId = 0;
      save();
      return old;
    },
  },
};
