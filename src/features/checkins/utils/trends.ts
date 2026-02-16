/**
 * Trend Classification
 * Compares burnout scores across time periods to determine if user is improving, stable, or worsening
 */

import type { CheckIn } from '../types';
import { getLast7Days, parseLocalDate } from './dateHelpers';
import { TREND_THRESHOLDS, WEEKLY_DAYS } from '../constants';

/**
 * Calculate average burnout score for a list of check-ins
 */
function calculateAverageBurnoutScore(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return 0;
  const sum = checkIns.reduce((acc, ci) => acc + ci.burnout_score, 0);
  return sum / checkIns.length;
}

/**
 * Get check-ins for a specific date range
 */
function getCheckInsInRange(checkIns: CheckIn[], startDate: string, endDate: string): CheckIn[] {
  const start = parseLocalDate(startDate);
  const end = parseLocalDate(endDate);

  return checkIns.filter((ci) => {
    const ciDate = parseLocalDate(ci.date);
    return ciDate >= start && ciDate <= end;
  });
}

/**
 * Classify trend by comparing last 7 days vs previous 7 days
 * @param checkIns - All check-ins for the user
 * @returns 'improving' | 'stable' | 'worsening'
 */
export function classifyTrend(
  checkIns: CheckIn[]
): 'improving' | 'stable' | 'worsening' {
  if (checkIns.length === 0) return 'stable';

  // Get the device user ID from the first check-in
  const deviceUserId = checkIns[0].deviceUserId;
  const userCheckIns = checkIns.filter((ci) => ci.deviceUserId === deviceUserId);

  // Get last 7 days (including reference date)
  const last7Days = getLast7Days();
  const last7DaysStart = last7Days[last7Days.length - 1]; // 7 days ago
  const last7DaysEnd = last7Days[0]; // today

  // Get previous 7 days (7-14 days ago)
  const previous7DaysStart = new Date(parseLocalDate(last7DaysStart));
  previous7DaysStart.setDate(previous7DaysStart.getDate() - 7);
  const previous7DaysEnd = new Date(parseLocalDate(last7DaysStart));
  previous7DaysEnd.setDate(previous7DaysEnd.getDate() - 1);

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const previous7DaysStartStr = formatDate(previous7DaysStart);
  const previous7DaysEndStr = formatDate(previous7DaysEnd);

  // Get check-ins for each period
  const currentPeriodCheckIns = getCheckInsInRange(userCheckIns, last7DaysStart, last7DaysEnd);
  const previousPeriodCheckIns = getCheckInsInRange(
    userCheckIns,
    previous7DaysStartStr,
    previous7DaysEndStr
  );

  // Need at least 7 check-ins in each period for meaningful comparison
  if (currentPeriodCheckIns.length < WEEKLY_DAYS || previousPeriodCheckIns.length < WEEKLY_DAYS) {
    return 'stable'; // Not enough data
  }

  // Calculate averages
  const currentAvg = calculateAverageBurnoutScore(currentPeriodCheckIns);
  const previousAvg = calculateAverageBurnoutScore(previousPeriodCheckIns);

  // Compare with threshold
  const diff = previousAvg - currentAvg; // Positive = improving

  if (diff >= TREND_THRESHOLDS.IMPROVING) {
    return 'improving';
  } else if (diff <= -TREND_THRESHOLDS.WORSENING) {
    return 'worsening';
  } else {
    return 'stable';
  }
}

/**
 * Get trend description for display
 */
export function getTrendDescription(trend: 'improving' | 'stable' | 'worsening'): string {
  switch (trend) {
    case 'improving':
      return 'Your burnout risk is decreasing. Keep up the good work!';
    case 'worsening':
      return 'Your burnout risk is increasing. Consider taking action.';
    case 'stable':
      return 'Your burnout risk is stable. Monitor your metrics.';
  }
}

/**
 * Get trend emoji
 */
export function getTrendEmoji(trend: 'improving' | 'stable' | 'worsening'): string {
  switch (trend) {
    case 'improving':
      return '📈';
    case 'worsening':
      return '📉';
    case 'stable':
      return '➡️';
  }
}
