"use client"
import { useState } from "react";
import API from "@/utils/api";

export function useApi<T>(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE") {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (payload?: any, param?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API({
        url: `${endpoint}${param ? `/${param}` : ''}`,
        method,
        data: payload,
      });
      setData(response.data);
      return response;
    } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong");
        throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request };
}
