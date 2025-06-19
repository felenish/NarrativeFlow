import { Request, Response } from 'express';

export const getAllBranches = (req: Request, res: Response) => {
  res.json({ message: 'List all branches (not implemented)' });
};

export const createBranch = (req: Request, res: Response) => {
  res.json({ message: 'Create a branch (not implemented)' });
};

export const getBranchById = (req: Request, res: Response) => {
  res.json({ message: `Get branch ${req.params.id} (not implemented)` });
};

export const mergeBranch = (req: Request, res: Response) => {
  res.json({ message: `Merge branch ${req.params.id} (not implemented)` });
};
