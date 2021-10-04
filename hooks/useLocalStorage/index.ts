import { get, setJSON } from '@/utils/storage';
import { useState } from 'react';

/**
 * localStorage hook
 *
 * @param key key
 * @param defaultValue 默认值
 * @returns value
 */
const useLocalStorage = <T = any>(key: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = get(key);

      if (value) {
        return JSON.parse(value) as T;
      } else {
        setJSON(key, defaultValue);
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      setJSON(key, newValue);
    } catch (error) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue] as [T, (newValue: T) => void];
};

export default useLocalStorage;
