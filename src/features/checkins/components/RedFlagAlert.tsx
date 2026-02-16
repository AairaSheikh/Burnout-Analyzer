/**
 * RedFlagAlert Component
 * Displays alert when user shows signs of severe burnout
 */

import styles from './RedFlagAlert.module.css';
import { getRedFlagMessage, getRedFlagSelfCareSuggestions } from '../utils/redFlags';

interface RedFlagAlertProps {
  reason?: string;
}

export default function RedFlagAlert({ reason }: RedFlagAlertProps) {
  const suggestions = getRedFlagSelfCareSuggestions();

  return (
    <div className={styles.alert}>
      <div className={styles.header}>
        <span className={styles.icon}>⚠️</span>
        <h3 className={styles.title}>You Might Be at Risk</h3>
      </div>

      <p className={styles.message}>{getRedFlagMessage(reason)}</p>

      <div className={styles.suggestionsSection}>
        <p className={styles.suggestionsTitle}>Quick Self-Care Tips:</p>
        <ul className={styles.suggestionsList}>
          {suggestions.slice(0, 3).map((suggestion, idx) => (
            <li key={idx} className={styles.suggestionItem}>
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      <a href="/checkins/settings" className={styles.contactsLink}>
        View Emergency Contacts →
      </a>
    </div>
  );
}
