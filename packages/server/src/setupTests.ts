// packages/server/src/setupTests.ts
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { beforeEach } from '@jest/globals';

export type Context = {
  prisma: PrismaClient;
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

export const prismaMock = mockDeep<PrismaClient>();

jest.mock('./config/prisma', () => ({
  __esModule: true,
  default: prismaMock,
  prisma: prismaMock,
}));

beforeEach(() => {
  jest.clearAllMocks();
});
