// packages/server/src/__tests__/user.test.ts
import { describe, expect, it, jest } from '@jest/globals';
import supertest from 'supertest';
import app from '../app';
import { mockCtx } from './setup';

const request = supertest(app);

// Mock bcryptjs
jest.mock('bcryptjs', () => ({
  hash: () => Promise.resolve('hashed_password'),
  compare: () => Promise.resolve(true)
}));

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: () => 'mock_token'
}));

describe('User Routes', () => {
  const validUser = {
    email: 'test@example.com',
    password: 'Password123!',
    name: 'Test User'
  };

  describe('POST /api/users/register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        id: '1',
        ...validUser,
        password: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockCtx.prisma.user.create.mockResolvedValueOnce(mockUser);

      const response = await request
        .post('/api/users/register')
        .send(validUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email', validUser.email);
      expect(response.body).not.toHaveProperty('password');
    });
  });

  describe('POST /api/users/login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockUser = {
        id: '1',
        email: validUser.email,
        password: 'hashed_password',
        name: validUser.name,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockCtx.prisma.user.findUnique.mockResolvedValueOnce(mockUser);

      const response = await request
        .post('/api/users/login')
        .send({
          email: validUser.email,
          password: validUser.password
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('id');
    });
  });
});
