import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllCommits = async (req: Request, res: Response) => {
  const commits = await prisma.commit.findMany();
  res.json(commits);
};

export const autoSaveDraft = async (req: Request, res: Response) => {
  // For MVP: Save a draft commit with a special message or flag
  const { branchId, parentId, content, filePath } = req.body;
  if (!branchId || !content || !filePath) {
    return res.status(400).json({ error: 'branchId, content, and filePath required' });
  }
  // Create a commit with a 'draft' message
  const commit = await prisma.commit.create({
    data: {
      branchId,
      message: '[draft]',
      parentId,
      snapshots: {
        create: [{ filePath, blobSha: content }], // For MVP, store content in blobSha
      },
    },
    include: { snapshots: true },
  });
  res.status(201).json(commit);
};

export const createCommit = async (req: Request, res: Response) => {
  const { branchId, message, parentId, content, filePath } = req.body;
  if (!branchId || !message || !content || !filePath) return res.status(400).json({ error: 'branchId, message, content, and filePath required' });
  const commit = await prisma.commit.create({
    data: {
      branchId,
      message,
      parentId,
      snapshots: {
        create: [{ filePath, blobSha: content }], // For MVP, store content in blobSha
      },
    },
    include: { snapshots: true },
  });
  res.status(201).json(commit);
};

export const getCommitById = async (req: Request, res: Response) => {
  const commit = await prisma.commit.findUnique({ where: { id: req.params.id } });
  if (!commit) return res.status(404).json({ error: 'Commit not found' });
  res.json(commit);
};
