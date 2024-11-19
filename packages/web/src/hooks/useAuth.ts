// src/hooks/useAuth.ts
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  setCredentials,
  setError,
  setLoading,
  logout as logoutAction,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthError,
  selectIsLoading
} from '@/features/auth/authSlice';
import { authApi } from '@/services/api';
import { LoginCredentials, RegisterCredentials } from '@/types';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const error = useAppSelector(selectAuthError);
  const isLoading = useAppSelector(selectIsLoading);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      dispatch(setLoading(true));
      const response = await authApi.login(credentials);
      dispatch(setCredentials(response));
      navigate('/dashboard');
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to login'));
    }
  }, [dispatch, navigate]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      dispatch(setLoading(true));
      const response = await authApi.register(credentials);
      dispatch(setCredentials(response));
      navigate('/dashboard');
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to register'));
    }
  }, [dispatch, navigate]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
      dispatch(logoutAction());
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      // Still logout on the client side even if the API call fails
      dispatch(logoutAction());
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout
  };
};
