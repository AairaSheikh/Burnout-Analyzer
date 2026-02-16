/**
 * Weekly Summary Page
 * Shows weekly metrics and personalized recommendations
 * Premium design with smooth animations and beautiful cards
 */

import { useDeviceUser } from '../hooks/useDeviceUser';
import { useCheckIns } from '../hooks/useCheckIns';
import { useWeeklySummary } from '../hooks/useWeeklySummary';
import { getTrendEmoji, getTrendDescription } from '../utils/trends';
import styles from './WeeklySummaryPage.module.css';

export default function WeeklySummaryPage() {
  const { deviceUserId, isLoading: userLoading } = useDeviceUser();
  const { checkIns, isLoading: checkInsLoading } = useCheckIns(deviceUserId || '');
  const weeklySummary = useWeeklySummary(checkIns);

  if (userLoading || checkInsLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Weekly Summary</h1>
          <p className={styles.subtitle}>Your wellness insights for the past 7 days</p>
        </div>

        {/* Metrics Section */}
        <div className={`${styles.section} ${styles.metricsSection}`}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleIcon}>📊</span>
            This Week's Metrics
          </h2>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Avg Sleep</div>
              <div className={styles.metricValue}>{weeklySummary.avgSleep.toFixed(1)}</div>
              <div className={styles.metricUnit}>hours</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Avg Stress</div>
              <div className={styles.metricValue}>{weeklySummary.avgStress.toFixed(1)}</div>
              <div className={styles.metricUnit}>/10</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Avg Workload</div>
              <div className={styles.metricValue}>{weeklySummary.avgWorkload.toFixed(1)}</div>
              <div className={styles.metricUnit}>/10</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Avg Mood</div>
              <div className={styles.metricValue}>{weeklySummary.avgMood.toFixed(1)}</div>
              <div className={styles.metricUnit}>/10</div>
            </div>
          </div>

          <div className={styles.burnoutScoreCard}>
            <div className={styles.burnoutScoreLabel}>Avg Burnout Score</div>
            <div className={styles.burnoutScoreValue}>{weeklySummary.avgBurnoutScore}</div>
            <div className={styles.burnoutScoreUnit}>/100</div>
          </div>
        </div>

        {/* Trend Section */}
        <div className={`${styles.section} ${styles.trendSection}`}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleIcon}>📈</span>
            Your Trend
          </h2>

          <div className={styles.trendContainer}>
            <div className={styles.trendEmoji}>{getTrendEmoji(weeklySummary.trend)}</div>
            <div className={styles.trendContent}>
              <div className={styles.trendLabel}>Current Status</div>
              <div className={styles.trendStatus}>{weeklySummary.trend}</div>
              <div className={styles.trendDescription}>{getTrendDescription(weeklySummary.trend)}</div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className={`${styles.section} ${styles.recommendationsSection}`}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleIcon}>💡</span>
            Personalized Recommendations
          </h2>

          <div className={styles.recommendationsList}>
            {weeklySummary.recommendations.map((rec) => (
              <div key={rec.id} className={styles.recommendationCard}>
                <h3 className={styles.recommendationTitle}>{rec.title}</h3>
                <p className={styles.recommendationWhy}>{rec.why}</p>
                <div className={styles.recommendationSteps}>
                  {rec.steps.map((step, stepIdx) => (
                    <div key={stepIdx} className={styles.recommendationStep}>
                      <div className={styles.stepBullet}>{stepIdx + 1}</div>
                      <div className={styles.stepText}>{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
