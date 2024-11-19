// src/types/index.ts
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface Profile {
    id: string;
    userId: string;
    height?: number;
    weight?: number;
    goals?: string;
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
