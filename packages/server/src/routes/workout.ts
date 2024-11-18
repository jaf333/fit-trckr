// src/routes/workout.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const { name, date, exercises } = req.body;
    const userId = (req.user as any).userId;

    const workout = await prisma.workout.create({
      data: {
        name,
        date: new Date(date),
        userId,
        exercises: {
          create: exercises,
        },
      },
      include: {
        exercises: true,
      },
    });

    res.json(workout);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = (req.user as any).userId;
    const workouts = await prisma.workout.findMany({
      where: { userId },
      include: { exercises: true },
    });
    res.json(workouts);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch workouts' });
  }
});

export const workoutRouter = router;