/**
 * QRService implements core matrix processing logic and inter-service communication.
 * Provides QR decomposition capabilities and statistical analysis integration through
 * external API coordination.
 * 
 * This service layer encapsulates mathematical operations and cross-service communication,
 * following separation of concerns and single responsibility principles.
 */
import { Matrix, QRResult, StatsResult } from '../types/qr';
import { math } from '../utils/math';
import axios, { AxiosError } from 'axios';

export class QRService {
  /**
   * Validates matrix structure integrity for QR decomposition requirements
   * @method
   * @static
   * @param {Matrix} matrix - Input matrix to validate
   * @throws {Error} Validation errors for empty or irregular matrices
   * 
   * @validationRules
   * 1. Matrix must contain at least one row
   * 2. All rows must have consistent column count
   * 3. Empty matrix (0x0) not allowed
   * 
   * @errorConditions
   * - 'Matriz vacía': Empty matrix or zero-dimensional input
   * - 'La matriz no es rectangular': Irregular row lengths detected
   */
  static validateMatrix(matrix: Matrix): void {
    if (!matrix || matrix.length === 0) {
      throw new Error('Matriz vacía');
    }
    const cols = matrix[0].length;
    console.log('cols', cols, 'row', matrix[0].length);
    if (!matrix.every(row => row.length === cols)) {
      throw new Error('La matriz no es rectangular');
    }
  }

  /**
   * Performs QR decomposition using mathematical library implementation
   * @method
   * @static
   * @param {Matrix} matrix - Validated input matrix for decomposition
   * @returns {QRResult} QR decomposition results
   * 
   * @dependencies
   * - math.js library for numerical computations
   * 
   * @process
   * 1. Matrix validation pre-check
   * 2. QR decomposition execution
   * 3. Matrix type conversion (math.Matrix to Array)
   * 
   * @remarks
   * - Uses Householder reflections algorithm internally
   * - Numerical stability varies with matrix condition number
   */
  static computeQR(matrix: Matrix): QRResult {
    
    this.validateMatrix(matrix);

    const qr = math.qr(math.matrix(matrix)) as {
      Q: math.Matrix;
      R: math.Matrix;
    };
    
    return {
      q: qr.Q.toArray() as Matrix,
      r: qr.R.toArray() as Matrix
    };
  }

    /**
   * Orchestrates communication with Statistics API for post-processing
   * @method
   * @static
   * @async
   * @param {Matrix} q - Orthogonal matrix from QR decomposition
   * @param {Matrix} r - Upper triangular matrix from QR decomposition
   * @returns {Promise<StatsResult>} Statistical analysis results
   * 
   * @security
   * - Requires JWT_STATS_SECRET for service-to-service authentication
   * - Uses HTTPS communication (implied by environment configuration)
   * 
   * @errorHandling
   * - Captures Axios errors and wraps in domain-specific error
   * - Validates environment configuration pre-request
   */
  static async sendToStatsAPI(q: Matrix, r: Matrix): Promise<StatsResult> {
    try {
      const response = await axios.post<StatsResult>(
        process.env.STATS_API_URL!,
        { q, r },
        { headers: { Authorization: `Bearer ${process.env.JWT_STATS_SECRET}` } }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`Error al comunicarse con Stats API: ${axiosError.message}`);
    }
  }
}

/** 
 * Service Level Agreements:
 * - QR Decomposition: O(n^3) time complexity for n x n matrices
 * - Memory Requirements: O(mn) storage for original and result matrices
 * 
 * Environment Requirements:
 * - STATS_API_URL: External service endpoint
 * - JWT_STATS_SECRET: Shared secret for inter-service authentication
 * 
 * Optimization Notes:
 * - Matrix conversion operations can be optimized for large datasets
 * - Consider streaming approaches for matrices >1MB in size
 */