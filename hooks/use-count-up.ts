'use client';

import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  easing?: 'easeOut' | 'easeInOut' | 'linear';
  formatValue?: (value: number) => string;
  enabled?: boolean;
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  easing = 'easeOut',
  formatValue = (v) => Math.round(v).toLocaleString('en-US'),
  enabled = true,
}: UseCountUpOptions) {
  const [value, setValue] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const easingFunctions = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  };

  useEffect(() => {
    if (!enabled) {
      setValue(start);
      setIsComplete(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFunctions[easing](progress);
        const currentValue = start + (end - start) * easedProgress;

        setValue(currentValue);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setIsComplete(true);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      startTimeRef.current = null;
    };
  }, [enabled, start, end, duration, delay, easing]);

  return {
    value,
    formattedValue: formatValue(value),
    isComplete,
  };
}
