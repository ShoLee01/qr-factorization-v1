import { Router } from 'express';
import { QRController } from '../controllers/qrController';
import { authenticateJWT } from '../middleware/jwtMiddleware';
import { loginHandler } from '../services/loginService';

const router = Router();

router.post('/qr', authenticateJWT, QRController.processMatrix);
router.get('/login', loginHandler);

export default router;