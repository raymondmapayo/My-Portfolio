// frontend/src/hooks/useSocialLinks.ts
import { GET_SOCIAL_LINKS } from "@/lib/graphql/queries/socialQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

export const useSocialLinks = () => {
  const { data, loading: queryLoading, error } = useQuery(GET_SOCIAL_LINKS);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  // Optional skeleton delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (data?.socialLinks) {
      setSocialLinks(data.socialLinks);
      console.log("Social links from GraphQL:", data.socialLinks); // ← log data
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("GET_SOCIAL_LINKS error:", error); // ← log error
    }
  }, [error]);

  useEffect(() => {
    console.log("Social links loading state:", loading || queryLoading);
  }, [loading, queryLoading]);

  return { socialLinks, loading: loading || queryLoading, error };
};
