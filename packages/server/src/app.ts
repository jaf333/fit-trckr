// packages/server/src/app.ts
import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user';
import { workoutRouter } from './routes/workout';
import { authMiddleware } from './middleware/auth';
import { profileRouter } from './routes/profile';
import { exerciseTemplateRouter } from './routes/exerciseTemplate';

const app = express();

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

export default app;
