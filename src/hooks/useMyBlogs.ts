// frontend/src/hooks/useMyBlogs.ts
import { GET_MY_BLOGS } from "@/lib/graphql/queries/myBlogQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export interface MyBlog {
  id: string;
  slug: string;
  image: string;
  date: string;
  title: string;
  featured?: boolean;
}

export const useMyBlogs = () => {
  const { data, loading: queryLoading, error } = useQuery(GET_MY_BLOGS);
  const [blogs, setBlogs] = useState<MyBlog[]>([]);
  const [loading, setLoading] = useState(true);

  // Optional skeleton/loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Update state when GraphQL data changes
  useEffect(() => {
    if (data?.getMyBlogs) {
      setBlogs(data.getMyBlogs);
      console.log("MyBlogs data from GraphQL:", data.getMyBlogs);
    }
  }, [data]);

  // Log any errors
  useEffect(() => {
    if (error) console.error("GET_MY_BLOGS error:", error);
  }, [error]);

  // Log loading states
  useEffect(() => {
    console.log("MyBlogs loading state:", loading || queryLoading);
  }, [loading, queryLoading]);

  return { blogs, loading: loading || queryLoading, error };
};
