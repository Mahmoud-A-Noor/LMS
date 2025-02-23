import { useState } from "react";
import API from "@/utils/api";

export function useApi<T>(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE") {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (payload?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API({
        url: endpoint,
        method,
        data: payload,
      });
      setData(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request };
}
