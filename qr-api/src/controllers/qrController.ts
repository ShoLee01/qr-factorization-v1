/**
 * QRController handles HTTP requests for matrix processing operations.
 * Coordinates QR decomposition computation and statistics integration between services.
 * 
 * This class serves as the entry point for matrix transformation requests, 
 * orchestrating the workflow between QR decomposition and statistical analysis.
 */
import { Request, Response } from 'express';
import { QRService } from '../services/qrService';
import { QRResult, StatsResult, ErrorResponse } from '../types/qr';
  /**
   * Processes matrix input through QR decomposition and statistical analysis pipeline
   * @method
   * @async
   * @param {Request} req - Express request object containing matrix payload
   * @param {Response<QRResult | ErrorResponse>} res - Express response object
   * @returns {Promise<void>} Promise resolving with combined QR decomposition results 
   *                          and statistics or error payload
   * @throws {Error} Propagates service layer errors with contextual information
   * @remarks
   * - Handles full processing workflow from input validation to final response
   * - Implements error handling middleware pattern for service failures
   * - Maintains separation of concerns between controller and service layers
   */
export class QRController {
  static async processMatrix(req: Request, res: Response<QRResult | ErrorResponse>) {
    try {
      const matrix: any = req.body.matrix;
      const { q, r } = QRService.computeQR(matrix);
      const stats: StatsResult = await QRService.sendToStatsAPI(q, r);
      res.json({ q, r, ...stats });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ 
        error: 'Error procesando matriz',
        details: err.message 
      });
    }
  }
}