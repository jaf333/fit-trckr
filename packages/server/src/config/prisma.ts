// packages/server/src/config/prisma.ts
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

export type Context = {
  prisma: PrismaClient;
};

export const prisma = new PrismaClient();
export const prismaMock = mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

export default prisma;
