/**
 * Unit Tests for Red-Flag Detection
 * Validates: Requirements 7
 */

import { describe, it, expect } from 'vitest';
import { detectRedFlags } from '../redFlags';
import type { CheckIn } from '../../types';

// Helper to create mock check-ins
function createCheckIn(
  date: string,
  burnoutScore: number,
  mood: number,
  deviceUserId = 'test-user'
): CheckIn {
  return {
    id: `checkin_${date}`,
    deviceUserId,
    date,
    sleep_hours: 7,
    stress: 5,
    workload: 5,
    mood,
    notes: '',
    burnout_score: burnoutScore,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

describe('detectRedFlags', () => {
  it('should trigger on high score streak (>= 75 for 2 consecutive days)', () => {
    const checkIns = [
      createCheckIn('2024-01-20', 75, 5),
      createCheckIn('2024-01-21', 76, 5),
    ];

    const redFlag = detectRedFlags(checkIns, '2024-01-21');
    expect(redFlag.isTriggered).toBe(true);
    expect(redFlag.reason).toBe('high_score_streak');
  });

  it('should not trigger if only 1 day has high score', () => {
    const checkIns = [
      createCheckIn('2024-01-20', 50, 5),
      createCheckIn('2024-01-21', 75, 5),
    ];

    const redFlag = detectRedFlags(checkIns, '2024-01-21');
    expect(redFlag.isTriggered).toBe(false);
  });

  it('should not trigger on score spike if increase < 20', () => {
    const checkIns = [
      createCheckIn('2024-01-15', 40, 5),
      createCheckIn('2024-01-16', 40, 5),
      createCheckIn('2024-01-17', 40, 5),
      createCheckIn('2024-01-18', 40, 5),
      createCheckIn('2024-01-19', 40, 5),
      createCheckIn('2024-01-20', 40, 5),
      createCheckIn('2024-01-21', 55, 5), // Spike of 15 (< 20)
    ];

    const redFlag = detectRedFlags(checkIns, '2024-01-21');
    expect(redFlag.isTriggered).toBe(false);
  });

  it('should trigger on low mood streak (<= 3 for 2 consecutive days)', () => {
    const checkIns = [
      createCheckIn('2024-01-20', 50, 3),
      createCheckIn('2024-01-21', 50, 2),
    ];

    const redFlag = detectRedFlags(checkIns, '2024-01-21');
    expect(redFlag.isTriggered).toBe(true);
    expect(redFlag.reason).toBe('low_mood_streak');
  });

  it('should not trigger if only 1 day has low mood', () => {
    const checkIns = [
      createCheckIn('2024-01-20', 50, 5),
      createCheckIn('2024-01-21', 50, 3),
    ];

    const redFlag = detectRedFlags(checkIns, '2024-01-21');
    expect(redFlag.isTriggered).toBe(false);
  });

  it('should not trigger if no conditions are met', () => {
    const checkIns = [
      createCheckIn('2024-01-20', 50, 5),
      createCheckIn('2024-01-21', 52, 5),
    ];

    const redFlag = detectRedFlags(checkIns, '2024-01-21');
    expect(redFlag.isTriggered).toBe(false);
  });

  it('should prioritize first matching trigger', () => {
    // High score streak should be detected first
    const checkIns = [
      createCheckIn('2024-01-20', 75, 3),
      createCheckIn('2024-01-21', 76, 2),
    ];

    const redFlag = detectRedFlags(checkIns, '2024-01-21');
    expect(redFlag.isTriggered).toBe(true);
    expect(redFlag.reason).toBe('high_score_streak');
  });

  it('should handle edge case: exactly 75 score', () => {
    const checkIns = [
      createCheckIn('2024-01-20', 75, 5),
      createCheckIn('2024-01-21', 75, 5),
    ];

    const redFlag = detectRedFlags(checkIns, '2024-01-21');
    expect(redFlag.isTriggered).toBe(true);
    expect(redFlag.reason).toBe('high_score_streak');
  });

  it('should handle edge case: exactly mood 3', () => {
    const checkIns = [
      createCheckIn('2024-01-20', 50, 3),
      createCheckIn('2024-01-21', 50, 3),
    ];

    const redFlag = detectRedFlags(checkIns, '2024-01-21');
    expect(redFlag.isTriggered).toBe(true);
    expect(redFlag.reason).toBe('low_mood_streak');
  });
});
