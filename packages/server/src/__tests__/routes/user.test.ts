// packages/server/src/__tests__/routes/user.test.ts
import { NextFunction, Request, Response } from 'express';
import request from 'supertest';
import { prismaMock } from '../../config/prisma';
import app from '../../app';
import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

// Mock implementations
const mockBcrypt = {
  hash: jest.fn(),
  compare: jest.fn()
};

const mockJwt = {
  sign: jest.fn()
};

jest.mock('bcryptjs', () => mockBcrypt);
jest.mock('jsonwebtoken', () => mockJwt);

describe('User Routes', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    nextFunction = jest.fn();

    // Reset mock implementations
    jest.clearAllMocks();
    mockBcrypt.hash.mockReset();
    mockBcrypt.compare.mockReset();
    mockJwt.sign.mockReset();
  });

  describe('POST /api/users/register', () => {
    const validUser = {
      email: 'test@example.com',
      password: 'Password123!',
      name: 'Test User'
    };

    it('should register a new user successfully', async () => {
      const hashedPassword = 'hashedPassword123';
      mockBcrypt.hash.mockResolvedValue(hashedPassword);

      prismaMock.user.create.mockResolvedValue({
        id: '1',
        email: validUser.email,
        password: hashedPassword,
        name: validUser.name,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const response = await request(app)
        .post('/api/users/register')
        .send(validUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email', validUser.email);
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 400 for invalid user data', async () => {
      const invalidUser = {
        email: 'invalid-email',
        password: '123'
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 409 if email already exists', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: '1',
        email: validUser.email,
        password: 'hashedPassword',
        name: 'Existing User',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const response = await request(app)
        .post('/api/users/register')
        .send(validUser);

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/users/login', () => {
    const validCredentials = {
      email: 'test@example.com',
      password: 'Password123!'
    };

    it('should login successfully with valid credentials', async () => {
      mockBcrypt.compare.mockResolvedValue(true);
      mockJwt.sign.mockReturnValue('mock-token');

      prismaMock.user.findUnique.mockResolvedValue({
        id: '1',
        email: validCredentials.email,
        password: 'hashedPassword',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const response = await request(app)
        .post('/api/users/login')
        .send(validCredentials);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    it('should return 401 for invalid credentials', async () => {
      mockBcrypt.compare.mockResolvedValue(false);

      prismaMock.user.findUnique.mockResolvedValue({
        id: '1',
        email: validCredentials.email,
        password: 'hashedPassword',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const response = await request(app)
        .post('/api/users/login')
        .send(validCredentials);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
});
