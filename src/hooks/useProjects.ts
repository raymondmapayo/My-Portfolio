// frontend/src/hooks/useProjects.ts
import {
  GET_PROJECTS,
  GET_PROJECT_BY_ID,
} from "@/lib/graphql/queries/projects";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

// Types used by the hook (mirror your GraphQL types)
export type ProjectImage = {
  src: string;
  paragraphs: string[];
};

export type InfoItem = {
  icon?: string | null;
  label: string;
};

export type Project = {
  id: string;
  title: string;
  tech: string[];
  visibility: string;
  info: InfoItem[];
  images: ProjectImage[];
  date: string; // ISO string
};

/**
 * useProjects - fetch all projects
 */
export const useProjects = () => {
  const {
    data,
    loading: queryLoading,
    error,
    refetch,
  } = useQuery(GET_PROJECTS);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Optional skeleton/loading delay (same pattern as your AboutMe hook)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Update local state when GraphQL data arrives
  useEffect(() => {
    if (data?.getProjects) {
      setProjects(data.getProjects as Project[]);
      console.log("GET_PROJECTS data from GraphQL:", data.getProjects);
    }
  }, [data]);

  // Log errors
  useEffect(() => {
    if (error) console.error("GET_PROJECTS error:", error);
  }, [error]);

  // Log loading states for debugging
  useEffect(() => {
    console.log("Projects loading state:", loading || queryLoading);
  }, [loading, queryLoading]);

  return {
    projects,
    loading: loading || queryLoading,
    error,
    refetch, // useful if you want to manually refresh
  };
};

/**
 * useProjectById - fetch single project by id
 */
export const useProjectById = (id?: string | number | null) => {
  const skip = id === undefined || id === null;
  const {
    data,
    loading: queryLoading,
    error,
    refetch,
  } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: id ? String(id) : "" },
    skip,
  });

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (data?.getProjectById) {
      setProject(data.getProjectById as Project);
      console.log("GET_PROJECT_BY_ID data from GraphQL:", data.getProjectById);
    } else if (!data && !queryLoading) {
      // clear if no data (e.g., id removed)
      setProject(null);
    }
  }, [data, queryLoading]);

  useEffect(() => {
    if (error) console.error("GET_PROJECT_BY_ID error:", error);
  }, [error]);

  useEffect(() => {
    console.log("ProjectById loading state:", loading || queryLoading);
  }, [loading, queryLoading]);

  return {
    project,
    loading: loading || queryLoading,
    error,
    refetch,
  };
};
