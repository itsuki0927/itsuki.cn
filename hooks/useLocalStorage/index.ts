import { getJSON, setJSON } from '@/utils/storage';
import { useState } from 'react';

type SetLocalStorageValue<T> = T | ((newValue: T) => T);

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
      const value = getJSON(key);

      if (value) {
        return value as T;
      } else {
        setJSON(key, defaultValue);
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue: SetLocalStorageValue<T>) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(storedValue) : newValue;
      setJSON(key, valueToStore);
      setStoredValue({ ...valueToStore });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('useLocalStorage setValue:', error);
    }
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
