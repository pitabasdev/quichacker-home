import { useState, useEffect } from 'react';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const calculateTimeLeft = (targetDate: Date): CountdownResult => {
  const now = new Date().getTime();
  const targetTime = targetDate.getTime();
  const timeLeft = targetTime - now;
  
  if (timeLeft <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true
    };
  }
  
  // Calculate time units
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false
  };
};

export default function useCountdown(targetDate: Date): CountdownResult {
  const [countdown, setCountdown] = useState<CountdownResult>(calculateTimeLeft(targetDate));
  
  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft(targetDate);
      setCountdown(timeLeft);
      
      if (timeLeft.isExpired) {
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);
  
  return countdown;
}
