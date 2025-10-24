import { Router } from 'express';
import { listarRepositorios } from '../controllers/githubController.js';

const router = Router();

router.get('/repos/:username', listarRepositorios);

export default router;
