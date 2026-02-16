/**
 * Burnout Score Calculation
 * Deterministic formula that computes burnout risk (0-100)
 *
 * Formula Explanation:
 * - Sleep deficit (12 - sleep_hours) * 4: Sleep is weighted heavily (4x) because
 *   sleep deprivation is a major burnout driver. Max contribution: 48 points.
 * - Stress * 3: Stress directly correlates with burnout. Max contribution: 30 points.
 * - Workload * 2.5: High workload is a significant burnout factor. Max: 25 points.
 * - Mood deficit (10 - mood) * 2: Low mood indicates burnout. Max: 20 points.
 * - Total max: 123 points, normalized to 100 by dividing by 1.23
 *
 * Result: Score between 0-100 where higher = higher burnout risk
 */

/**
 * Calculate burnout score from wellness metrics
 * @param sleep_hours - Hours of sleep (0-12)
 * @param stress - Stress level (1-10)
 * @param workload - Workload level (1-10)
 * @param mood - Mood level (1-10)
 * @returns Burnout score (0-100)
 */
export function calculateBurnoutScore(
  sleep_hours: number,
  stress: number,
  workload: number,
  mood: number
): number {
  // Validate and clamp inputs to expected ranges
  const s = Math.max(0, Math.min(12, sleep_hours));
  const st = Math.max(1, Math.min(10, stress));
  const w = Math.max(1, Math.min(10, workload));
  const m = Math.max(1, Math.min(10, mood));

  // Calculate raw score using weighted formula
  // Sleep deficit: (12 - s) * 4 = 0-48 points
  // Stress: st * 3 = 3-30 points
  // Workload: w * 2.5 = 2.5-25 points
  // Mood deficit: (10 - m) * 2 = 0-18 points
  // Total: 5.5-121 points
  const rawScore = (12 - s) * 4 + st * 3 + w * 2.5 + (10 - m) * 2;

  // Normalize to 0-100 scale (divide by 1.21 to get max ~100)
  const normalizedScore = (rawScore / 1.21);

  // Clamp to [0, 100] and round to nearest integer
  return Math.max(0, Math.min(100, Math.round(normalizedScore)));
}

/**
 * Get burnout risk level based on score
 */
export function getBurnoutRiskLevel(score: number): 'low' | 'moderate' | 'high' | 'critical' {
  if (score < 25) return 'low';
  if (score < 50) return 'moderate';
  if (score < 75) return 'high';
  return 'critical';
}

/**
 * Get color for burnout score visualization
 */
export function getBurnoutScoreColor(score: number): string {
  const level = getBurnoutRiskLevel(score);
  switch (level) {
    case 'low':
      return '#10b981'; // green
    case 'moderate':
      return '#f59e0b'; // amber
    case 'high':
      return '#ef4444'; // red
    case 'critical':
      return '#7c2d12'; // dark red
  }
}
