// src/types/express.d.ts
declare namespace Express {
    export interface Request {
      user?: {
        userId: string;
        [key: string]: any;
      };
    }
  }