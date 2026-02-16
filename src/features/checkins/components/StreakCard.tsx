/**
 * StreakCard Component
 * Displays current streak with mini calendar indicator
 */

import styles from './StreakCard.module.css';
import { getLast7Days } from '../utils/dateHelpers';
import type { CheckIn } from '../types';

interface StreakCardProps {
  streak: number;
  checkIns: CheckIn[];
  delay?: number;
}

export default function StreakCard({ streak, checkIns, delay = 0 }: StreakCardProps) {
  const last7Days = getLast7Days();
  const checkInDates = new Set(checkIns.map((ci) => ci.date));

  return (
    <div className={styles.card} style={{ animationDelay: `${delay}ms` }}>
      <div className={styles.header}>
        <h3 className={styles.title}>Your Streak</h3>
        <span className={styles.flame}>🔥</span>
      </div>

      <div className={styles.streakNumber}>
        <p className={styles.number}>{streak}</p>
        <p className={styles.label}>days</p>
      </div>

      <p className={styles.subtitle}>Keep checking in daily to maintain your streak!</p>

      {/* Mini calendar for last 7 days */}
      <div className={styles.miniCalendar}>
        {last7Days.reverse().map((date) => {
          const hasCheckIn = checkInDates.has(date);
          const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <div
              key={date}
              className={`${styles.dayDot} ${hasCheckIn ? styles.checked : ''}`}
              title={`${dayName} - ${hasCheckIn ? 'Checked in' : 'No check-in'}`}
            >
              {hasCheckIn && <span className={styles.checkmark}>✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
