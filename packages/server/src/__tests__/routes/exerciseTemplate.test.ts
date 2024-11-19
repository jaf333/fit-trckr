// packages/server/src/__tests__/routes/exerciseTemplate.test.ts
import { NextFunction, Request, Response } from 'express';
import request from 'supertest';
import { prismaMock } from '../../config/prisma';
import app from '../../app';
import { jest, expect, describe, it, beforeEach } from '@jest/globals';

describe('Exercise Template Routes', () => {
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

  describe('POST /api/exercise-templates', () => {
    const validTemplate = {
      name: 'Bench Press',
      category: 'CHEST',
      description: 'Classic chest exercise with barbell',
      difficulty: 'INTERMEDIATE',
      equipment: ['BARBELL', 'BENCH'],
      muscles: ['CHEST', 'TRICEPS', 'SHOULDERS'],
      instructions: [
        'Lie on the bench with feet flat on the ground',
        'Grip the barbell slightly wider than shoulder width',
        'Lower the bar to your chest',
        'Press the bar back up to starting position'
      ]
    };

    it('should create a new exercise template successfully', async () => {
      const mockTemplate = {
        id: '1',
        ...validTemplate,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      prismaMock.exerciseTemplate.create.mockResolvedValue(mockTemplate);

      const token = 'valid-token';
      const response = await request(app)
        .post('/api/exercise-templates')
        .set('Authorization', `Bearer ${token}`)
        .send(validTemplate);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(validTemplate.name);
      expect(response.body.category).toBe(validTemplate.category);
    });

    it('should return 400 for invalid template data', async () => {
      const invalidTemplate = {
        name: '', // Empty name
        category: 'INVALID_CATEGORY', // Invalid category
        difficulty: 'SUPER_HARD' // Invalid difficulty
      };

      const token = 'valid-token';
      const response = await request(app)
        .post('/api/exercise-templates')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidTemplate);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .post('/api/exercise-templates')
        .send(validTemplate);

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/exercise-templates', () => {
    it('should return all exercise templates', async () => {
      const mockTemplates = [
        {
          id: '1',
          name: 'Bench Press',
          category: 'CHEST',
          description: 'Classic chest exercise',
          difficulty: 'INTERMEDIATE',
          equipment: ['BARBELL', 'BENCH'],
          muscles: ['CHEST', 'TRICEPS'],
          instructions: ['Step 1', 'Step 2'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          name: 'Squat',
          category: 'LEGS',
          description: 'Classic leg exercise',
          difficulty: 'INTERMEDIATE',
          equipment: ['BARBELL', 'RACK'],
          muscles: ['QUADRICEPS', 'GLUTES'],
          instructions: ['Step 1', 'Step 2'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      prismaMock.exerciseTemplate.findMany.mockResolvedValue(mockTemplates);

      const response = await request(app)
        .get('/api/exercise-templates');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
    });

    it('should filter exercise templates by category', async () => {
      const mockTemplates = [
        {
          id: '1',
          name: 'Bench Press',
          category: 'CHEST',
          description: 'Classic chest exercise',
          difficulty: 'INTERMEDIATE',
          equipment: ['BARBELL', 'BENCH'],
          muscles: ['CHEST', 'TRICEPS'],
          instructions: ['Step 1', 'Step 2'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      prismaMock.exerciseTemplate.findMany.mockResolvedValue(mockTemplates);

      const response = await request(app)
        .get('/api/exercise-templates')
        .query({ category: 'CHEST' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].category).toBe('CHEST');
    });
  });

  describe('GET /api/exercise-templates/:id', () => {
    it('should return a specific exercise template', async () => {
      const mockTemplate = {
        id: '1',
        name: 'Bench Press',
        category: 'CHEST',
        description: 'Classic chest exercise',
        difficulty: 'INTERMEDIATE',
        equipment: ['BARBELL', 'BENCH'],
        muscles: ['CHEST', 'TRICEPS'],
        instructions: ['Step 1', 'Step 2'],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      prismaMock.exerciseTemplate.findUnique.mockResolvedValue(mockTemplate);

      const response = await request(app)
        .get('/api/exercise-templates/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', '1');
      expect(response.body.name).toBe(mockTemplate.name);
    });

    it('should return 404 for non-existent template', async () => {
      prismaMock.exerciseTemplate.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .get('/api/exercise-templates/999');

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/exercise-templates/:id', () => {
    const updateData = {
      name: 'Updated Bench Press',
      description: 'Updated description',
      difficulty: 'ADVANCED'
    };

    it('should update the exercise template successfully', async () => {
      const mockUpdatedTemplate = {
        id: '1',
        name: updateData.name,
        category: 'CHEST',
        description: updateData.description,
        difficulty: updateData.difficulty,
        equipment: ['BARBELL', 'BENCH'],
        muscles: ['CHEST', 'TRICEPS'],
        instructions: ['Step 1', 'Step 2'],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      prismaMock.exerciseTemplate.update.mockResolvedValue(mockUpdatedTemplate);

      const token = 'valid-token';
      const response = await request(app)
        .put('/api/exercise-templates/1')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updateData.name);
      expect(response.body.description).toBe(updateData.description);
    });

    it('should return 404 for non-existent template', async () => {
      prismaMock.exerciseTemplate.update.mockRejectedValue(new Error('Not found'));

      const token = 'valid-token';
      const response = await request(app)
        .put('/api/exercise-templates/999')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/exercise-templates/:id', () => {
    it('should delete the exercise template successfully', async () => {
      prismaMock.exerciseTemplate.delete.mockResolvedValue({} as any);

      const token = 'valid-token';
      const response = await request(app)
        .delete('/api/exercise-templates/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('should return 404 for non-existent template', async () => {
      prismaMock.exerciseTemplate.delete.mockRejectedValue(new Error('Not found'));

      const token = 'valid-token';
      const response = await request(app)
        .delete('/api/exercise-templates/999')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });
});
