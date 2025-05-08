import { Router } from 'express';
import { QRController } from '../controllers/qrController';
import { authenticateJWT } from '../middleware/jwtMiddleware';

const router = Router();

router.post('/qr', authenticateJWT, QRController.processMatrix);

export default router;