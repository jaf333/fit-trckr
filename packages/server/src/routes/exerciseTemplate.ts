// src/routes/exerciseTemplate.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const exerciseTemplateSchema = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string().optional(),
  defaultSets: z.number().int().positive().optional(),
  defaultReps: z.number().int().positive().optional(),
  defaultWeight: z.number().optional(),
});

router.post('/', authMiddleware, validateRequest(exerciseTemplateSchema), async (req, res) => {
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

router.patch('/:id', authMiddleware, validateRequest(exerciseTemplateSchema), async (req, res) => {
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