import { useEffect, useState } from "react";
import { fetchDashboard } from "../services/dashboard";

export function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetchDashboard(controller.signal);

        // ✅ Normalize data (important for UI stability)
        const normalized = {
          user: res.user || {},
          logs: res.logs || [],
          insights: res.insights || [],
        };

        setData(normalized);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, []);

  return { data, loading, error };
}