import { Request, Response } from 'express';

export const getAllScenes = (req: Request, res: Response) => {
  res.json({ message: 'List all scenes (not implemented)' });
};

export const createScene = (req: Request, res: Response) => {
  res.json({ message: 'Create a scene (not implemented)' });
};

export const getSceneById = (req: Request, res: Response) => {
  res.json({ message: `Get scene ${req.params.id} (not implemented)` });
};

export const updateScene = (req: Request, res: Response) => {
  res.json({ message: `Update scene ${req.params.id} (not implemented)` });
};

export const deleteScene = (req: Request, res: Response) => {
  res.json({ message: `Delete scene ${req.params.id} (not implemented)` });
};
