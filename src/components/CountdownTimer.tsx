import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-11-05T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="cyber-border bg-card/50 backdrop-blur-sm px-3 py-2 rounded min-w-[60px] text-center">
          <div className="text-2xl md:text-3xl font-bold text-glow tabular-nums">
            {value.toString().padStart(2, "0")}
          </div>
        </div>
        <div className="absolute -inset-1 cyber-border rounded opacity-50 animate-pulse-glow" />
      </div>
      <div className="text-[10px] md:text-xs text-muted-foreground mt-1 font-mono uppercase tracking-wider">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-2 md:gap-4 justify-center items-center">
      <TimeUnit value={timeLeft.days} label="DAYS" />
      <div className="text-2xl text-primary animate-pulse-glow">:</div>
      <TimeUnit value={timeLeft.hours} label="HOURS" />
      <div className="text-2xl text-primary animate-pulse-glow">:</div>
      <TimeUnit value={timeLeft.minutes} label="MINUTES" />
      <div className="text-2xl text-primary animate-pulse-glow">:</div>
      <TimeUnit value={timeLeft.seconds} label="SECONDS" />
    </div>
  );
};
