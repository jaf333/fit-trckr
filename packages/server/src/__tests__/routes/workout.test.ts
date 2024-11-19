// packages/server/src/__tests__/routes/workout.test.ts
import { NextFunction, Request, Response } from 'express';
import request from 'supertest';
import { prismaMock } from '../../config/prisma';
import app from '../../app';
import { jest, expect, describe, it, beforeEach } from '@jest/globals';

describe('Workout Routes', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockReturnThis() as any,
      status: jest.fn().mockReturnThis() as any,
      send: jest.fn().mockReturnThis() as any
    };
    nextFunction = jest.fn();

    // Reset all mocks
    jest.clearAllMocks();
  });

  describe('POST /api/workouts', () => {
    const validWorkout = {
      name: 'Monday Upper Body',
      date: new Date().toISOString(),
      notes: 'Focus on chest and shoulders',
      exercises: [
        {
          exerciseId: '1',
          sets: [
            { reps: 12, weight: 100, notes: 'Warm up set' }
          ]
        }
      ]
    };

    it('should create a new workout successfully', async () => {
      const mockWorkout = {
        id: '1',
        userId: '1',
        name: validWorkout.name,
        date: new Date(validWorkout.date),
        notes: validWorkout.notes,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      prismaMock.workout.create.mockResolvedValue(mockWorkout);

      const token = 'valid-token';
      const response = await request(app)
        .post('/api/workouts')
        .set('Authorization', `Bearer ${token}`)
        .send(validWorkout);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(validWorkout.name);
    });

    it('should return 400 for invalid workout data', async () => {
      const invalidWorkout = {
        // Missing required fields
        date: new Date().toISOString()
      };

      const token = 'valid-token';
      const response = await request(app)
        .post('/api/workouts')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidWorkout);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .post('/api/workouts')
        .send(validWorkout);

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/workouts', () => {
    it('should return all workouts for the authenticated user', async () => {
      const mockWorkouts = [
        {
          id: '1',
          userId: '1',
          name: 'Workout 1',
          date: new Date(),
          notes: 'Test workout',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          userId: '1',
          name: 'Workout 2',
          date: new Date(),
          notes: 'Test workout 2',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      prismaMock.workout.findMany.mockResolvedValue(mockWorkouts);

      const token = 'valid-token';
      const response = await request(app)
        .get('/api/workouts')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/api/workouts');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/workouts/:id', () => {
    it('should return a specific workout', async () => {
      const mockWorkout = {
        id: '1',
        userId: '1',
        name: 'Test Workout',
        date: new Date(),
        notes: 'Test notes',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      prismaMock.workout.findUnique.mockResolvedValue(mockWorkout);

      const token = 'valid-token';
      const response = await request(app)
        .get('/api/workouts/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', '1');
    });

    it('should return 404 for non-existent workout', async () => {
      prismaMock.workout.findUnique.mockResolvedValue(null);

      const token = 'valid-token';
      const response = await request(app)
        .get('/api/workouts/999')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });
});
