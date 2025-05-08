import { StatsService } from '../src/services/statsService';

describe('Stats Service Unit Tests', () => {
  describe('calculateStats', () => {
    it('should calculate correct statistics', () => {
      const q = [[1, 0], [0, 1]];
      const r = [[2, 3], [0, 4]];
      const result = StatsService.calculateStats(q, r);
      
      expect(result.max).toBe(4);
      expect(result.min).toBe(0);
      expect(result.total).toBe(1+0+0+1+2+3+0+4);
    });
  });

  describe('isDiagonal', () => {
    it('should identify diagonal matrices', () => {
      const matrix = [[1, 0], [0, 1]];
      expect(StatsService['isDiagonal'](matrix)).toBe(true);
    });

    it('should handle floating point precision edge cases', () => {
        const matrix = [
          [1, 0.0000001], // 1e-7 (debería pasar)
          [1, 0.000001],  // 1e-6 (debería fallar)
          [1, 0.0000011]  // >1e-6 (debería fallar)
        ];
        
        expect(StatsService['isDiagonal']([matrix[0]])).toBe(true);
        expect(StatsService['isDiagonal']([matrix[1]])).toBe(false);
        expect(StatsService['isDiagonal']([matrix[2]])).toBe(false);
      });
  });
});