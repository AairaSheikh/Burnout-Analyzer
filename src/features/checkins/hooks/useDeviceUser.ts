/**
 * useDeviceUser Hook
 * Manages device user ID (generates if missing, persists in localStorage)
 */

import { useState, useEffect } from 'react';
import * as storage from '../utils/storage';

export function useDeviceUser() {
  const [deviceUserId, setDeviceUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = storage.getDeviceUserId();
    setDeviceUserId(id);
    setIsLoading(false);
  }, []);

  return {
    deviceUserId,
    isLoading,
  };
}
