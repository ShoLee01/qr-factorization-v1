import { Router } from 'express';
import { StatsController } from '../controllers/statsController';
import { authenticateJWT } from '../middleware/jwtMiddleware';
import { loginHandler } from '../services/loginService';

const router = Router();

router.post('/stats', authenticateJWT, StatsController.calculateStats);
router.get('/login', loginHandler);

export default router;