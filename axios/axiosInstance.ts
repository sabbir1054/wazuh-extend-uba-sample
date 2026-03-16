import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getBaseUrl } from "@/config/envConfig";

const instance = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true, // IMPORTANT: Include cookies in requests (for refresh token)
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["accept"] = "application/json";
instance.defaults.timeout = 60000;

// In-memory token storage (NOT localStorage for security)
let accessToken: string | null = null;
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

// Store dispatch function - set after store initialization to avoid circular dependency
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let storeDispatch: ((action: any) => void) | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let authActions: { setAccessToken: (token: string) => any; logout: () => any } | null = null;

// Initialize store dispatch - called from StoreProvide after store is created
export const initializeAxiosStore = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (action: any) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: { setAccessToken: (token: string) => any; logout: () => any }
) => {
  storeDispatch = dispatch;
  authActions = actions;
};

// Queue for requests waiting for token refresh
type QueueItem = {
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
  config: InternalAxiosRequestConfig;
};
let failedQueue: QueueItem[] = [];

// Function to set the access token in memory
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

// Function to get the current access token from memory
export const getAccessToken = (): string | null => {
  return accessToken;
};

// Function to clear the access token
export const clearAccessToken = () => {
  accessToken = null;
};

// Process the queue of failed requests after token refresh
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else if (token) {
      item.config.headers.Authorization = `Bearer ${token}`;
      item.resolve(instance(item.config));
    }
  });
  failedQueue = [];
};

// Refresh the access token using HTTP-only cookie
const refreshAccessToken = async (): Promise<string> => {
  const baseUrl = getBaseUrl();
  const response = await axios.post(
    `${baseUrl}/auth/refresh`,
    {},
    {
      withCredentials: true, // Include refresh token cookie
    }
  );
  return response.data.accessToken;
};

// Request interceptor - attach access token from memory
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401/403 and auto-refresh
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    // If error is 401 or 403 and we haven't retried yet
    if ((status === 401 || status === 403) && !originalRequest._retry) {
      // Skip refresh for auth endpoints
      const url = originalRequest.url || "";
      if (
        url.includes("/auth/login") ||
        url.includes("/auth/register") ||
        url.includes("/auth/refresh") ||
        url.includes("/auth/logout")
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        // Create a single refresh promise that all requests can wait on
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken();
        }

        const newToken = await refreshPromise;

        // Update both memory and Redux store
        setAccessToken(newToken);
        if (storeDispatch && authActions) {
          storeDispatch(authActions.setAccessToken(newToken));
        }

        // Process all queued requests
        processQueue(null, newToken);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // Process queue with error
        processQueue(refreshError, null);
        clearAccessToken();

        // Logout user if refresh fails
        if (storeDispatch && authActions) {
          storeDispatch(authActions.logout());
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  }
);

export { instance };
