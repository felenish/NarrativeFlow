import { Router } from 'express';
import * as scenesController from '../controllers/scenes';

const router = Router();

router.get('/', scenesController.getAllScenes);
router.post('/', scenesController.createScene);
router.get('/:id', scenesController.getSceneById);
router.patch('/:id', scenesController.updateScene);
router.delete('/:id', scenesController.deleteScene);

export default router;
