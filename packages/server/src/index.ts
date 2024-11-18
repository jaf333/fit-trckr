// src/index.ts
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { userRouter } from './routes/user';
import { workoutRouter } from './routes/workout';
import { authMiddleware } from './middleware/auth';
import { profileRouter } from './routes/profile';
import { exerciseTemplateRouter } from './routes/exerciseTemplate';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/users', userRouter);
app.use('/api/workouts', authMiddleware, workoutRouter);
app.use('/api/profile', profileRouter);
app.use('/api/exercise-templates', exerciseTemplateRouter);

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

async function main() {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();