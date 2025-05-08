import { Matrix, StatsResponse } from '../types/stats';

export class StatsService {
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

  private static isDiagonal(matrix: Matrix): boolean {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (i !== j && Math.abs(matrix[i][j]) > 1e-6) return false;
      }
    }
    return true;
  }
}