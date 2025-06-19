import { Router } from 'express';
import * as branchesController from '../controllers/branches';

const router = Router();

router.get('/', branchesController.getAllBranches);
router.post('/', branchesController.createBranch);
router.get('/:id', branchesController.getBranchById);
router.post('/:id/merge', branchesController.mergeBranch);

export default router;
