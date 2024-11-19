// src/routes/workout.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateRequest } from '../middleware/validate';
import { workoutSchema } from '../validators/schemas'

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       required:
 *         - sets
 *         - reps
 *         - weight
 *       properties:
 *         sets:
 *           type: integer
 *           minimum: 1
 *           description: Number of sets performed
 *         reps:
 *           type: integer
 *           minimum: 1
 *           description: Number of repetitions per set
 *         weight:
 *           type: number
 *           description: Weight used in kilograms
 *         notes:
 *           type: string
 *           description: Optional notes for the exercise
 *
 *     Workout:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - exercises
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the workout
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date and time of the workout
 *         exercises:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Exercise'
 *           description: List of exercises performed in the workout
 */

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Create a new workout
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       200:
 *         description: Workout created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Failed to create workout
 *       401:
 *         description: Unauthorized
 */
router.post('/', validateRequest(workoutSchema), async (req, res) => {
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

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Get all workouts for user
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Failed to fetch workouts
 *       401:
 *         description: Unauthorized
 */
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
