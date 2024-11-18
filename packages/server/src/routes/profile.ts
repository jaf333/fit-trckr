// src/routes/profile.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { height, weight, goalWeight, birthDate, gender } = req.body;
    const userId = req.user!.userId;

    const profile = await prisma.profile.create({
      data: {
        userId,
        height,
        weight,
        goalWeight,
        birthDate: birthDate ? new Date(birthDate) : undefined,
        gender
      }
    });

    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create profile' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const profile = await prisma.profile.findUnique({
      where: { userId }
    });
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch profile' });
  }
});

router.patch('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const { height, weight, goalWeight, birthDate, gender } = req.body;

    const profile = await prisma.profile.update({
      where: { userId },
      data: {
        height,
        weight,
        goalWeight,
        birthDate: birthDate ? new Date(birthDate) : undefined,
        gender
      }
    });

    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
});

export const profileRouter = router;