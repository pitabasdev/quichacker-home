import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  // Set target date to 60 days from now
  const calculateTargetDate = () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 60);
    return targetDate;
  };
  
  const [targetDate] = useState<Date>(calculateTargetDate());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Update immediately to avoid delay
    setTimeLeft(calculateTimeLeft());
    
    // Set up interval to update countdown
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Format number to always show two digits
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex flex-col items-center relative">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center bg-black border border-[#00FFD1]/30 rounded-lg shadow-[0_0_15px_rgba(0,255,209,0.2)] backdrop-blur-sm">
                <span className="text-xl sm:text-3xl md:text-4xl font-orbitron font-bold text-white">
                  {formatNumber(unit.value)}
                </span>
                
                {/* Highlight corners for 3D effect */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: '#00FFD1' }}></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: '#00FFD1' }}></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: '#00FFD1' }}></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: '#00FFD1' }}></div>
                
                {/* Animated glowing dot */}
                <div className="absolute bottom-1 right-1 w-1 h-1 bg-[#00FFD1] rounded-full animate-pulse"></div>
              </div>
            </div>
            <span className="mt-2 text-[10px] sm:text-xs text-[#00FFD1] font-orbitron tracking-wider">{unit.label}</span>
            
            {/* Add separator except for the last item */}
            {index < timeUnits.length - 1 && (
              <div className="absolute right-[-8px] sm:right-[-12px] top-1/2 transform -translate-y-1/2 text-lg sm:text-2xl text-[#00FFD1]">:</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}