import fs from "fs";
import path from "path";

const blogsFilePath = path.resolve(process.cwd(), "dist/blogs.json");

interface Blog {
  id: number;
  title: string;
  image: string;
  date: string;
  content: string;
}

// Load blogs or start empty
let blogs: Blog[] = [];
if (fs.existsSync(blogsFilePath)) {
  try {
    blogs = JSON.parse(fs.readFileSync(blogsFilePath, "utf-8"));
  } catch {
    blogs = [];
  }
}

// Track last ID
let lastId = blogs.length > 0 ? Math.max(...blogs.map((b) => b.id)) : 0;

// Save blogs to JSON
const saveBlogs = () => {
  fs.mkdirSync(path.dirname(blogsFilePath), { recursive: true });
  fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2), "utf-8");
};

// Preload one example blog if empty
if (blogs.length === 0) {
  lastId += 1;
  blogs.push({
    id: lastId,
    image: "/design.jpg",
    date: "June 10, 2001",
    title:
      "My High School Journey: A Story of Challenges, Surprises, and Growth",
    content:
      "This is the detailed story of my high school years, full of twists, trials, and triumphs. I grew a lot, made mistakes, and learned life lessons that shaped who I am today. From struggling with grades to joining the science club, every part of the journey was meaningful.",
  });
  saveBlogs();
}

export const blogResolver = {
  Query: {
    blogs: (_: any, args?: { id?: string | number }): Blog[] => {
      if (args?.id !== undefined) {
        const id = Number(args.id);
        return blogs.filter((b) => b.id === id);
      }
      return blogs;
    },
    blogById: (_: any, args: { id: string | number }): Blog | null => {
      const id = Number(args.id);
      return blogs.find((b) => b.id === id) || null;
    },
  },
  Mutation: {
    createBlog: (
      _: any,
      args: { title: string; image: string; date: string; content: string }
    ): Blog => {
      lastId += 1;
      const newBlog: Blog = { id: lastId, ...args };
      blogs.push(newBlog);
      saveBlogs();
      return newBlog;
    },
    updateBlog: (
      _: any,
      args: {
        id: string | number;
        title?: string;
        image?: string;
        date?: string;
        content?: string;
      }
    ): Blog => {
      const id = Number(args.id);
      const blog = blogs.find((b) => b.id === id);
      if (!blog) throw new Error("Blog not found");
      if (args.title !== undefined) blog.title = args.title;
      if (args.image !== undefined) blog.image = args.image;
      if (args.date !== undefined) blog.date = args.date;
      if (args.content !== undefined) blog.content = args.content;
      saveBlogs();
      return blog;
    },
    deleteBlog: (_: any, args: { id: string | number }): Blog => {
      const id = Number(args.id);
      const index = blogs.findIndex((b) => b.id === id);
      if (index === -1) throw new Error("Blog not found");
      const deleted = blogs.splice(index, 1)[0];
      saveBlogs();
      return deleted;
    },
    deleteAllBlogs: (): Blog[] => {
      const deleted = [...blogs];
      blogs = [];
      lastId = 0;
      saveBlogs();
      return deleted;
    },
  },
};
