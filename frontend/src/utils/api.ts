import axios from "axios";
import { env } from "../env/env.mjs";

const API = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let logoutUser: (() => void) | null = null;


API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        return API(originalRequest);
      } catch (refreshError) {
        if(logoutUser) logoutUser()
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
export const setLogoutFunction = (logoutFn: () => void) => { logoutUser = logoutFn };
