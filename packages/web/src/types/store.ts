import type { Profile } from './profile';

export interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}

export interface AuthState {
  user: any; // Ajusta este tipo según tu implementación de auth
  loading: boolean;
  error: string | null;
}

export interface RootState {
  profile: ProfileState;
  auth: AuthState;
}
