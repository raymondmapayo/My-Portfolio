import { GET_EXPERTISE } from "@/lib/graphql/queries/expertiseQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const useExpertise = () => {
  const { data, loading: queryLoading, error } = useQuery(GET_EXPERTISE);
  const [expertise, setExpertise] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Optional local loading for skeleton animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (data?.expertise) {
      setExpertise(data.expertise);
      console.log("Expertise data from GraphQL:", data.expertise); // ← log data
    }
  }, [data]);

  // Log any errors
  useEffect(() => {
    if (error) {
      console.error("GET_EXPERTISE error:", error); // ← log error
    }
  }, [error]);

  useEffect(() => {
    console.log("Expertise loading state:", loading || queryLoading);
  }, [loading, queryLoading]);

  return { expertise, loading: loading || queryLoading, error };
};
