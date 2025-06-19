import { Router } from 'express';
import * as chaptersController from '../controllers/chapters';

const router = Router();

router.get('/', chaptersController.getAllChapters);
router.post('/', chaptersController.createChapter);
router.get('/:id', chaptersController.getChapterById);
router.patch('/:id', chaptersController.updateChapter);
router.delete('/:id', chaptersController.deleteChapter);

export default router;
