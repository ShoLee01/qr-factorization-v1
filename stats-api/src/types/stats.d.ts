export type Matrix = number[][];

export interface StatsRequest {
  q: Matrix;
  r: Matrix;
}

export interface StatsResponse {
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