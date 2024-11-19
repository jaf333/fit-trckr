import { jest } from '@jest/globals';

const mockBcrypt = {
  hash: jest.fn().mockImplementation(() => Promise.resolve('hashed_password')),
  compare: jest.fn().mockImplementation(() => Promise.resolve(true))
};

const mockJwt = {
  sign: jest.fn().mockImplementation(() => 'mock_token')
};

jest.mock('bcryptjs', () => mockBcrypt);
jest.mock('jsonwebtoken', () => mockJwt);

export { mockBcrypt, mockJwt };
