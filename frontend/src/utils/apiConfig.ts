import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});


API.interceptors.request.use(async (config) => {
  return config;
});

const logout = async ()=>{
  try {
    await API.post("/auth/logout");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}


// Updated axios interceptor
let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes('/auth/refresh-token')) {
      await logout()
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          await API.post(`/auth/refresh-token`, 
            {
            withCredentials: true,
          });

          isRefreshing = false;
          refreshSubscribers.forEach((cb) => cb());
          refreshSubscribers = [];

          return API(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push(() => resolve(API(originalRequest)));
      });
    }

    return Promise.reject(error);
  }
);


export default API;
// export const setLogoutFunction = (logoutFn: () => void) => { logoutUser = logoutFn };
