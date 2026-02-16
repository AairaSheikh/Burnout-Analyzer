/**
 * Red-Flag Detection
 * Identifies when a user shows signs of severe burnout
 *
 * Triggers (any of):
 * 1. burnout_score >= 75 for 2 consecutive days
 * 2. burnout_score increased by >= 20 compared to 7-day average
 * 3. mood <= 3 for 2 consecutive days
 */

import type { CheckIn, RedFlagState } from '../types';
import { getLast7Days, parseLocalDate } from './dateHelpers';
import { RED_FLAG_THRESHOLDS } from '../constants';

/**
 * Check if burnout score is critical for 2 consecutive days
 */
function checkHighScoreStreak(checkIns: CheckIn[], today: string): boolean {
  // Get yesterday's date
  const todayDate = parseLocalDate(today);
  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const yesterdayStr = formatDate(yesterdayDate);

  const todayCheckIn = checkIns.find((ci) => ci.date === today);
  const yesterdayCheckIn = checkIns.find((ci) => ci.date === yesterdayStr);

  if (!todayCheckIn || !yesterdayCheckIn) return false;

  return (
    todayCheckIn.burnout_score >= RED_FLAG_THRESHOLDS.SCORE_CRITICAL &&
    yesterdayCheckIn.burnout_score >= RED_FLAG_THRESHOLDS.SCORE_CRITICAL
  );
}

/**
 * Check if burnout score spiked significantly
 */
function checkScoreSpike(checkIns: CheckIn[], today: string): boolean {
  const last7Days = getLast7Days();
  const last7DaysCheckIns = checkIns.filter((ci) => last7Days.includes(ci.date));

  if (last7DaysCheckIns.length < 3) return false; // Need at least 3 data points

  // Calculate 7-day average
  const avgScore =
    last7DaysCheckIns.reduce((sum, ci) => sum + ci.burnout_score, 0) / last7DaysCheckIns.length;

  // Get today's score
  const todayCheckIn = checkIns.find((ci) => ci.date === today);
  if (!todayCheckIn) return false;

  // Check if spike >= threshold
  return todayCheckIn.burnout_score - avgScore >= RED_FLAG_THRESHOLDS.SCORE_SPIKE;
}

/**
 * Check if mood is critically low for 2 consecutive days
 */
function checkLowMoodStreak(checkIns: CheckIn[], today: string): boolean {
  // Get yesterday's date
  const todayDate = parseLocalDate(today);
  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const yesterdayStr = formatDate(yesterdayDate);

  const todayCheckIn = checkIns.find((ci) => ci.date === today);
  const yesterdayCheckIn = checkIns.find((ci) => ci.date === yesterdayStr);

  if (!todayCheckIn || !yesterdayCheckIn) return false;

  return (
    todayCheckIn.mood <= RED_FLAG_THRESHOLDS.MOOD_CRITICAL &&
    yesterdayCheckIn.mood <= RED_FLAG_THRESHOLDS.MOOD_CRITICAL
  );
}

/**
 * Detect red flags based on check-in data
 * @param checkIns - All check-ins for the user
 * @param today - Today's date (YYYY-MM-DD)
 * @returns RedFlagState with trigger status and reason
 */
export function detectRedFlags(checkIns: CheckIn[], today: string): RedFlagState {
  // Check all three conditions
  if (checkHighScoreStreak(checkIns, today)) {
    return {
      isTriggered: true,
      reason: 'high_score_streak',
    };
  }

  if (checkScoreSpike(checkIns, today)) {
    return {
      isTriggered: true,
      reason: 'score_spike',
    };
  }

  if (checkLowMoodStreak(checkIns, today)) {
    return {
      isTriggered: true,
      reason: 'low_mood_streak',
    };
  }

  return {
    isTriggered: false,
  };
}

/**
 * Get red-flag message for display
 */
export function getRedFlagMessage(reason?: string): string {
  switch (reason) {
    case 'high_score_streak':
      return 'Your burnout score has been critically high for 2 days. Please take care of yourself.';
    case 'score_spike':
      return 'Your burnout score has increased significantly. Consider taking a break.';
    case 'low_mood_streak':
      return 'Your mood has been very low for 2 days. Reach out for support.';
    default:
      return 'You might be at risk. Please consider reaching out for support.';
  }
}

/**
 * Get self-care suggestions for red-flag state
 */
export function getRedFlagSelfCareSuggestions(): string[] {
  return [
    'Take a 15-minute break and step outside',
    'Reach out to a friend, family member, or colleague',
    'Practice deep breathing or meditation (5-10 minutes)',
    'Do something you enjoy, even if just for 10 minutes',
    'Consider talking to a mental health professional',
    'Get adequate sleep tonight (aim for 7-9 hours)',
  ];
}
