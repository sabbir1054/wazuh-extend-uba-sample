/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthState, AuthUser } from "@/types/AuthTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: NonNullable<AuthUser>;
        accessToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    updateUser: (state, action: PayloadAction<Partial<NonNullable<AuthUser>>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, updateUser, setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;

// Legacy selectors for backward compatibility
export const useCurrentToken = (state: { auth: { accessToken: any } }) =>
  state.auth.accessToken;
export const useCurrentUser = (state: { auth: { user: any } }) =>
  state.auth.user;
