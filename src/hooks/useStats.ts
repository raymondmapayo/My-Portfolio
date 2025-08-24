// frontend/src/hooks/useStats.ts
import { GET_STATS } from "@/lib/graphql/queries/StatsQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const useStats = () => {
  const { data, loading: queryLoading, error } = useQuery(GET_STATS);
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (data?.stats) {
      setStats(data.stats);
      console.log("Stats data from GraphQL:", data.stats); // ← log data
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("GET_STATS error:", error); // ← log error
    }
  }, [error]);

  useEffect(() => {
    console.log("Loading state:", loading || queryLoading);
  }, [loading, queryLoading]);

  return { stats, loading: loading || queryLoading, error };
};
