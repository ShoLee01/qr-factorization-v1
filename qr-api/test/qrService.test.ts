import { QRService } from "../src/services/qrService";

describe('QR Service Unit Tests', () => {
  describe('validateMatrix', () => {
    it('should reject empty matrix', () => {
      expect(() => QRService.validateMatrix([])).toThrow('Matriz vacía');
    });

    it('should reject non-rectangular matrices', () => {
      const matrix = [[1, 2], [3]];
      expect(() => QRService.validateMatrix(matrix)).toThrow('no es rectangular');
    });
  });

  describe('computeQR', () => {
    it('should compute correct QR decomposition', () => {
      const matrix = [[12, -51], [6, 167], [-4, 24]];
      const result = QRService.computeQR(matrix);
      
      // Verificar propiedades básicas de Q y R
      expect(result.q.length).toBe(3);
      expect(result.r[0].length).toBe(2);
      expect(result.q[0].every(x => typeof x === 'number')).toBe(true);
    });
  });
});
