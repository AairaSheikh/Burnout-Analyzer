/**
 * Recommendation Engine
 * Selects personalized recommendations based on user metrics
 */

import type { Recommendation, DailyMetrics } from '../types';
import { RECOMMENDATION_RULESET, METRIC_THRESHOLDS } from '../constants';

/**
 * Evaluate which recommendations apply to the user's metrics
 */
function evaluateRecommendationRules(metrics: DailyMetrics): string[] {
  const applicableRules: string[] = [];

  // Check low sleep
  if (metrics.avgSleep < METRIC_THRESHOLDS.LOW_SLEEP) {
    applicableRules.push('low_sleep');
  }

  // Check high workload
  if (metrics.avgWorkload > METRIC_THRESHOLDS.HIGH_WORKLOAD) {
    applicableRules.push('high_workload');
  }

  // Check high stress
  if (metrics.avgStress > METRIC_THRESHOLDS.HIGH_STRESS) {
    applicableRules.push('high_stress');
  }

  // Check low mood
  if (metrics.avgMood < METRIC_THRESHOLDS.LOW_MOOD) {
    applicableRules.push('low_mood');
  }

  return applicableRules;
}

/**
 * Prioritize recommendations by severity
 * Order: low_sleep > high_stress > high_workload > low_mood
 */
function prioritizeRecommendations(ruleIds: string[]): string[] {
  const priority = ['low_sleep', 'high_stress', 'high_workload', 'low_mood'];
  return ruleIds.sort((a, b) => priority.indexOf(a) - priority.indexOf(b));
}

/**
 * Select 2-3 recommendations based on user metrics
 * @param metrics - Daily metrics (averages)
 * @returns Array of 2-3 recommendations
 */
export function selectRecommendations(metrics: DailyMetrics): Recommendation[] {
  // Evaluate which rules apply
  const applicableRules = evaluateRecommendationRules(metrics);

  if (applicableRules.length === 0) {
    // If no rules apply, return a generic wellness recommendation
    return [
      {
        id: 'general_wellness',
        title: 'General Wellness Check',
        why: 'Maintaining good habits is key to preventing burnout.',
        steps: [
          'Continue monitoring your daily metrics',
          'Maintain consistent sleep and work schedules',
          'Take regular breaks throughout your day',
        ],
      },
    ];
  }

  // Prioritize recommendations
  const prioritized = prioritizeRecommendations(applicableRules);

  // Select top 2-3 recommendations
  const selected = prioritized.slice(0, 3);

  // Map to recommendation objects
  return selected
    .map((ruleId) => RECOMMENDATION_RULESET[ruleId])
    .filter((rec) => rec !== undefined);
}

/**
 * Get recommendation for a specific metric issue
 */
export function getRecommendationForMetric(
  metric: 'sleep' | 'stress' | 'workload' | 'mood'
): Recommendation | null {
  const ruleMap: Record<string, string> = {
    sleep: 'low_sleep',
    stress: 'high_stress',
    workload: 'high_workload',
    mood: 'low_mood',
  };

  const ruleId = ruleMap[metric];
  return RECOMMENDATION_RULESET[ruleId] || null;
}
