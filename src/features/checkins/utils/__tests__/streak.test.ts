/**
 * Unit Tests for Streak Calculation
 * Validates: Requirements 5
 */

import { describe, it, expect } from 'vitest';
import { calculateStreak, getLastCheckInDate, hasCheckedInToday, daysSinceLastCheckIn } from '../streak';
import type { CheckIn } from '../../types';

// Helper to create mock check-ins
function createCheckIn(date: string, deviceUserId = 'test-user'): CheckIn {
  return {
    id: `checkin_${date}`,
    deviceUserId,
    date,
    sleep_hours: 7,
    stress: 5,
    workload: 5,
    mood: 5,
    burnout_score: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

describe('calculateStreak', () => {
  it('should return 0 for empty check-ins', () => {
    const streak = calculateStreak([], '2024-01-21');
    expect(streak).toBe(0);
  });

  it('should return 1 for single check-in on today', () => {
    const checkIns = [createCheckIn('2024-01-21')];
    const streak = calculateStreak(checkIns, '2024-01-21');
    expect(streak).toBe(1);
  });

  it('should count consecutive days from today', () => {
    const checkIns = [
      createCheckIn('2024-01-19'),
      createCheckIn('2024-01-20'),
      createCheckIn('2024-01-21'),
    ];
    const streak = calculateStreak(checkIns, '2024-01-21');
    expect(streak).toBe(3);
  });

  it('should reset streak at first gap', () => {
    const checkIns = [
      createCheckIn('2024-01-18'),
      createCheckIn('2024-01-19'),
      // Gap on 2024-01-20
      createCheckIn('2024-01-21'),
    ];
    const streak = calculateStreak(checkIns, '2024-01-21');
    expect(streak).toBe(1); // Only today counts
  });

  it('should handle streak from yesterday (no check-in today)', () => {
    const checkIns = [
      createCheckIn('2024-01-19'),
      createCheckIn('2024-01-20'),
      // No check-in on 2024-01-21
    ];
    const streak = calculateStreak(checkIns, '2024-01-21');
    expect(streak).toBe(0); // Streak broken
  });

  it('should handle long consecutive streak', () => {
    const checkIns = [];
    // Create 21 consecutive days (Jan 1-21, 2024)
    for (let i = 1; i <= 21; i++) {
      const dateStr = `2024-01-${String(i).padStart(2, '0')}`;
      checkIns.push(createCheckIn(dateStr));
    }
    const streak = calculateStreak(checkIns, '2024-01-21');
    expect(streak).toBe(21);
  });

  it('should ignore check-ins from other users', () => {
    const checkIns = [
      createCheckIn('2024-01-19', 'user1'),
      createCheckIn('2024-01-20', 'user1'),
      createCheckIn('2024-01-21', 'user1'),
      createCheckIn('2024-01-21', 'user2'), // Different user
    ];
    const streak = calculateStreak(checkIns, '2024-01-21');
    expect(streak).toBe(3); // Only user1 data
  });
});

describe('getLastCheckInDate', () => {
  it('should return null for empty check-ins', () => {
    const lastDate = getLastCheckInDate([]);
    expect(lastDate).toBeNull();
  });

  it('should return the most recent check-in date', () => {
    const checkIns = [
      createCheckIn('2024-01-19'),
      createCheckIn('2024-01-21'),
      createCheckIn('2024-01-20'),
    ];
    const lastDate = getLastCheckInDate(checkIns);
    expect(lastDate).toBe('2024-01-21');
  });

  it('should handle single check-in', () => {
    const checkIns = [createCheckIn('2024-01-20')];
    const lastDate = getLastCheckInDate(checkIns);
    expect(lastDate).toBe('2024-01-20');
  });
});

describe('hasCheckedInToday', () => {
  it('should return true if check-in exists for today', () => {
    const checkIns = [
      createCheckIn('2024-01-20'),
      createCheckIn('2024-01-21'),
    ];
    const hasCheckedIn = hasCheckedInToday(checkIns, '2024-01-21');
    expect(hasCheckedIn).toBe(true);
  });

  it('should return false if no check-in for today', () => {
    const checkIns = [createCheckIn('2024-01-20')];
    const hasCheckedIn = hasCheckedInToday(checkIns, '2024-01-21');
    expect(hasCheckedIn).toBe(false);
  });

  it('should return false for empty check-ins', () => {
    const hasCheckedIn = hasCheckedInToday([], '2024-01-21');
    expect(hasCheckedIn).toBe(false);
  });
});

describe('daysSinceLastCheckIn', () => {
  it('should return -1 if never checked in', () => {
    const days = daysSinceLastCheckIn([], '2024-01-21');
    expect(days).toBe(-1);
  });

  it('should return 0 if checked in today', () => {
    const checkIns = [createCheckIn('2024-01-21')];
    const days = daysSinceLastCheckIn(checkIns, '2024-01-21');
    expect(days).toBe(0);
  });

  it('should return 1 if last check-in was yesterday', () => {
    const checkIns = [createCheckIn('2024-01-20')];
    const days = daysSinceLastCheckIn(checkIns, '2024-01-21');
    expect(days).toBe(1);
  });

  it('should return correct days for older check-ins', () => {
    const checkIns = [createCheckIn('2024-01-15')];
    const days = daysSinceLastCheckIn(checkIns, '2024-01-21');
    expect(days).toBe(6);
  });
});
