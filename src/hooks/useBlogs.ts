import { GET_BLOGS } from "@/lib/graphql/queries/blogQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const useBlogs = () => {
  const { data, loading: queryLoading, error } = useQuery(GET_BLOGS);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Optional skeleton delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (data?.blogs) {
      setBlogs(data.blogs);
      console.log("Blogs data from GraphQL:", data.blogs);
    }
  }, [data]);

  useEffect(() => {
    if (error) console.error("GET_BLOGS error:", error);
  }, [error]);

  useEffect(() => {
    console.log("Blogs loading state:", loading || queryLoading);
  }, [loading, queryLoading]);

  return { blogs, loading: loading || queryLoading, error };
};
