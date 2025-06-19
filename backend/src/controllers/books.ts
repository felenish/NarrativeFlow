import { Request, Response } from 'express';

export const getAllBooks = (req: Request, res: Response) => {
  res.json({ message: 'List all books (not implemented)' });
};

export const createBook = (req: Request, res: Response) => {
  res.json({ message: 'Create a book (not implemented)' });
};

export const getBookById = (req: Request, res: Response) => {
  res.json({ message: `Get book ${req.params.id} (not implemented)` });
};

export const updateBook = (req: Request, res: Response) => {
  res.json({ message: `Update book ${req.params.id} (not implemented)` });
};

export const deleteBook = (req: Request, res: Response) => {
  res.json({ message: `Delete book ${req.params.id} (not implemented)` });
};
