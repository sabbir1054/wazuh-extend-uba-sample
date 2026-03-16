import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { baseApi } from "./api/baseApi";
import { adminBaseApi } from "./api/adminBaseApi";
import authReducer from "./slice/authSlice";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// Use real localStorage only in the browser
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage(); // Fallback for SSR

const persistConfig = {
  key: "auth",
  storage,
  // SECURITY: Only persist user info, NOT the accessToken
  // accessToken is stored in memory only and refreshed via HTTP-only cookie
  whitelist: ["user"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  [adminBaseApi.reducerPath]: adminBaseApi.reducer,
  auth: persistedAuthReducer, // Use persisted reducer
};
