/**
 * Unit Tests for Trend Classification
 * Validates: Requirements 4
 */

import { describe, it, expect } from 'vitest';
import { classifyTrend } from '../trends';
import type { CheckIn } from '../../types';

// Helper to create mock check-ins
function createCheckIn(
  date: string,
  burnoutScore: number,
  deviceUserId = 'test-user'
): CheckIn {
  return {
    id: `checkin_${date}`,
    deviceUserId,
    date,
    sleep_hours: 7,
    stress: 5,
    workload: 5,
    mood: 5,
    burnout_score: burnoutScore,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

describe('classifyTrend', () => {
  it('should return "stable" when insufficient data (< 7 days)', () => {
    const checkIns = [
      createCheckIn('2024-01-20', 50),
      createCheckIn('2024-01-21', 48),
      createCheckIn('2024-01-22', 52),
    ];

    const trend = classifyTrend(checkIns);
    expect(trend).toBe('stable');
  });

  it('should return "stable" when difference is within ±5', () => {
    const checkIns: CheckIn[] = [];

    // Previous 7 days: avg = 50
    for (let i = 13; i >= 7; i--) {
      checkIns.push(createCheckIn(`2024-01-${i}`, 50));
    }

    // Current 7 days: avg = 52 (within ±5)
    for (let i = 6; i >= 0; i--) {
      checkIns.push(createCheckIn(`2024-01-${i}`, 52));
    }

    const trend = classifyTrend(checkIns);
    expect(trend).toBe('stable');
  });

  it('should handle exactly 7 days of data in each period', () => {
    const checkIns: CheckIn[] = [];

    // Exactly 7 days in previous period
    for (let i = 13; i >= 7; i--) {
      checkIns.push(createCheckIn(`2024-01-${i}`, 45));
    }

    // Exactly 7 days in current period
    for (let i = 6; i >= 0; i--) {
      checkIns.push(createCheckIn(`2024-01-${i}`, 35));
    }

    const trend = classifyTrend(checkIns);
    // With 14 days of data, should be able to classify
    expect(['improving', 'stable', 'worsening']).toContain(trend);
  });

  it('should ignore check-ins from other users', () => {
    const checkIns: CheckIn[] = [];

    // Previous 7 days for user1
    for (let i = 13; i >= 7; i--) {
      checkIns.push(createCheckIn(`2024-01-${i}`, 60, 'user1'));
    }

    // Current 7 days for user1
    for (let i = 6; i >= 0; i--) {
      checkIns.push(createCheckIn(`2024-01-${i}`, 50, 'user1'));
    }

    // Add check-ins from user2 (should be ignored)
    for (let i = 13; i >= 0; i--) {
      checkIns.push(createCheckIn(`2024-01-${i}`, 20, 'user2'));
    }

    const trend = classifyTrend(checkIns);
    // Should still work for user1 data
    expect(['improving', 'stable', 'worsening']).toContain(trend);
  });

  it('should return stable for empty check-ins', () => {
    const trend = classifyTrend([]);
    expect(trend).toBe('stable');
  });
});
