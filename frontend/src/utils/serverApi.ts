"use server";

import API from "@/utils/api";
import { AxiosResponse } from "axios";

export async function serverApi<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  payload?: any,
  param?: any
): Promise<{ response: AxiosResponse<T> | null; error: string | null }> {
  try {
    const response: AxiosResponse<T> = await API({
      url: `${endpoint}${param ? `/${param}` : ""}`,
      method,
      data: payload,
    });

    return { response, error: null };
  } catch (err: any) {
    return { response: null, error: err.response?.data?.message || "Something went wrong" };
  }
}
