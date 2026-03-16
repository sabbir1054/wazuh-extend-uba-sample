import { configureStore } from "@reduxjs/toolkit";
import { persistStore, Persistor } from "redux-persist";
import { baseApi } from "./api/baseApi";
import { adminBaseApi } from "./api/adminBaseApi";
import { reducer } from "./rootReducer";

// Helper function to create the store (used for typing)
const createStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware, adminBaseApi.middleware),
  });

// Type for our store
type StoreType = ReturnType<typeof createStore>;

// Singleton store instance - ensures only ONE store exists
let store: StoreType | null = null;
let persistor: Persistor | null = null;

export const makeStore = () => {
  // Return existing store if already created (singleton pattern)
  if (store && persistor) {
    return { store, persistor };
  }

  store = createStore();
  persistor = persistStore(store);

  return { store, persistor };
};

// Create store immediately for type exports
const { store: appStore, persistor: appPersistor } = makeStore();

// Export the singleton instances
export { appStore as store, appPersistor as persistor };

// Type exports
export type AppStore = StoreType;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
