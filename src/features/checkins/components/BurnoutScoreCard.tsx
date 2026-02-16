/**
 * BurnoutScoreCard Component
 * Displays the burnout score with animated progress ring and severity label
 */

import { useState } from 'react';
import styles from './BurnoutScoreCard.module.css';

interface BurnoutScoreCardProps {
  score: number;
  delay?: number;
}

export default function BurnoutScoreCard({ score, delay = 0 }: BurnoutScoreCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  // Determine severity level and color
  const getSeverity = (s: number) => {
    if (s < 25) return { level: 'Low', color: '#10b981', bg: '#d1fae5' };
    if (s < 50) return { level: 'Moderate', color: '#f59e0b', bg: '#fef3c7' };
    if (s < 75) return { level: 'High', color: '#ef4444', bg: '#fee2e2' };
    return { level: 'Critical', color: '#dc2626', bg: '#fecaca' };
  };

  const severity = getSeverity(score);
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={styles.card} style={{ animationDelay: `${delay}ms` }}>
      <div className={styles.header}>
        <h3 className={styles.title}>Burnout Score</h3>
        <button
          className={styles.infoButton}
          onClick={() => setShowExplanation(!showExplanation)}
          aria-label="Toggle explanation"
        >
          ?
        </button>
      </div>

      <div className={styles.scoreContainer}>
        <svg className={styles.progressRing} viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={severity.color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={styles.progressCircle}
            style={{
              '--target-offset': strokeDashoffset,
            } as React.CSSProperties}
          />
        </svg>
        <div className={styles.scoreText}>
          <p className={styles.scoreValue}>{score}</p>
          <p className={styles.scoreMax}>/100</p>
        </div>
      </div>

      <div className={styles.severityBadge} style={{ backgroundColor: severity.bg }}>
        <span style={{ color: severity.color }} className={styles.severityLabel}>
          {severity.level} Risk
        </span>
      </div>

      {showExplanation && (
        <div className={styles.explanation}>
          <p>
            Your burnout score is calculated from your sleep, stress, workload, and mood.
            Higher scores indicate greater burnout risk. Consider taking action if your score
            is consistently high.
          </p>
        </div>
      )}

      <a href="/checkins/new" className={styles.updateLink}>
        Update Check-in →
      </a>
    </div>
  );
}
