// packages/server/src/__tests__/routes/user.test.ts
import { NextFunction, Request, Response } from 'express';
import { prismaMock } from '../../config/prisma';
import request from 'supertest';
import app from '../../app';  // Necesitaremos crear este archivo
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('User Routes', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('POST /api/users/register', () => {
    const validUser = {
      email: 'test@example.com',
      password: 'Password123!',
      name: 'Test User'
    };

    it('should register a new user successfully', async () => {
      const hashedPassword = 'hashedPassword123';
      (bcryptjs.hash as jest.Mock).mockResolvedValue(hashedPassword);

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
        password: '123'  // too short
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
      const hashedPassword = 'hashedPassword123';
      (bcryptjs.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('mock-token');

      prismaMock.user.findUnique.mockResolvedValue({
        id: '1',
        email: validCredentials.email,
        password: hashedPassword,
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
      (bcryptjs.compare as jest.Mock).mockResolvedValue(false);

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
