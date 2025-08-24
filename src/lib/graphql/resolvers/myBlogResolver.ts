// backend/src/graphql/resolvers/myBlogResolver.ts
import fs from "fs";
import path from "path";

const myBlogFilePath = path.resolve(process.cwd(), "dist/myBlog.json");

interface ContentBlock {
  type: "text" | "image";
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

interface MyBlog {
  id: number;
  date: string;
  title: string;
  image: string;
  contentBlocks: ContentBlock[];
  featured?: boolean;
}

// Input type for creating/updating blogs (excludes id)
interface MyBlogInput {
  date: string;
  title: string;
  image: string;
  contentBlocks: ContentBlock[];
  featured?: boolean;
}

let myBlogs: MyBlog[] = [];
if (fs.existsSync(myBlogFilePath)) {
  try {
    myBlogs = JSON.parse(fs.readFileSync(myBlogFilePath, "utf-8"));
    if (!Array.isArray(myBlogs)) myBlogs = [];
  } catch {
    myBlogs = [];
  }
}

let lastId = myBlogs.length > 0 ? Math.max(...myBlogs.map((b) => b.id)) : 0;

const save = () => {
  fs.mkdirSync(path.dirname(myBlogFilePath), { recursive: true });
  fs.writeFileSync(myBlogFilePath, JSON.stringify(myBlogs, null, 2), "utf-8");
};

export const myBlogResolver = {
  Query: {
    getMyBlogs: () => myBlogs,
    getMyBlogById: (_: any, args: { id: string | number }) => {
      const id = Number(args.id);
      return myBlogs.find((b) => b.id === id) || null;
    },
  },
  Mutation: {
    createMyBlog: (_: any, args: { input: MyBlogInput }) => {
      lastId += 1;
      const newBlog: MyBlog = { id: lastId, ...args.input }; // id generated here
      myBlogs.push(newBlog);
      save();
      return newBlog;
    },

    updateMyBlog: (
      _: any,
      args: { id: string | number; input: Partial<MyBlogInput> }
    ) => {
      const id = Number(args.id);
      const blog = myBlogs.find((b) => b.id === id);
      if (!blog) throw new Error("Blog not found");
      Object.assign(blog, args.input); // id will not be overwritten
      save();
      return blog;
    },

    deleteMyBlog: (_: any, args: { id: string | number }) => {
      const id = Number(args.id);
      const idx = myBlogs.findIndex((b) => b.id === id);
      if (idx === -1) throw new Error("Blog not found");
      myBlogs.splice(idx, 1);
      save();
      return true;
    },
  },
};
