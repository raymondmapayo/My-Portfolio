// frontend/src/hooks/useEducation.ts
import { GET_EDUCATIONS } from "@/lib/graphql/queries/educationQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export interface Education {
  id: string;
  title: string;
  institution: string;
  gwa: string;
  date: string;
  logo: string;
  details: string[];
}

export const useEducation = () => {
  const { data, loading: queryLoading, error } = useQuery(GET_EDUCATIONS);
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  // Optional skeleton/loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Update state and log GraphQL data
  useEffect(() => {
    if (data?.getEducations) {
      setEducations(data.getEducations);
      console.log("Education data from GraphQL:", data.getEducations);
    }
  }, [data]);

  // Log any errors
  useEffect(() => {
    if (error) console.error("GET_EDUCATIONS error:", error);
  }, [error]);

  // Log loading states
  useEffect(() => {
    console.log("Education loading state:", loading || queryLoading);
  }, [loading, queryLoading]);

  return { educations, loading: loading || queryLoading, error };
};
