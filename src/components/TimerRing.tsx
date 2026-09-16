"use client";

import React, { useEffect } from "react";
import { soundFx } from "@/lib/sound";

interface TimerRingProps {
  timeLeft: number; // 0 to 15
  totalTime?: number; // 15
  isPaused?: boolean;
}

export const TimerRing: React.FC<TimerRingProps> = ({
  timeLeft,
  totalTime = 15,
}) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / totalTime) * circumference;

  const isCritical = timeLeft <= 5 && timeLeft > 0;

  useEffect(() => {
    if (isCritical) {
      soundFx.playWarningTick();
    }
  }, [timeLeft, isCritical]);

  return (
    <div
      className={`relative flex items-center justify-center transition-all duration-300 ${
        isCritical ? "scale-110 animate-bounce" : ""
      }`}
    >
      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
        {/* Background Track */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="rgba(255, 241, 209, 0.1)"
          strokeWidth="6"
          fill="transparent"
        />

        {/* Dynamic Progress Circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={isCritical ? "#df301c" : "#00b7cd"}
          strokeWidth="6"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`transition-all duration-300 ease-linear ${
            isCritical
              ? "drop-shadow-[0_0_15px_rgba(223,48,28,0.9)]"
              : "drop-shadow-[0_0_10px_rgba(0,183,205,0.8)]"
          }`}
        />
      </svg>

      {/* Center Digital Clock Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-mono font-black text-xl leading-none transition-colors duration-200 ${
            isCritical
              ? "text-[#df301c] drop-shadow-[0_0_10px_rgba(223,48,28,0.8)] animate-pulse"
              : "text-[#fff1d1]"
          }`}
        >
          {timeLeft}s
        </span>
        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#ff9100]">
          Time
        </span>
      </div>

      {/* Warning Glow Ring */}
      {isCritical && (
        <div className="absolute inset-0 rounded-full bg-[#df301c]/25 blur-md -z-10 animate-ping" />
      )}
    </div>
  );
};
