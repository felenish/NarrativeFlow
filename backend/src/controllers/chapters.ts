import { Request, Response } from 'express';

export const getAllChapters = (req: Request, res: Response) => {
  res.json({ message: 'List all chapters (not implemented)' });
};

export const createChapter = (req: Request, res: Response) => {
  res.json({ message: 'Create a chapter (not implemented)' });
};

export const getChapterById = (req: Request, res: Response) => {
  res.json({ message: `Get chapter ${req.params.id} (not implemented)` });
};

export const updateChapter = (req: Request, res: Response) => {
  res.json({ message: `Update chapter ${req.params.id} (not implemented)` });
};

export const deleteChapter = (req: Request, res: Response) => {
  res.json({ message: `Delete chapter ${req.params.id} (not implemented)` });
};
