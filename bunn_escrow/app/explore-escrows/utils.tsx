"use client";
import { useState, useEffect } from "react";

export const FormatTimeLeft = ({
  timeInSeconds,
  className,
}: {
  timeInSeconds: number;
  className?: string;
}) => {
  const [tick, setTick] = useState<boolean>();
  useEffect(() => {
    if (timeInSeconds) setInterval(() => setTick(!tick), 1000);
  }, [tick, timeInSeconds]);

  if (!timeInSeconds) return <span className={className}>No set time</span>;
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDiff = timeInSeconds - currentTime;

  if (timeDiff < 0) return "0h 0m 00s";

  // Convert time left into days, hours, minutes, and seconds
  const daysLeft = Math.floor(timeDiff / (60 * 60 * 24));
  const hoursLeft = Math.floor((timeDiff % (60 * 60 * 24)) / (60 * 60));
  const minutesLeft = Math.floor((timeDiff % (60 * 60)) / 60);
  const secondsLeft = timeDiff % 60;

  let returnString: string = `${
    daysLeft < 0 ? daysLeft + "d" : ""
  } ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;

  return <span className={className}>{returnString}</span>;
};

export const FormatString = ({ text }: { text: string }) => {
  return (
    <span>
      {text.slice(0, 5)}...{text.slice(text.length - 5, text.length)}
    </span>
  );
};
