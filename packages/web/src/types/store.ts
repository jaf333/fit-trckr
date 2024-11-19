import type { Profile } from './profile';
import type { DashboardState } from './dashboard';

export interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}

export interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  profile: ProfileState;
  auth: AuthState;
  dashboard: DashboardState;
}
