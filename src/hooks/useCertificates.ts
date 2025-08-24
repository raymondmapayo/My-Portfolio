import { GET_CERTIFICATES } from "@/lib/graphql/queries/certificateQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const useCertificates = () => {
  const { data, loading: queryLoading, error } = useQuery(GET_CERTIFICATES);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Optional skeleton/loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Update state when data changes
  useEffect(() => {
    if (data?.getCertificates) {
      setCertificates(data.getCertificates);
      console.log("Certificates from GraphQL:", data.getCertificates);
    }
  }, [data]);

  // Log errors
  useEffect(() => {
    if (error) console.error("GET_CERTIFICATES error:", error);
  }, [error]);

  // Log loading
  useEffect(() => {
    console.log("Certificates loading state:", loading || queryLoading);
  }, [loading, queryLoading]);

  return { certificates, loading: loading || queryLoading, error };
};
