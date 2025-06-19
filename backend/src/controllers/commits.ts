import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllCommits = async (req: Request, res: Response) => {
  const commits = await prisma.commit.findMany();
  res.json(commits);
};

export const createCommit = async (req: Request, res: Response) => {
  const { branchId, message, parentId } = req.body;
  if (!branchId || !message) return res.status(400).json({ error: 'branchId and message required' });
  const commit = await prisma.commit.create({ data: { branchId, message, parentId } });
  res.status(201).json(commit);
};

export const getCommitById = async (req: Request, res: Response) => {
  const commit = await prisma.commit.findUnique({ where: { id: req.params.id } });
  if (!commit) return res.status(404).json({ error: 'Commit not found' });
  res.json(commit);
};
