import { Router } from 'express';
import * as commitsController from '../controllers/commits';

const router = Router();

router.get('/', commitsController.getAllCommits);
router.post('/', commitsController.createCommit);
router.get('/:id', commitsController.getCommitById);
router.post('/draft', commitsController.autoSaveDraft);

export default router;
