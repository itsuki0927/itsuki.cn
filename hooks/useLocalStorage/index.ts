/* eslint-disable no-console */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getJSON, setJSON } from '@/utils';
import { useEventListener } from '../index';

type SetValue<T> = Dispatch<SetStateAction<T>>;

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  const readValue = (): T => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = getJSON(key) as T;
      return item ?? initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = value => {
    if (typeof window === 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      );
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;

      setJSON(key, newValue);
      setStoredValue(newValue);

      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = () => {
    setStoredValue(readValue());
  };

  useEventListener(() => window, 'storage' as any, handleStorageChange);

  useEventListener(() => window, 'local-storage' as any, handleStorageChange);

  return [storedValue, setValue];
};

export default useLocalStorage;
