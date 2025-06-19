import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllScenes = async (req: Request, res: Response) => {
  const scenes = await prisma.scene.findMany();
  res.json(scenes);
};

export const createScene = async (req: Request, res: Response) => {
  const { title, content, chapterId } = req.body;
  if (!title || !content || !chapterId) return res.status(400).json({ error: 'title, content, and chapterId required' });
  const scene = await prisma.scene.create({ data: { title, content, chapterId } });
  res.status(201).json(scene);
};

export const getSceneById = async (req: Request, res: Response) => {
  const scene = await prisma.scene.findUnique({ where: { id: req.params.id } });
  if (!scene) return res.status(404).json({ error: 'Scene not found' });
  res.json(scene);
};

export const updateScene = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const scene = await prisma.scene.update({ where: { id: req.params.id }, data: { title, content } });
  res.json(scene);
};

export const deleteScene = async (req: Request, res: Response) => {
  await prisma.scene.delete({ where: { id: req.params.id } });
  res.status(204).end();
};
