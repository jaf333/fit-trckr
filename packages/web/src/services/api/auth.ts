// src/services/api/auth.ts
import { LoginCredentials, RegisterCredentials, AuthResponse } from '@/types';
import { apiClient } from './client';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/users/login', credentials);
    return data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/users/register', credentials);
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/users/logout');
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    const { data } = await apiClient.get<AuthResponse>('/users/me');
    return data;
  },
};
