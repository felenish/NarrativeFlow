import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllBranches = async (req: Request, res: Response) => {
  const branches = await prisma.branch.findMany();
  res.json(branches);
};

export const createBranch = async (req: Request, res: Response) => {
  const { name, bookId } = req.body;
  if (!name || !bookId) return res.status(400).json({ error: 'name and bookId required' });
  const branch = await prisma.branch.create({ data: { name, bookId } });
  res.status(201).json(branch);
};

export const getBranchById = async (req: Request, res: Response) => {
  const branch = await prisma.branch.findUnique({ where: { id: req.params.id } });
  if (!branch) return res.status(404).json({ error: 'Branch not found' });
  res.json(branch);
};

export const mergeBranch = async (req: Request, res: Response) => {
  // Placeholder for merge logic
  res.json({ message: `Merge branch ${req.params.id} (not implemented)` });
};
