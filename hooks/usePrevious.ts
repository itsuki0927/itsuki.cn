import { useEffect, useRef } from 'react';

const usePrevious = <T>(value: T) => {
  const prevRef = useRef<T>(value);

  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  return prevRef.current;
};

export default usePrevious;
