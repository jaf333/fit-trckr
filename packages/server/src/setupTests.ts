// packages/server/src/setupTests.ts
import '@testing-library/jest-dom';
import { prismaMock } from './config/prisma';

jest.mock('./config/prisma', () => ({
  __esModule: true,
  default: prismaMock,
  prisma: prismaMock,
  prismaMock: prismaMock
}));

beforeEach(() => {
  jest.clearAllMocks();
});
