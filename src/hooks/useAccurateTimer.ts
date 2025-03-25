import { useState, useMemo, useRef, useEffect } from "react";

const useAccurateTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Format time, recalculate only when time changes
  const formattedTime = useMemo(() => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    return `${seconds}.${Math.floor(milliseconds / 100)
      .toString()
      .padStart(1, "0")}s`;
  }, [time]);

  // Use useCallback to optimize start and stop functions to avoid unnecessary re-rendering
  const start = () => {
    if (time > 0) setTime(0);
    if (!isRunning && !timerRef.current) {
      setIsRunning(true);
      // Record the start time, taking into account the pause situation
      startTimeRef.current = Date.now() - time;

      const tick = () => {
        if (startTimeRef.current !== null) {
          setTime(Date.now() - startTimeRef.current);
          // Using requestAnimationFrame
          timerRef.current = requestAnimationFrame(tick);
        }
      };

      // Start the animation frame loop
      timerRef.current = requestAnimationFrame(tick);
    }
  };

  const stop = () => {
    if (isRunning && timerRef.current) {
      setIsRunning(false);
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
      setTime(0);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, []);

  return {
    time,
    formattedTime,
    isRunning,
    start,
    stop,
  };
};

export default useAccurateTimer;
