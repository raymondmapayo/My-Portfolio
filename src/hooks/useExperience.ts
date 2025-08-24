import { GET_EXPERIENCES } from "@/lib/graphql/queries/experienceQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const useExperience = () => {
  const { data, loading: queryLoading, error } = useQuery(GET_EXPERIENCES);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Optional skeleton/loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Update state when query data changes
  useEffect(() => {
    if (data?.getExperiences) {
      setExperiences(data.getExperiences);
      console.log("Experience data from GraphQL:", data.getExperiences);
    }
  }, [data]);

  // Log any errors
  useEffect(() => {
    if (error) console.error("GET_EXPERIENCES error:", error);
  }, [error]);

  // Log loading states
  useEffect(() => {
    console.log("Experience loading state:", loading || queryLoading);
  }, [loading, queryLoading]);

  return { experiences, loading: loading || queryLoading, error };
};
