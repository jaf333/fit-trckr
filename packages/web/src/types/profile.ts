// src/types/profile.ts

export interface Profile {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    height: number;
    weight: number;
    goalWeight: number;
    activityLevel: 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'VERY_ACTIVE' | 'EXTREME';
    fitnessGoals: string[];
    createdAt: string;
    updatedAt: string;
  }

  export interface ProfileFormData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    height: number;
    weight: number;
    goalWeight: number;
    activityLevel: Profile['activityLevel'];
    fitnessGoals: string[];
  }

  export type ProfileUpdateData = Partial<ProfileFormData>;
