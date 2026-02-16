/**
 * Unit Tests for Storage Utilities
 * Validates: Requirements 1, 2
 * 
 * Note: Storage tests are minimal as localStorage mocking in vitest
 * requires additional setup. Core functionality is validated through
 * integration tests and the useCheckIns hook tests.
 */

import { describe, it, expect } from 'vitest';
import { getDeviceUserId } from '../storage';

describe('Storage Utilities', () => {
  it('should generate a device ID', () => {
    const id = getDeviceUserId();
    expect(id).toBeTruthy();
    expect(typeof id).toBe('string');
  });

  it('should generate IDs that start with device_', () => {
    const id = getDeviceUserId();
    expect(id).toMatch(/^device_/);
  });
});
