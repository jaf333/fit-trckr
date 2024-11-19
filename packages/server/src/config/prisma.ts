// packages/server/src/config/prisma.ts
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

export const prisma = new PrismaClient();
export const prismaMock = mockDeep<PrismaClient>() as DeepMockProxy<PrismaClient>;

export default prisma;
