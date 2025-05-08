import { Request, Response } from 'express';
import { StatsService } from '../services/statsService';
import { StatsRequest, StatsResponse, ErrorResponse } from '../types/stats';

export class StatsController {
  static async calculateStats(req: Request, res: Response<StatsResponse | ErrorResponse>) {
    try {
      const { q, r } = req.body as StatsRequest;
      const stats = StatsService.calculateStats(q, r);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error calculando estadísticas', 
        details: (error as Error).message 
      });
    }
  }
}