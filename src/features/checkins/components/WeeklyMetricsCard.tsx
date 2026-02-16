/**
 * WeeklyMetricsCard Component
 * Displays weekly averages and trend
 */

import styles from './WeeklyMetricsCard.module.css';
import { getTrendEmoji, getTrendDescription } from '../utils/trends';
import type { WeeklySummary } from '../types';

interface WeeklyMetricsCardProps {
  summary: WeeklySummary;
  delay?: number;
}

export default function WeeklyMetricsCard({ summary, delay = 0 }: WeeklyMetricsCardProps) {
  const metrics = [
    { label: 'Sleep', value: summary.avgSleep.toFixed(1), unit: 'h', icon: '😴' },
    { label: 'Stress', value: summary.avgStress.toFixed(1), unit: '/10', icon: '😰' },
    { label: 'Workload', value: summary.avgWorkload.toFixed(1), unit: '/10', icon: '💼' },
    { label: 'Mood', value: summary.avgMood.toFixed(1), unit: '/10', icon: '😊' },
  ];

  return (
    <div className={styles.card} style={{ animationDelay: `${delay}ms` }}>
      <h3 className={styles.title}>This Week's Average</h3>

      <div className={styles.metricsGrid}>
        {metrics.map((metric, idx) => (
          <div key={metric.label} className={styles.metric} style={{ animationDelay: `${delay + idx * 50}ms` }}>
            <span className={styles.icon}>{metric.icon}</span>
            <p className={styles.label}>{metric.label}</p>
            <div className={styles.valueContainer}>
              <p className={styles.value}>{metric.value}</p>
              <span className={styles.unit}>{metric.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.trendSection}>
        <div className={styles.trendHeader}>
          <p className={styles.trendLabel}>Trend</p>
          <span className={styles.trendEmoji}>{getTrendEmoji(summary.trend)}</span>
        </div>
        <p className={styles.trendValue}>{summary.trend.charAt(0).toUpperCase() + summary.trend.slice(1)}</p>
        <p className={styles.trendDescription}>{getTrendDescription(summary.trend)}</p>
      </div>

      <a href="/checkins/weekly" className={styles.viewMore}>
        View Full Summary →
      </a>
    </div>
  );
}
