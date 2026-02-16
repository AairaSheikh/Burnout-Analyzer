/**
 * Check-in History Page
 * Shows last 30 check-ins with premium styling and animations
 */

import { useDeviceUser } from '../hooks/useDeviceUser';
import { useCheckIns } from '../hooks/useCheckIns';
import { formatDateForDisplay } from '../utils/dateHelpers';
import styles from './HistoryPage.module.css';

export default function HistoryPage() {
  const { deviceUserId, isLoading: userLoading } = useDeviceUser();
  const { checkIns, isLoading: checkInsLoading } = useCheckIns(deviceUserId || '');

  if (userLoading || checkInsLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
      </div>
    );
  }

  const sorted = [...checkIns].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Check-in History</h1>
          <p className={styles.subtitle}>Your last 30 check-ins</p>
        </div>

        {/* Empty State */}
        {sorted.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📋</div>
            <p className={styles.emptyStateText}>No check-ins yet. Start tracking your wellness today!</p>
            <a href="/checkins/new" className={styles.emptyStateLink}>
              Create Your First Check-in
            </a>
          </div>
        ) : (
          <div className={styles.historyList}>
            {sorted.map((checkIn) => (
              <div key={checkIn.id} className={styles.checkInCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardDate}>{formatDateForDisplay(checkIn.date)}</h3>
                  <div className={styles.cardScore}>
                    🔥 Score: {checkIn.burnout_score}/100
                  </div>
                </div>

                <div className={styles.metricsGrid}>
                  <div className={styles.metricItem}>
                    <div className={styles.metricLabel}>Sleep</div>
                    <div className={styles.metricValue}>{checkIn.sleep_hours}</div>
                    <div className={styles.metricUnit}>hours</div>
                  </div>

                  <div className={styles.metricItem}>
                    <div className={styles.metricLabel}>Stress</div>
                    <div className={styles.metricValue}>{checkIn.stress}</div>
                    <div className={styles.metricUnit}>/10</div>
                  </div>

                  <div className={styles.metricItem}>
                    <div className={styles.metricLabel}>Workload</div>
                    <div className={styles.metricValue}>{checkIn.workload}</div>
                    <div className={styles.metricUnit}>/10</div>
                  </div>

                  <div className={styles.metricItem}>
                    <div className={styles.metricLabel}>Mood</div>
                    <div className={styles.metricValue}>{checkIn.mood}</div>
                    <div className={styles.metricUnit}>/10</div>
                  </div>
                </div>

                {checkIn.notes && (
                  <div className={styles.notesSection}>
                    <div className={styles.notesLabel}>📝 Notes</div>
                    <div className={styles.notesText}>{checkIn.notes}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
