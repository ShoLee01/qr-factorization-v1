export type Matrix = number[][];

export interface QRResult {
  q: Matrix;
  r: Matrix;
}

export interface StatsResult {
  max: number;
  min: number;
  average: number;
  total: number;
  isQDiagonal: boolean;
  isRDiagonal: boolean;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}