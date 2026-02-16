/**
 * useCheckIns Hook
 * Manages check-in CRUD operations and localStorage sync
 */

import { useState, useCallback, useEffect } from 'react';
import type { CheckIn, CheckInFormData } from '../types';
import * as storage from '../utils/storage';
import { getTodayLocalDate } from '../utils/dateHelpers';

export function useCheckIns(deviceUserId: string) {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load check-ins on mount
  useEffect(() => {
    const loaded = storage.getCheckIns(deviceUserId);
    setCheckIns(loaded);
    setIsLoading(false);
  }, [deviceUserId]);

  // Get all check-ins
  const getAll = useCallback(() => {
    return storage.getCheckIns(deviceUserId);
  }, [deviceUserId]);

  // Get check-in by date
  const getByDate = useCallback(
    (date: string) => {
      return storage.getCheckInByDate(deviceUserId, date);
    },
    [deviceUserId]
  );

  // Get today's check-in
  const getTodayCheckIn = useCallback(() => {
    const today = getTodayLocalDate();
    return storage.getCheckInByDate(deviceUserId, today);
  }, [deviceUserId]);

  // Save check-in (create or update)
  const save = useCallback(
    (formData: CheckInFormData, burnoutScore: number) => {
      const today = getTodayLocalDate();
      const existing = storage.getCheckInByDate(deviceUserId, today);

      const checkIn: CheckIn = {
        id: existing?.id || `checkin_${Date.now()}`,
        deviceUserId,
        date: today,
        sleep_hours: formData.sleep_hours,
        stress: formData.stress,
        workload: formData.workload,
        mood: formData.mood,
        notes: formData.notes,
        burnout_score: burnoutScore,
        createdAt: existing?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      storage.saveCheckIn(checkIn);
      setCheckIns(storage.getCheckIns(deviceUserId));
      return checkIn;
    },
    [deviceUserId]
  );

  // Delete check-in
  const delete_ = useCallback(
    (id: string) => {
      storage.deleteCheckIn(id);
      setCheckIns(storage.getCheckIns(deviceUserId));
    },
    [deviceUserId]
  );

  // Clear all data
  const clearAll = useCallback(() => {
    storage.clearCheckInData(deviceUserId);
    setCheckIns([]);
  }, [deviceUserId]);

  return {
    checkIns,
    isLoading,
    getAll,
    getByDate,
    getTodayCheckIn,
    save,
    delete: delete_,
    clearAll,
  };
}
