/**
 * Streak Calculation
 * Tracks consecutive days with check-ins
 */

import type { CheckIn } from '../types';
import { parseLocalDate } from './dateHelpers';

/**
 * Calculate current streak of consecutive check-in days
 * @param checkIns - All check-ins for the user
 * @param today - Today's date (YYYY-MM-DD)
 * @returns Number of consecutive days with check-ins (starting from today or yesterday)
 */
export function calculateStreak(checkIns: CheckIn[], today: string): number {
  if (checkIns.length === 0) return 0;

  // Sort check-ins by date descending
  const sortedCheckIns = [...checkIns].sort((a, b) => b.date.localeCompare(a.date));

  // Get dates of all check-ins
  const checkInDates = new Set(sortedCheckIns.map((ci) => ci.date));

  let streak = 0;
  let currentDate = new Date(today);

  // Count consecutive days backwards from today
  while (true) {
    const dateStr = formatDateToString(currentDate);
    if (checkInDates.has(dateStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Format date to YYYY-MM-DD
 */
function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get the last check-in date
 */
export function getLastCheckInDate(checkIns: CheckIn[]): string | null {
  if (checkIns.length === 0) return null;
  const sorted = [...checkIns].sort((a, b) => b.date.localeCompare(a.date));
  return sorted[0].date;
}

/**
 * Check if user has checked in today
 */
export function hasCheckedInToday(checkIns: CheckIn[], today: string): boolean {
  return checkIns.some((ci) => ci.date === today);
}

/**
 * Get days since last check-in
 */
export function daysSinceLastCheckIn(checkIns: CheckIn[], today: string): number {
  const lastDate = getLastCheckInDate(checkIns);
  if (!lastDate) return -1; // Never checked in

  const last = parseLocalDate(lastDate);
  const todayDate = parseLocalDate(today);

  const diffTime = todayDate.getTime() - last.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
