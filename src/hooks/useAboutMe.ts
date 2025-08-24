// frontend/src/hooks/useAboutMe.ts
import { GET_ABOUT_ME } from "@/lib/graphql/queries/aboutMeQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const useAboutMe = () => {
  const { data, loading: queryLoading, error } = useQuery(GET_ABOUT_ME);
  const [aboutMe, setAboutMe] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Optional skeleton/loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Update state and log GraphQL data
  useEffect(() => {
    if (data?.getAboutMe?.content) {
      setAboutMe(data.getAboutMe.content);
      console.log("AboutMe data from GraphQL:", data.getAboutMe.content);
    }
  }, [data]);

  // Log any errors
  useEffect(() => {
    if (error) console.error("GET_ABOUT_ME error:", error);
  }, [error]);

  // Log loading states
  useEffect(() => {
    console.log("AboutMe loading state:", loading || queryLoading);
  }, [loading, queryLoading]);

  return { aboutMe, loading: loading || queryLoading, error };
};
