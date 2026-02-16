/**
 * Unit Tests for Recommendation Selection
 * Validates: Requirements 6
 */

import { describe, it, expect } from 'vitest';
import { selectRecommendations, getRecommendationForMetric } from '../recommendations';
import type { DailyMetrics } from '../../types';

describe('selectRecommendations', () => {
  it('should select low_sleep recommendation when avg sleep < 6', () => {
    const metrics: DailyMetrics = {
      avgSleep: 5,
      avgStress: 5,
      avgWorkload: 5,
      avgMood: 5,
      avgBurnoutScore: 50,
    };

    const recommendations = selectRecommendations(metrics);
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0].id).toBe('low_sleep');
  });

  it('should select high_stress recommendation when avg stress > 7', () => {
    const metrics: DailyMetrics = {
      avgSleep: 7,
      avgStress: 8,
      avgWorkload: 5,
      avgMood: 5,
      avgBurnoutScore: 50,
    };

    const recommendations = selectRecommendations(metrics);
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0].id).toBe('high_stress');
  });

  it('should select high_workload recommendation when avg workload > 7', () => {
    const metrics: DailyMetrics = {
      avgSleep: 7,
      avgStress: 5,
      avgWorkload: 8,
      avgMood: 5,
      avgBurnoutScore: 50,
    };

    const recommendations = selectRecommendations(metrics);
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0].id).toBe('high_workload');
  });

  it('should select low_mood recommendation when avg mood < 5', () => {
    const metrics: DailyMetrics = {
      avgSleep: 7,
      avgStress: 5,
      avgWorkload: 5,
      avgMood: 4,
      avgBurnoutScore: 50,
    };

    const recommendations = selectRecommendations(metrics);
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0].id).toBe('low_mood');
  });

  it('should return multiple recommendations when multiple conditions met', () => {
    const metrics: DailyMetrics = {
      avgSleep: 5, // low
      avgStress: 8, // high
      avgWorkload: 5,
      avgMood: 5,
      avgBurnoutScore: 50,
    };

    const recommendations = selectRecommendations(metrics);
    expect(recommendations.length).toBeGreaterThanOrEqual(2);
  });

  it('should return max 3 recommendations', () => {
    const metrics: DailyMetrics = {
      avgSleep: 5, // low
      avgStress: 8, // high
      avgWorkload: 8, // high
      avgMood: 4, // low
      avgBurnoutScore: 50,
    };

    const recommendations = selectRecommendations(metrics);
    expect(recommendations.length).toBeLessThanOrEqual(3);
  });

  it('should return generic wellness recommendation when no conditions met', () => {
    const metrics: DailyMetrics = {
      avgSleep: 7,
      avgStress: 5,
      avgWorkload: 5,
      avgMood: 5,
      avgBurnoutScore: 50,
    };

    const recommendations = selectRecommendations(metrics);
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0].title).toContain('Wellness');
  });

  it('should prioritize low_sleep over other recommendations', () => {
    const metrics: DailyMetrics = {
      avgSleep: 5, // low
      avgStress: 8, // high
      avgWorkload: 8, // high
      avgMood: 4, // low
      avgBurnoutScore: 50,
    };

    const recommendations = selectRecommendations(metrics);
    expect(recommendations[0].id).toBe('low_sleep');
  });

  it('should have correct recommendation structure', () => {
    const metrics: DailyMetrics = {
      avgSleep: 5,
      avgStress: 5,
      avgWorkload: 5,
      avgMood: 5,
      avgBurnoutScore: 50,
    };

    const recommendations = selectRecommendations(metrics);
    recommendations.forEach((rec) => {
      expect(rec).toHaveProperty('id');
      expect(rec).toHaveProperty('title');
      expect(rec).toHaveProperty('why');
      expect(rec).toHaveProperty('steps');
      expect(rec.steps.length).toBe(3);
    });
  });
});

describe('getRecommendationForMetric', () => {
  it('should return sleep recommendation for sleep metric', () => {
    const rec = getRecommendationForMetric('sleep');
    expect(rec).not.toBeNull();
    expect(rec?.id).toBe('low_sleep');
  });

  it('should return stress recommendation for stress metric', () => {
    const rec = getRecommendationForMetric('stress');
    expect(rec).not.toBeNull();
    expect(rec?.id).toBe('high_stress');
  });

  it('should return workload recommendation for workload metric', () => {
    const rec = getRecommendationForMetric('workload');
    expect(rec).not.toBeNull();
    expect(rec?.id).toBe('high_workload');
  });

  it('should return mood recommendation for mood metric', () => {
    const rec = getRecommendationForMetric('mood');
    expect(rec).not.toBeNull();
    expect(rec?.id).toBe('low_mood');
  });
});
