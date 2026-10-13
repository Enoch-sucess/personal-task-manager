import { useEffect, useState } from "react";
import { API_URL } from "../config";
import type { Task } from "../types";

export function useSearch(term: string) {
  const [results, setResults] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = term.trim();
    if (!query) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to search");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/task?search=${encodeURIComponent(query)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          },
        );

        if (response.status === 401) {
          setError("Session expired, please log in again");
          setResults([]);
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Search failed");
        }

        setResults(data.tasks);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [term]);

  return { results, loading, error };
}
