export interface UserInput {
    email: string;
    password: string;
    name?: string;
  }
  
  export interface ProfileInput {
    height?: number;
    weight?: number;
    goalWeight?: number;
    birthDate?: Date;
    gender?: string;
  }
  
  export interface WorkoutInput {
    name: string;
    date: Date;
    notes?: string;
    exercises: ExerciseInput[];
  }
  
  export interface ExerciseInput {
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    notes?: string;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
  }