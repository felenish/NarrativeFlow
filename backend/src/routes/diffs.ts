import { Router } from 'express';
import * as diffsController from '../controllers/diffs';

const router = Router();

router.get('/', diffsController.getDiff);

export default router;
