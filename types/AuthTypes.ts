export type AuthUser = {
  id?: number;
  userId?: string;
  username: string;
  email?: string;
} | null;

export interface AuthState {
  user: AuthUser;
  accessToken: string | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  userId: string;
  username: string;
}

export interface RefreshResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}
