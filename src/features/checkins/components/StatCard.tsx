/**
 * StatCard Component
 * Displays a single metric with label and value
 * Used for Sleep, Stress, Workload, Mood
 */

import styles from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
  delay?: number;
}

export default function StatCard({ label, value, unit = '', icon, delay = 0 }: StatCardProps) {
  return (
    <div className={styles.card} style={{ animationDelay: `${delay}ms` }}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <p className={styles.label}>{label}</p>
      <div className={styles.valueContainer}>
        <p className={styles.value}>{value}</p>
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
    </div>
  );
}
