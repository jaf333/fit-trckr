// packages/server/src/types/jest.d.ts
import { jest } from '@jest/globals';

declare global {
  const jest: typeof jest;
  const describe: typeof jest.describe;
  const expect: typeof jest.expect;
  const it: typeof jest.it;
  const beforeEach: typeof jest.beforeEach;
  const afterEach: typeof jest.afterEach;
  const beforeAll: typeof jest.beforeAll;
  const afterAll: typeof jest.afterAll;
}
