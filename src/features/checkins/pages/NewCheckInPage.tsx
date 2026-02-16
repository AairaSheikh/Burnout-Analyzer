/**
 * New Check-in Form Page
 * Allows users to create or edit today's check-in
 * Premium form design with smooth animations and custom inputs
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeviceUser } from '../hooks/useDeviceUser';
import { useCheckIns } from '../hooks/useCheckIns';
import { calculateBurnoutScore } from '../utils/scoring';
import type { CheckInFormData } from '../types';
import styles from './NewCheckInPage.module.css';

export default function NewCheckInPage() {
  const navigate = useNavigate();
  const { deviceUserId, isLoading: userLoading } = useDeviceUser();
  const { getTodayCheckIn, save, isLoading: checkInsLoading } = useCheckIns(deviceUserId || '');

  const existingCheckIn = getTodayCheckIn();

  const [formData, setFormData] = useState<CheckInFormData>({
    sleep_hours: existingCheckIn?.sleep_hours || 7,
    stress: existingCheckIn?.stress || 5,
    workload: existingCheckIn?.workload || 5,
    mood: existingCheckIn?.mood || 5,
    notes: existingCheckIn?.notes || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'notes' ? value : parseFloat(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const burnoutScore = calculateBurnoutScore(
        formData.sleep_hours,
        formData.stress,
        formData.workload,
        formData.mood
      );

      save(formData, burnoutScore);
      navigate('/checkins');
    } catch (error) {
      console.error('Failed to save check-in:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userLoading || checkInsLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <div className={styles.spinner} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {existingCheckIn ? 'Update Today\'s Check-in' : 'New Check-in'}
          </h1>
          <p className={styles.subtitle}>Takes about 60 seconds</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Sleep Section */}
          <div className={styles.section}>
            <div className={styles.field}>
              <label className={styles.label}>
                <span className={styles.icon}>😴</span>
                How many hours did you sleep?
              </label>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  name="sleep_hours"
                  min="0"
                  max="12"
                  step="0.5"
                  value={formData.sleep_hours}
                  onChange={handleChange}
                  className={styles.slider}
                  aria-label="Sleep hours"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className={styles.sliderLabels}>
                    <span>0h</span>
                    <span>12h</span>
                  </div>
                  <span className={styles.valueDisplay}>{formData.sleep_hours}h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stress Section */}
          <div className={styles.section}>
            <div className={styles.field}>
              <label className={styles.label}>
                <span className={styles.icon}>😰</span>
                How stressed do you feel?
              </label>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  name="stress"
                  min="1"
                  max="10"
                  value={formData.stress}
                  onChange={handleChange}
                  className={styles.slider}
                  aria-label="Stress level"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className={styles.sliderLabels}>
                    <span>Not stressed</span>
                    <span>Very stressed</span>
                  </div>
                  <span className={styles.valueDisplay}>{formData.stress}/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Workload Section */}
          <div className={styles.section}>
            <div className={styles.field}>
              <label className={styles.label}>
                <span className={styles.icon}>💼</span>
                How heavy is your workload?
              </label>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  name="workload"
                  min="1"
                  max="10"
                  value={formData.workload}
                  onChange={handleChange}
                  className={styles.slider}
                  aria-label="Workload level"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className={styles.sliderLabels}>
                    <span>Light</span>
                    <span>Very heavy</span>
                  </div>
                  <span className={styles.valueDisplay}>{formData.workload}/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mood Section */}
          <div className={styles.section}>
            <div className={styles.field}>
              <label className={styles.label}>
                <span className={styles.icon}>😊</span>
                How is your mood?
              </label>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  name="mood"
                  min="1"
                  max="10"
                  value={formData.mood}
                  onChange={handleChange}
                  className={styles.slider}
                  aria-label="Mood level"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className={styles.sliderLabels}>
                    <span>Very low</span>
                    <span>Very good</span>
                  </div>
                  <span className={styles.valueDisplay}>{formData.mood}/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className={styles.section}>
            <div className={styles.field}>
              <label className={styles.label}>
                <span className={styles.icon}>📝</span>
                Any notes? (optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                maxLength={280}
                rows={3}
                className={styles.textarea}
                placeholder="What's on your mind?"
                aria-label="Additional notes"
              />
              <div className={styles.textareaHint}>
                <span>Max 280 characters</span>
                <span className={styles.charCount}>{formData.notes?.length || 0}/280</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.button} ${styles.buttonPrimary}`}
              aria-busy={isSubmitting}
            >
              {isSubmitting && <span className={styles.spinner} />}
              {isSubmitting ? 'Saving...' : 'Save Check-in'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/checkins')}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
