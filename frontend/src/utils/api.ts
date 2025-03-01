import axios from "axios";
import { env } from "../env/env.mjs";

const API = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let logoutUser: (() => void) | null = null;


// Updated axios interceptor
let isRefreshing = false;

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Prevent infinite loop on refresh-token endpoint
    if (originalRequest.url.includes('/auth/refresh-token')) {
      if (logoutUser) logoutUser();
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          // Explicit refresh token call
          await API.post('/auth/refresh-token', {}, { 
            withCredentials: true,
            baseURL: env.NEXT_PUBLIC_API_URL 
          });
          isRefreshing = false;
          return API(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          if (logoutUser) {
            logoutUser();
          }
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default API;
export const setLogoutFunction = (logoutFn: () => void) => { logoutUser = logoutFn };
