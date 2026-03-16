"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { initializeAxiosStore } from "@/axios/axiosInstance";
import { setAccessToken, logout } from "@/redux/slice/authSlice";

// Create a context for rehydration state
const RehydrationContext = createContext<boolean>(false);

export const useRehydration = () => {
  return useContext(RehydrationContext);
};

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isRehydrated, setIsRehydrated] = useState(false);

  // Initialize axios with store dispatch to avoid circular dependency
  useEffect(() => {
    initializeAxiosStore(store.dispatch, {
      setAccessToken,
      logout,
    });
  }, []);

  return (
    <Provider store={store}>
      <RehydrationContext.Provider value={isRehydrated}>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={() => {
            setIsRehydrated(true);
          }}
        >
          {children}
        </PersistGate>
      </RehydrationContext.Provider>
    </Provider>
  );
}
