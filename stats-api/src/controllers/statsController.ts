/**
 * StatsController handles statistical computation requests for matrix analysis operations.
 * Serves as the API gateway for processing QR decomposition results and deriving analytics.
 * 
 * This controller acts as the primary entry point for statistical data processing,
 * bridging HTTP requests with core statistical business logic.
 */
import { Request, Response } from 'express';
import { StatsService } from '../services/statsService';
import { StatsRequest, StatsResponse, ErrorResponse } from '../types/stats';

export class StatsController {
  /**
   * Endpoint handler for matrix statistical analysis
   * @method
   * @async
   * @param {Request} req - Express request object with QR matrices payload
   * @param {Response<StatsResponse | ErrorResponse>} res - Express response object
   * @returns {Promise<void>} Promise resolving with statistical metrics or error payload
   * 
   * @processFlow
   * 1. Extract Q and R matrices from request body
   * 2. Validate matrix structure and content
   * 3. Delegate computation to StatsService
   * 4. Format and return standardized response
   * 
   * @errorHandling
   * - Handles service layer exceptions
   * - Returns 500 status for processing errors
   * - Preserves error details in development environment
   */
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