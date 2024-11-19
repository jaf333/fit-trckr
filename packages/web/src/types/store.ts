import type { Profile } from './profile';

export interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  profile: ProfileState;
  // Añade aquí otros estados
  auth: {
    user: any; // Define el tipo correcto para auth si lo tienes
    loading: boolean;
    error: string | null;
  };
}
