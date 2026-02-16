/**
 * useWeeklySummary Hook
 * Computes weekly summary with metrics, trend, and recommendations
 */

import { useMemo } from 'react';
import type { CheckIn, WeeklySummary, DailyMetrics } from '../types';
import { getLast7Days } from '../utils/dateHelpers';
import { classifyTrend } from '../utils/trends';
import { selectRecommendations } from '../utils/recommendations';

/**
 * Calculate daily metrics from check-ins
 */
function calculateDailyMetrics(checkIns: CheckIn[]): DailyMetrics {
  if (checkIns.length === 0) {
    return {
      avgSleep: 0,
      avgStress: 0,
      avgWorkload: 0,
      avgMood: 0,
      avgBurnoutScore: 0,
    };
  }

  const avgSleep = checkIns.reduce((sum, ci) => sum + ci.sleep_hours, 0) / checkIns.length;
  const avgStress = checkIns.reduce((sum, ci) => sum + ci.stress, 0) / checkIns.length;
  const avgWorkload = checkIns.reduce((sum, ci) => sum + ci.workload, 0) / checkIns.length;
  const avgMood = checkIns.reduce((sum, ci) => sum + ci.mood, 0) / checkIns.length;
  const avgBurnoutScore =
    checkIns.reduce((sum, ci) => sum + ci.burnout_score, 0) / checkIns.length;

  return {
    avgSleep: Math.round(avgSleep * 10) / 10,
    avgStress: Math.round(avgStress * 10) / 10,
    avgWorkload: Math.round(avgWorkload * 10) / 10,
    avgMood: Math.round(avgMood * 10) / 10,
    avgBurnoutScore: Math.round(avgBurnoutScore),
  };
}

/**
 * Get check-ins for the last 7 days
 */
function getWeeklyCheckIns(checkIns: CheckIn[]): CheckIn[] {
  const last7Days = getLast7Days();
  return checkIns.filter((ci) => last7Days.includes(ci.date));
}

export function useWeeklySummary(checkIns: CheckIn[]) {
  const summary = useMemo(() => {
    const weeklyCheckIns = getWeeklyCheckIns(checkIns);
    const metrics = calculateDailyMetrics(weeklyCheckIns);
    const trend = classifyTrend(checkIns);
    const recommendations = selectRecommendations(metrics);

    const weeklySummary: WeeklySummary = {
      deviceUserId: checkIns[0]?.deviceUserId || '',
      weekStartDate: new Date(new Date().setDate(new Date().getDate() - 6))
        .toISOString()
        .split('T')[0],
      avgSleep: metrics.avgSleep,
      avgStress: metrics.avgStress,
      avgWorkload: metrics.avgWorkload,
      avgMood: metrics.avgMood,
      avgBurnoutScore: metrics.avgBurnoutScore,
      trend,
      recommendations,
    };

    return weeklySummary;
  }, [checkIns]);

  return summary;
}
