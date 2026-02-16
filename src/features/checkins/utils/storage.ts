/**
 * Storage Utilities - localStorage abstraction
 * Handles all persistence operations for check-ins and contacts
 */

import type { CheckIn, EmergencyContact } from '../types';
import { STORAGE_KEYS } from '../constants';

/**
 * Generate a UUID-like device ID
 * Uses timestamp + random string for simplicity (no external UUID library)
 */
function generateDeviceUserId(): string {
  return `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get or create device user ID
 */
export function getDeviceUserId(): string {
  try {
    let deviceUserId = localStorage.getItem(STORAGE_KEYS.DEVICE_USER_ID);
    if (!deviceUserId) {
      deviceUserId = generateDeviceUserId();
      localStorage.setItem(STORAGE_KEYS.DEVICE_USER_ID, deviceUserId);
    }
    return deviceUserId;
  } catch {
    // Fallback if localStorage unavailable
    return generateDeviceUserId();
  }
}

/**
 * Get all check-ins for a device user
 */
export function getCheckIns(deviceUserId: string): CheckIn[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHECK_INS);
    if (!data) return [];
    const allCheckIns = JSON.parse(data) as CheckIn[];
    return allCheckIns.filter((ci) => ci.deviceUserId === deviceUserId);
  } catch {
    return [];
  }
}

/**
 * Get check-in by date for a device user
 */
export function getCheckInByDate(deviceUserId: string, date: string): CheckIn | null {
  const checkIns = getCheckIns(deviceUserId);
  return checkIns.find((ci) => ci.date === date) || null;
}

/**
 * Save or update a check-in
 */
export function saveCheckIn(checkIn: CheckIn): void {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHECK_INS);
    let allCheckIns: CheckIn[] = data ? JSON.parse(data) : [];

    // Check if check-in already exists (by id)
    const existingIndex = allCheckIns.findIndex((ci) => ci.id === checkIn.id);
    if (existingIndex >= 0) {
      allCheckIns[existingIndex] = checkIn;
    } else {
      allCheckIns.push(checkIn);
    }

    localStorage.setItem(STORAGE_KEYS.CHECK_INS, JSON.stringify(allCheckIns));
  } catch {
    console.error('Failed to save check-in');
  }
}

/**
 * Delete a check-in by ID
 */
export function deleteCheckIn(id: string): void {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHECK_INS);
    if (!data) return;
    let allCheckIns: CheckIn[] = JSON.parse(data);
    allCheckIns = allCheckIns.filter((ci) => ci.id !== id);
    localStorage.setItem(STORAGE_KEYS.CHECK_INS, JSON.stringify(allCheckIns));
  } catch {
    console.error('Failed to delete check-in');
  }
}

/**
 * Get emergency contacts
 */
export function getEmergencyContacts(): EmergencyContact[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EMERGENCY_CONTACTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Save emergency contacts
 */
export function saveEmergencyContacts(contacts: EmergencyContact[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.EMERGENCY_CONTACTS, JSON.stringify(contacts));
  } catch {
    console.error('Failed to save emergency contacts');
  }
}

/**
 * Clear all check-in data for a device user
 */
export function clearCheckInData(deviceUserId: string): void {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHECK_INS);
    if (!data) return;
    let allCheckIns: CheckIn[] = JSON.parse(data);
    allCheckIns = allCheckIns.filter((ci) => ci.deviceUserId !== deviceUserId);
    localStorage.setItem(STORAGE_KEYS.CHECK_INS, JSON.stringify(allCheckIns));
  } catch {
    console.error('Failed to clear check-in data');
  }
}

/**
 * Export all check-in data as JSON
 */
export function exportCheckInData(deviceUserId: string): string {
  const checkIns = getCheckIns(deviceUserId);
  return JSON.stringify(checkIns, null, 2);
}
