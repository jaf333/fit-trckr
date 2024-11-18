// src/validators/schemas.ts
import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
});

export const profileSchema = z.object({
  height: z.number().optional(),
  weight: z.number().optional(),
  goalWeight: z.number().optional(),
  birthDate: z.string().optional(),
  gender: z.string().optional()
});

export const exerciseSchema = z.object({
  name: z.string(),
  sets: z.number().int().positive(),
  reps: z.number().int().positive(),
  weight: z.number().optional(),
  notes: z.string().optional()
});

export const workoutSchema = z.object({
  name: z.string(),
  date: z.string(),
  exercises: z.array(exerciseSchema)
});