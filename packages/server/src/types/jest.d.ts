// packages/server/src/types/jest.d.ts

import { Mock } from 'jest-mock';
import { PrismaClient } from '@prisma/client';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveProperty(key: string, value?: any): R;
    }
  }
}

declare module '@jest/globals' {
  export const jest: {
    fn(): Mock;
    fn<T extends (...args: any[]) => any>(implementation?: T): Mock<T>;
    clearAllMocks(): void;
    mock(moduleName: string, factory?: () => any): void;
    requireActual<T extends unknown>(moduleName: string): T;
  };
}
