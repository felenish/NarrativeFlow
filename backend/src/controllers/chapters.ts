import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllChapters = async (req: Request, res: Response) => {
  const chapters = await prisma.chapter.findMany();
  res.json(chapters);
};

export const createChapter = async (req: Request, res: Response) => {
  const { title, bookId } = req.body;
  if (!title || !bookId) return res.status(400).json({ error: 'title and bookId required' });
  const chapter = await prisma.chapter.create({ data: { title, bookId } });
  res.status(201).json(chapter);
};

export const getChapterById = async (req: Request, res: Response) => {
  const chapter = await prisma.chapter.findUnique({ where: { id: req.params.id } });
  if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
  res.json(chapter);
};

export const updateChapter = async (req: Request, res: Response) => {
  const { title } = req.body;
  const chapter = await prisma.chapter.update({ where: { id: req.params.id }, data: { title } });
  res.json(chapter);
};

export const deleteChapter = async (req: Request, res: Response) => {
  await prisma.chapter.delete({ where: { id: req.params.id } });
  res.status(204).end();
};
