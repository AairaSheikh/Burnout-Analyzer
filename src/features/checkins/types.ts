/**
 * Daily Check-ins Feature - TypeScript Types
 * Defines all data structures for the check-in system
 */

export interface CheckIn {
  id: string;
  deviceUserId: string;
  date: string; // YYYY-MM-DD (local date)
  sleep_hours: number; // 0-12, step 0.5
  stress: number; // 1-10
  workload: number; // 1-10
  mood: number; // 1-10
  notes?: string; // max 280 chars
  burnout_score: number; // 0-100, computed
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface WeeklySummary {
  deviceUserId: string;
  weekStartDate: string; // YYYY-MM-DD
  avgSleep: number;
  avgStress: number;
  avgWorkload: number;
  avgMood: number;
  avgBurnoutScore: number;
  trend: 'improving' | 'stable' | 'worsening';
  recommendations: Recommendation[];
}

export interface Recommendation {
  id: string;
  title: string;
  why: string; // 1 sentence
  steps: string[]; // 3 bullets
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface RedFlagState {
  isTriggered: boolean;
  reason?: 'high_score_streak' | 'score_spike' | 'low_mood_streak';
}

export interface CheckInFormData {
  sleep_hours: number;
  stress: number;
  workload: number;
  mood: number;
  notes?: string;
}

export interface DailyMetrics {
  avgSleep: number;
  avgStress: number;
  avgWorkload: number;
  avgMood: number;
  avgBurnoutScore: number;
}
