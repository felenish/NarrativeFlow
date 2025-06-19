import { Router } from 'express';
import * as booksController from '../controllers/books';

const router = Router();

router.get('/', booksController.getAllBooks);
router.post('/', booksController.createBook);
router.get('/:id', booksController.getBookById);
router.patch('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

export default router;
