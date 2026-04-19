import axios from "axios";
import { useAuthStore } from "@/store/authStore";

// Create Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

//  Request Interceptor → attach access token
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 🔁 Response Interceptor → handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        // Call refresh API
        const res = await axios.post(
          "http://127.0.0.1:8000/api/auth/refresh/",
          { refresh: refreshToken }
        );

        const newAccess = res.data.data.access;

        // Update store
        const setTokens = useAuthStore.getState().setTokens;
        setTokens(newAccess, refreshToken!);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);

      } catch (refreshError) {
        //  Refresh failed → logout
        const logout = useAuthStore.getState().logout;
        logout();

        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;