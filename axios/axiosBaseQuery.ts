/* eslint-disable @typescript-eslint/no-explicit-any */
import { instance } from "./axiosInstance";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, contentType }: any) => {
    try {
      // For FormData, don't set Content-Type - let browser set it with boundary
      const isFormData = data instanceof FormData;

      // Setting Content-Type to undefined removes it, allowing browser to set it for FormData
      const headers: Record<string, string | undefined> = {
        "Content-Type": isFormData ? undefined : (contentType || "application/json"),
      };

      const result = await instance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError: any) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
