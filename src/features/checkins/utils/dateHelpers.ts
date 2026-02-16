/**
 * Date Helpers - Timezone-safe date utilities
 * All dates use local timezone in YYYY-MM-DD format
 */

/**
 * Get today's date in local timezone as YYYY-MM-DD
 */
export function getTodayLocalDate(): string {
  const now = new Date();
  return formatDateToString(now);
}

/**
 * Format a Date object to YYYY-MM-DD string (local timezone)
 */
export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse a YYYY-MM-DD string to a Date object (local timezone)
 */
export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Get an array of dates for the last N days (including today)
 */
export function getLastNDays(n: number): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < n; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(formatDateToString(date));
  }

  return dates;
}

/**
 * Get last 7 days including today
 */
export function getLast7Days(): string[] {
  return getLastNDays(7);
}

/**
 * Get last 30 days including today
 */
export function getLast30Days(): string[] {
  return getLastNDays(30);
}

/**
 * Get the Monday of the week for a given date
 */
export function getWeekStartDate(dateStr: string): string {
  const date = parseLocalDate(dateStr);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  const monday = new Date(date.setDate(diff));
  return formatDateToString(monday);
}

/**
 * Get date range between two dates (inclusive)
 */
export function getDateRange(startDateStr: string, endDateStr: string): string[] {
  const dates: string[] = [];
  const startDate = parseLocalDate(startDateStr);
  const endDate = parseLocalDate(endDateStr);

  let current = new Date(startDate);
  while (current <= endDate) {
    dates.push(formatDateToString(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

/**
 * Check if a date is today
 */
export function isToday(dateStr: string): boolean {
  return dateStr === getTodayLocalDate();
}

/**
 * Check if a date is in the past
 */
export function isPast(dateStr: string): boolean {
  return dateStr < getTodayLocalDate();
}

/**
 * Get the current hour (0-23)
 */
export function getCurrentHour(): number {
  return new Date().getHours();
}

/**
 * Format date for display (e.g., "Jan 15, 2024")
 */
export function formatDateForDisplay(dateStr: string): string {
  const date = parseLocalDate(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get days between two dates
 */
export function daysBetween(dateStr1: string, dateStr2: string): number {
  const date1 = parseLocalDate(dateStr1);
  const date2 = parseLocalDate(dateStr2);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
