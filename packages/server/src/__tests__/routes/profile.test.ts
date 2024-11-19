// packages/server/src/__tests__/routes/profile.test.ts
import { NextFunction, Request, Response } from 'express';
import request from 'supertest';
import { prismaMock } from '../../config/prisma';
import app from '../../app';
import { jest, expect, describe, it, beforeEach } from '@jest/globals';

describe('Profile Routes', () => {
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

  describe('POST /api/profiles', () => {
    const validProfile = {
      height: 180,
      weight: 75.5,
      age: 28,
      fitnessGoal: 'BUILD_MUSCLE',
      activityLevel: 'MODERATE',
      medicalConditions: ['None'],
      dietaryRestrictions: ['None']
    };

    it('should create a new profile successfully', async () => {
      const mockProfile = {
        id: '1',
        userId: '1',
        ...validProfile,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      prismaMock.profile.create.mockResolvedValue(mockProfile);

      const token = 'valid-token';
      const response = await request(app)
        .post('/api/profiles')
        .set('Authorization', `Bearer ${token}`)
        .send(validProfile);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.height).toBe(validProfile.height);
      expect(response.body.weight).toBe(validProfile.weight);
    });

    it('should return 400 for invalid profile data', async () => {
      const invalidProfile = {
        height: -180, // Invalid negative height
        weight: 0, // Invalid weight
        age: 150, // Unrealistic age
      };

      const token = 'valid-token';
      const response = await request(app)
        .post('/api/profiles')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidProfile);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .post('/api/profiles')
        .send(validProfile);

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/profiles/me', () => {
    it('should return the authenticated user profile', async () => {
      const mockProfile = {
        id: '1',
        userId: '1',
        height: 180,
        weight: 75.5,
        age: 28,
        fitnessGoal: 'BUILD_MUSCLE',
        activityLevel: 'MODERATE',
        medicalConditions: ['None'],
        dietaryRestrictions: ['None'],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      prismaMock.profile.findUnique.mockResolvedValue(mockProfile);

      const token = 'valid-token';
      const response = await request(app)
        .get('/api/profiles/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.height).toBe(mockProfile.height);
    });

    it('should return 404 when profile not found', async () => {
      prismaMock.profile.findUnique.mockResolvedValue(null);

      const token = 'valid-token';
      const response = await request(app)
        .get('/api/profiles/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/profiles/me', () => {
    const updateData = {
      weight: 76.2,
      fitnessGoal: 'LOSE_WEIGHT',
      activityLevel: 'VERY_ACTIVE'
    };

    it('should update the profile successfully', async () => {
      const mockUpdatedProfile = {
        id: '1',
        userId: '1',
        height: 180,
        ...updateData,
        age: 28,
        medicalConditions: ['None'],
        dietaryRestrictions: ['None'],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      prismaMock.profile.update.mockResolvedValue(mockUpdatedProfile);

      const token = 'valid-token';
      const response = await request(app)
        .put('/api/profiles/me')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.weight).toBe(updateData.weight);
      expect(response.body.fitnessGoal).toBe(updateData.fitnessGoal);
    });

    it('should return 400 for invalid update data', async () => {
      const invalidUpdateData = {
        weight: -50, // Invalid negative weight
        fitnessGoal: 'INVALID_GOAL' // Invalid enum value
      };

      const token = 'valid-token';
      const response = await request(app)
        .put('/api/profiles/me')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidUpdateData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 404 when trying to update non-existent profile', async () => {
      prismaMock.profile.update.mockRejectedValue(new Error('Profile not found'));

      const token = 'valid-token';
      const response = await request(app)
        .put('/api/profiles/me')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/profiles/me', () => {
    it('should delete the profile successfully', async () => {
      prismaMock.profile.delete.mockResolvedValue({} as any);

      const token = 'valid-token';
      const response = await request(app)
        .delete('/api/profiles/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('should return 404 when trying to delete non-existent profile', async () => {
      prismaMock.profile.delete.mockRejectedValue(new Error('Profile not found'));

      const token = 'valid-token';
      const response = await request(app)
        .delete('/api/profiles/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });
});
