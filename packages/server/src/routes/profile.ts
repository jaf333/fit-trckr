// src/routes/profile.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { profileSchema } from '../validators/schemas';

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - height
 *         - weight
 *       properties:
 *         height:
 *           type: number
 *           description: User's height in centimeters
 *         weight:
 *           type: number
 *           description: User's current weight in kilograms
 *         goalWeight:
 *           type: number
 *           description: User's target weight in kilograms
 *         birthDate:
 *           type: string
 *           format: date
 *           description: User's date of birth
 *         gender:
 *           type: string
 *           enum: [MALE, FEMALE, OTHER]
 *           description: User's gender
 */

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Create a new user profile
 *     tags: [Profiles]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Failed to create profile
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, validateRequest(profileSchema), async (req, res) => {
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

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Get user profile
 *     tags: [Profiles]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized
 */
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

/**
 * @swagger
 * /api/profiles:
 *   patch:
 *     summary: Update user profile
 *     tags: [Profiles]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Failed to update profile
 *       401:
 *         description: Unauthorized
 */
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
