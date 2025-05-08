import { Request, Response } from 'express';
import { QRService } from '../services/qrService';
import { QRResult, StatsResult, ErrorResponse } from '../types/qr';

export class QRController {
  static async processMatrix(req: Request, res: Response<QRResult | ErrorResponse>) {
    try {
      const matrix: any = req.body.matrix;
      const { q, r } = QRService.computeQR(matrix);
      const stats: StatsResult = await QRService.sendToStatsAPI(q, r);
      res.json({ q, r, ...stats });
      //res.json({ q, r });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ 
        error: 'Error procesando matriz',
        details: err.message 
      });
    }
  }
}