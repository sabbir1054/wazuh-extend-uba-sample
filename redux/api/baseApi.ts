import { axiosBaseQuery } from "@/axios/axiosBaseQuery";
import { getBaseUrl } from "@/config/envConfig";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseApiUrl = getBaseUrl();

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: baseApiUrl || "" }),
  tagTypes: ["Auth", "Users"],
  endpoints: () => ({}),
});
