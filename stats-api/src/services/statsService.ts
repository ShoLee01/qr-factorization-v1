/**
 * StatsService implements core analytical operations for matrix statistical analysis.
 * Provides computational logic for deriving key metrics from QR decomposition results.
 * 
 * This service encapsulates numerical analysis algorithms and matrix validation logic,
 * following SOLID principles for maintainability and testability.
 */
import { Matrix, StatsResponse } from '../types/stats';

export class StatsService {

  /**
   * Computes comprehensive statistics from QR decomposition matrices
   * @method
   * @static
   * @param {Matrix} q - Orthogonal matrix from QR decomposition
   * @param {Matrix} r - Upper triangular matrix from QR decomposition
   * @returns {StatsResponse} Statistical metrics including extremal values and matrix properties
   * 
   * @processFlow
   * 1. Value aggregation: Combine all matrix elements
   * 2. Basic statistics: Calculate max, min, sum, average
   * 3. Matrix analysis: Check diagonal properties
   * 4. Precision formatting: Round numerical results to 4 decimals
   * 
   * @remarks
   * - Uses 1e-6 tolerance for diagonal validation
   * - Handles floating point precision artifacts
   * - Processes matrices of any rectangular dimensions
   */
  static calculateStats(q: Matrix, r: Matrix): StatsResponse {
    const allValues = [...q.flat(), ...r.flat()];
    
    // Calcular estadísticas básicas
    const max = Math.max(...allValues);
    const min = Math.min(...allValues);
    const total = allValues.reduce((a, b) => a + b, 0);
    const average = total / allValues.length;

    return {
      max: Number(max.toFixed(4)),
      min: Number(min.toFixed(4)),
      total: Number(total.toFixed(4)),
      average: Number(average.toFixed(4)),
      isQDiagonal: this.isDiagonal(q),
      isRDiagonal: this.isDiagonal(r)
    };
  }

  /**
   * Determines matrix diagonal dominance using numerical tolerance
   * @method
   * @private
   * @static
   * @param {Matrix} matrix - Matrix to analyze
   * @returns {boolean} True if non-diagonal elements below 1e-6 threshold
   * 
   * @validationLogic
   * 1. Iterate through all matrix elements
   * 2. Check non-diagonal positions (i ≠ j)
   * 3. Apply absolute value threshold
   * 4. Early exit on first non-conforming element
   * 
   * @numericalConsiderations
   * - Uses 1e-6 tolerance for floating point comparisons
   * - Accounts for numerical computation artifacts
   */
  private static isDiagonal(matrix: Matrix): boolean {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (i !== j && Math.abs(matrix[i][j]) >= 1e-6) return false;
      }
    }
    return true;
  }
}

/** 
 * Computational Complexity:
 * - Time: O(mn) for m×n matrices
 * - Space: O(mn) for value aggregation
 * 
 * Precision Handling:
 * - Fixed 4 decimal rounding for output metrics
 * - Configurable epsilon value for diagonal check
 * 
 * Edge Cases:
 * - Empty matrices (should be prevented upstream)
 * - NaN/infinite values (requires input sanitization)
 * - Zero-size matrices (dimensionality validation)
 * 
 * Optimization Notes:
 * - Parallel processing for large matrices
 * - Memory-efficient streaming for giant datasets
 * - SIMD optimizations for value aggregation
 */