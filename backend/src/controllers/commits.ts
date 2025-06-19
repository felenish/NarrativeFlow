import { Request, Response } from 'express';

export const getAllCommits = (req: Request, res: Response) => {
  res.json({ message: 'List all commits (not implemented)' });
};

export const createCommit = (req: Request, res: Response) => {
  res.json({ message: 'Create a commit (not implemented)' });
};

export const getCommitById = (req: Request, res: Response) => {
  res.json({ message: `Get commit ${req.params.id} (not implemented)` });
};
