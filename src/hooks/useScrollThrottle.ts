import { useCallback, useEffect, useState } from 'react';

export const useScrollThrottle = (callback: () => void, delay: number = 100) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const throttledCallback = useCallback(() => {
    if (timeoutId) return;

    callback();
    const id = setTimeout(() => setTimeoutId(null), delay);
    setTimeoutId(id);
  }, [callback, delay, timeoutId]);

  useEffect(() => {
    window.addEventListener('scroll', throttledCallback, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledCallback);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [throttledCallback, timeoutId]);

  return throttledCallback;
};