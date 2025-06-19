import { Request, Response } from 'express';
import prisma from '../prisma';

export const getDiff = async (req: Request, res: Response) => {
  // Placeholder: real diff logic will be implemented later
  res.json({ message: 'Get diff (not implemented)' });
};
