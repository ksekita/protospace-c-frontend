import axios from "axios";
import type { AxiosInstance } from "axios";

const isServer = typeof window === "undefined";

const api: AxiosInstance = axios.create({
  baseURL: isServer
    ? process.env.SERVER_API_URL
    : process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  return config;
});

export default api;
