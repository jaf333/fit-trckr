// src/routes/exerciseTemplate.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { exerciseSchema } from '@/validators/schemas';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     ExerciseTemplate:
 *       type: object
 *       required:
 *         - name
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the exercise
 *         category:
 *           type: string
 *           description: Category of the exercise (e.g., 'CHEST', 'LEGS')
 *         description:
 *           type: string
 *           description: Detailed description of the exercise
 *         defaultSets:
 *           type: integer
 *           minimum: 1
 *           description: Default number of sets
 *         defaultReps:
 *           type: integer
 *           minimum: 1
 *           description: Default number of repetitions
 *         defaultWeight:
 *           type: number
 *           description: Default weight in kilograms
 */

/**
 * @swagger
 * /api/exercise-templates:
 *   post:
 *     summary: Create a new exercise template
 *     tags: [Exercise Templates]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExerciseTemplate'
 *     responses:
 *       200:
 *         description: Exercise template created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExerciseTemplate'
 *       400:
 *         description: Failed to create exercise template
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, validateRequest(exerciseSchema), async (req, res) => {
  try {
    const userId = req.user!.userId;
    const template = await prisma.exerciseTemplate.create({
      data: {
        ...req.body,
        userId
      }
    });
    res.json(template);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create exercise template' });
  }
});

/**
 * @swagger
 * /api/exercise-templates:
 *   get:
 *     summary: Get all exercise templates for user
 *     tags: [Exercise Templates]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of exercise templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExerciseTemplate'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const templates = await prisma.exerciseTemplate.findMany({
      where: { userId }
    });
    res.json(templates);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch exercise templates' });
  }
});

/**
 * @swagger
 * /api/exercise-templates/{id}:
 *   patch:
 *     summary: Update an exercise template
 *     tags: [Exercise Templates]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exercise template ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExerciseTemplate'
 *     responses:
 *       200:
 *         description: Exercise template updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExerciseTemplate'
 *       400:
 *         description: Failed to update exercise template
 *       401:
 *         description: Unauthorized
 */
router.patch('/:id', authMiddleware, validateRequest(exerciseSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const template = await prisma.exerciseTemplate.update({
      where: {
        id,
        userId // Ensure user owns the template
      },
      data: req.body
    });
    res.json(template);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update exercise template' });
  }
});

/**
 * @swagger
 * /api/exercise-templates/{id}:
 *   delete:
 *     summary: Delete an exercise template
 *     tags: [Exercise Templates]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exercise template ID
 *     responses:
 *       204:
 *         description: Exercise template deleted successfully
 *       400:
 *         description: Failed to delete exercise template
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    await prisma.exerciseTemplate.delete({
      where: {
        id,
        userId
      }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete exercise template' });
  }
});

export const exerciseTemplateRouter = router;
