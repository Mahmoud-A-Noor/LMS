import axios from "axios";
import {env} from "../env/env.mjs"
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const API = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${env.API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        setCookie("accessToken", newAccessToken);

        API.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        deleteCookie("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (error.response.status === 403) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default API;
