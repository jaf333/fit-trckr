// src/types/index.ts
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }

  export interface LoginCredentials {
    email: string;
    password: string;
  }

  export interface RegisterCredentials extends LoginCredentials {
    name: string;
  }

  export interface AuthResponse {
    user: User;
    token: string;
  }
