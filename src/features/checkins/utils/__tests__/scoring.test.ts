/**
 * Unit Tests for Burnout Score Calculation
 * Validates: Requirements 3
 */

import { describe, it, expect } from 'vitest';
import { calculateBurnoutScore, getBurnoutRiskLevel } from '../scoring';

describe('calculateBurnoutScore', () => {
  it('should return close to 0 for perfect metrics (12 hours sleep, stress 1, workload 1, mood 10)', () => {
    const score = calculateBurnoutScore(12, 1, 1, 10);
    expect(score).toBeLessThan(10); // Should be very low
  });

  it('should return close to 100 for worst metrics (0 hours sleep, stress 10, workload 10, mood 1)', () => {
    const score = calculateBurnoutScore(0, 10, 10, 1);
    expect(score).toBeGreaterThan(90); // Should be very high
  });

  it('should be deterministic - same inputs produce same output', () => {
    const inputs: [number, number, number, number] = [6, 7, 8, 5];
    const score1 = calculateBurnoutScore(...inputs);
    const score2 = calculateBurnoutScore(...inputs);
    expect(score1).toBe(score2);
  });

  it('should always return a value between 0 and 100', () => {
    const testCases: [number, number, number, number][] = [
      [0, 1, 1, 10],
      [12, 10, 10, 1],
      [6, 5, 5, 5],
      [8, 8, 8, 8],
      [4, 9, 9, 2],
    ];

    testCases.forEach((inputs) => {
      const score = calculateBurnoutScore(...inputs);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });
  });

  it('should increase with lower sleep', () => {
    const score8h = calculateBurnoutScore(8, 5, 5, 5);
    const score4h = calculateBurnoutScore(4, 5, 5, 5);
    expect(score4h).toBeGreaterThan(score8h);
  });

  it('should increase with higher stress', () => {
    const scoreStress3 = calculateBurnoutScore(6, 3, 5, 5);
    const scoreStress9 = calculateBurnoutScore(6, 9, 5, 5);
    expect(scoreStress9).toBeGreaterThan(scoreStress3);
  });

  it('should increase with higher workload', () => {
    const scoreWorkload3 = calculateBurnoutScore(6, 5, 3, 5);
    const scoreWorkload9 = calculateBurnoutScore(6, 5, 9, 5);
    expect(scoreWorkload9).toBeGreaterThan(scoreWorkload3);
  });

  it('should increase with lower mood', () => {
    const scoreMood9 = calculateBurnoutScore(6, 5, 5, 9);
    const scoreMood2 = calculateBurnoutScore(6, 5, 5, 2);
    expect(scoreMood2).toBeGreaterThan(scoreMood9);
  });

  it('should clamp inputs to valid ranges', () => {
    // Test with out-of-range inputs
    const score1 = calculateBurnoutScore(15, 5, 5, 5); // sleep > 12
    const score2 = calculateBurnoutScore(12, 5, 5, 5); // sleep = 12
    expect(score1).toBe(score2);

    const score3 = calculateBurnoutScore(6, 15, 5, 5); // stress > 10
    const score4 = calculateBurnoutScore(6, 10, 5, 5); // stress = 10
    expect(score3).toBe(score4);
  });

  it('should handle edge case: moderate metrics', () => {
    const score = calculateBurnoutScore(7, 5, 5, 5);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThan(100);
  });
});

describe('getBurnoutRiskLevel', () => {
  it('should return "low" for score < 25', () => {
    expect(getBurnoutRiskLevel(0)).toBe('low');
    expect(getBurnoutRiskLevel(24)).toBe('low');
  });

  it('should return "moderate" for score 25-49', () => {
    expect(getBurnoutRiskLevel(25)).toBe('moderate');
    expect(getBurnoutRiskLevel(49)).toBe('moderate');
  });

  it('should return "high" for score 50-74', () => {
    expect(getBurnoutRiskLevel(50)).toBe('high');
    expect(getBurnoutRiskLevel(74)).toBe('high');
  });

  it('should return "critical" for score >= 75', () => {
    expect(getBurnoutRiskLevel(75)).toBe('critical');
    expect(getBurnoutRiskLevel(100)).toBe('critical');
  });
});
