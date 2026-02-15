/**
 * Daily Check-ins Feature - Constants
 * Thresholds, rules, and recommendation ruleset
 */

import type { Recommendation } from './types';

// Burnout score thresholds
export const BURNOUT_THRESHOLDS = {
  LOW: 25,
  MODERATE: 50,
  HIGH: 75,
};

// Red-flag thresholds
export const RED_FLAG_THRESHOLDS = {
  SCORE_CRITICAL: 75,
  SCORE_SPIKE: 20,
  MOOD_CRITICAL: 3,
  CONSECUTIVE_DAYS: 2,
};

// Metric thresholds for recommendations
export const METRIC_THRESHOLDS = {
  LOW_SLEEP: 6,
  HIGH_WORKLOAD: 7,
  HIGH_STRESS: 7,
  LOW_MOOD: 5,
};

// Trend thresholds
export const TREND_THRESHOLDS = {
  IMPROVING: 5,
  WORSENING: 5,
};

// Recommendation ruleset
export const RECOMMENDATION_RULESET: Record<string, Recommendation> = {
  low_sleep: {
    id: 'low_sleep',
    title: 'Sleep Target Plan',
    why: 'Consistent sleep deprivation is a major burnout driver.',
    steps: [
      'Set a consistent bedtime 30 min earlier than usual',
      'Create a wind-down routine: dim lights, no screens 30 min before bed',
      'Track sleep for 1 week and adjust if needed',
    ],
  },
  high_workload: {
    id: 'high_workload',
    title: 'Workload Boundary Plan',
    why: 'Sustained high workload without breaks leads to burnout.',
    steps: [
      'Identify 2-3 tasks you can delegate or defer this week',
      'Block 30-min focus breaks every 2 hours on your calendar',
      'Review your workload with a manager or peer',
    ],
  },
  high_stress: {
    id: 'high_stress',
    title: 'Micro-Break Plan',
    why: 'Chronic stress without relief accumulates into burnout.',
    steps: [
      'Take 5-min breathing breaks every 2 hours (box breathing: 4-4-4-4)',
      'Step outside for 10 min during lunch',
      'Practice one stress-relief activity daily (walk, stretch, music)',
    ],
  },
  low_mood: {
    id: 'low_mood',
    title: 'Support + Light Activity Plan',
    why: 'Low mood combined with other factors indicates burnout risk.',
    steps: [
      'Reach out to a friend or colleague for a 15-min chat',
      'Do one activity you enjoy today (hobby, walk, creative task)',
      'Consider talking to a counselor or therapist',
    ],
  },
};

// Disclaimer text
export const DISCLAIMER = `
This tool is not a substitute for professional medical advice, diagnosis, or treatment. 
The burnout assessment provided here is for informational purposes only and should not be 
considered a clinical diagnosis. If you are experiencing severe burnout symptoms, please 
consult with a mental health professional or your healthcare provider.
`;

// Storage keys
export const STORAGE_KEYS = {
  DEVICE_USER_ID: 'burnout_device_user_id',
  CHECK_INS: 'burnout_check_ins',
  EMERGENCY_CONTACTS: 'burnout_emergency_contacts',
};

// Streak and reminder settings
export const REMINDER_HOUR = 20; // 8 PM
export const HISTORY_LIMIT = 30;
export const WEEKLY_DAYS = 7;
