/**
 * Daily Check-ins Dashboard Page
 * Modern, polished dashboard with smooth animations
 */

import styles from './CheckInsPage.module.css';
import { useDeviceUser } from '../hooks/useDeviceUser';
import { useCheckIns } from '../hooks/useCheckIns';
import { useWeeklySummary } from '../hooks/useWeeklySummary';
import { getTodayLocalDate } from '../utils/dateHelpers';
import { calculateStreak } from '../utils/streak';
import { detectRedFlags } from '../utils/redFlags';
import StatCard from '../components/StatCard';
import BurnoutScoreCard from '../components/BurnoutScoreCard';
import StreakCard from '../components/StreakCard';
import WeeklyMetricsCard from '../components/WeeklyMetricsCard';
import RedFlagAlert from '../components/RedFlagAlert';
import DisclaimerCard from '../components/DisclaimerCard';

export default function CheckInsPage() {
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

  const today = getTodayLocalDate();
  const todayCheckIn = checkIns.find((ci) => ci.date === today);
  const streak = calculateStreak(checkIns, today);
  const redFlags = detectRedFlags(checkIns, today);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Hero Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Daily Check-in Dashboard</h1>
            <p className={styles.subtitle}>
              {todayCheckIn
                ? 'You\'ve checked in today. Keep tracking your wellness!'
                : 'Start your daily check-in to track your burnout risk'}
            </p>
          </div>
          {!todayCheckIn && (
            <a href="/checkins/new" className={styles.ctaButton}>
              Start Check-in
            </a>
          )}
        </div>

        {/* Red Flag Alert */}
        {redFlags.isTriggered && <RedFlagAlert reason={redFlags.reason} />}

        {/* Today's Metrics Section */}
        {todayCheckIn && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Today's Metrics</h2>
            <div className={styles.metricsGrid}>
              <StatCard
                label="Sleep"
                value={todayCheckIn.sleep_hours}
                unit="h"
                icon="😴"
                delay={0}
              />
              <StatCard
                label="Stress"
                value={todayCheckIn.stress}
                unit="/10"
                icon="😰"
                delay={50}
              />
              <StatCard
                label="Workload"
                value={todayCheckIn.workload}
                unit="/10"
                icon="💼"
                delay={100}
              />
              <StatCard
                label="Mood"
                value={todayCheckIn.mood}
                unit="/10"
                icon="😊"
                delay={150}
              />
              <BurnoutScoreCard score={todayCheckIn.burnout_score} delay={200} />
            </div>
          </div>
        )}

        {/* Streak & Weekly Section */}
        <div className={styles.section}>
          <div className={styles.twoColumnGrid}>
            <StreakCard streak={streak} checkIns={checkIns} delay={todayCheckIn ? 250 : 0} />
            <WeeklyMetricsCard summary={weeklySummary} delay={todayCheckIn ? 300 : 50} />
          </div>
        </div>

        {/* Disclaimer */}
        <DisclaimerCard />
      </div>
    </div>
  );
}
