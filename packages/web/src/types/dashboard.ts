//fit-trckr/packages/web/src/types/dashboard.ts

export interface ActivitySummary {
    totalWorkouts: number;
    currentStreak: number;
    totalMinutes: number;
    caloriesBurned: number;
  }

  export interface ProgressData {
    date: string;
    weight: number;
    target: number;
  }

  export interface WorkoutSummary {
    date: string;
    duration: number;
    type: string;
    caloriesBurned: number;
  }

  export interface DashboardState {
    activitySummary: ActivitySummary | null;
    progressData: ProgressData[];
    recentWorkouts: WorkoutSummary[];
    loading: boolean;
    error: string | null;
  }
