import { Router } from 'express';
import { StatsController } from '../controllers/statsController';
import { authenticateJWT } from '../middleware/jwtMiddleware';

const router = Router();

router.post('/stats', authenticateJWT, StatsController.calculateStats);

export default router;