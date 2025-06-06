import { analyzeMarketTrends } from '../../../src/services/market.service';

describe('Market Service', () => {
  describe('analyzeMarketTrends()', () => {
    const mockPrices = [
      { price: 50, recordedAt: new Date('2023-11-01') },
      { price: 52, recordedAt: new Date('2023-11-02') },
      { price: 55, recordedAt: new Date('2023-11-03') }
    ];

    test('should identify rising trend', () => {
      const result = analyzeMarketTrends(mockPrices, 'Nairobi');
      expect(result.trend).toBe('rising');
      expect(result.change).toBeGreaterThan(0);
    });

    test('should calculate correct market', () => {
      const result = analyzeMarketTrends(mockPrices, 'Kiambu');
      expect(result.market).toBe('Kiambu Farmers Market');
    });

    test('should handle empty input', () => {
      expect(() => analyzeMarketTrends([], 'Nairobi')).toThrow();
    });
  });
});