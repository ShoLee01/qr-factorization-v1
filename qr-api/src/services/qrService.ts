import { Matrix, QRResult, StatsResult } from '../types/qr';
import { math } from '../utils/math';
import axios, { AxiosError } from 'axios';

export class QRService {
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

  static computeQR(matrix: Matrix): QRResult {
    this
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