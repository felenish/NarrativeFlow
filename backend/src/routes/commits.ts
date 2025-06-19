import { Router } from 'express';
import * as commitsController from '../controllers/commits';

const router = Router();

router.get('/', commitsController.getAllCommits);
router.post('/', commitsController.createCommit);
router.get('/:id', commitsController.getCommitById);

export default router;
