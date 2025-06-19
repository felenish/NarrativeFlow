import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllBooks = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  res.json(books);
};

export const createBook = async (req: Request, res: Response) => {
  const { title, userId } = req.body;
  if (!title || !userId) return res.status(400).json({ error: 'title and userId required' });
  const book = await prisma.book.create({ data: { title, userId } });
  res.status(201).json(book);
};

export const getBookById = async (req: Request, res: Response) => {
  const book = await prisma.book.findUnique({ where: { id: req.params.id } });
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const { title } = req.body;
  const book = await prisma.book.update({ where: { id: req.params.id }, data: { title } });
  res.json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
  await prisma.book.delete({ where: { id: req.params.id } });
  res.status(204).end();
};
