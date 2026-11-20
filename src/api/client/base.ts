import type { AxiosRequestConfig } from "axios";

export const API_ROOT_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081"
).replace(/\/+$/, "");

export const API_BASE_URL = `${API_ROOT_URL}/api/v1`;

export const CLIENT_CONFIG: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
};
