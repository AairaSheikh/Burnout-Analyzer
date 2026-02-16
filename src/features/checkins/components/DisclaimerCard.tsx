/**
 * DisclaimerCard Component
 * Displays important disclaimer about the tool
 */

import styles from './DisclaimerCard.module.css';
import { DISCLAIMER } from '../constants';

export default function DisclaimerCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>ℹ️</span>
        <h3 className={styles.title}>Important Disclaimer</h3>
      </div>
      <p className={styles.text}>{DISCLAIMER}</p>
    </div>
  );
}
