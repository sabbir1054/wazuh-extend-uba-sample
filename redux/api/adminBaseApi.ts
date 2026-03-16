/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "@/config/envConfig";

const adminBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }: any) => {
    try {
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem("adminToken")
          : null;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      let fullUrl = baseUrl + url;
      if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            searchParams.append(key, String(value));
          }
        });
        const queryString = searchParams.toString();
        if (queryString) {
          fullUrl += `?${queryString}`;
        }
      }

      const response = await fetch(fullUrl, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: response.statusText }));
        return {
          error: {
            status: response.status,
            data: errorData,
          },
        };
      }

      const result = await response.json();
      return { data: result };
    } catch (error: any) {
      return {
        error: {
          status: "FETCH_ERROR",
          data: error.message || "An error occurred",
        },
      };
    }
  };

const adminApiUrl = getBaseUrl();

export const adminBaseApi = createApi({
  reducerPath: "adminApi",
  baseQuery: adminBaseQuery({ baseUrl: adminApiUrl || "" }),
  tagTypes: ["AdminStats", "AdminUsers"],
  endpoints: () => ({}),
});
