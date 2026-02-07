import { motion } from "framer-motion";
import { MiniMascot } from "./MiniMascot";

interface CircularProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  hours: number;
  minutes: number;
  remainingText: string;
  className?: string;
}

export const CircularProgress = ({
  progress,
  size = 200,
  strokeWidth = 8,
  hours,
  minutes,
  remainingText,
  className = "",
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        {/* Time display */}
        <div className="flex items-baseline gap-0.5">
          <motion.span
            className="text-3xl font-bold text-foreground tracking-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            {hours}
          </motion.span>
          <span className="text-sm font-medium text-muted-foreground">h</span>
          <motion.span
            className="text-3xl font-bold text-foreground tracking-tight ml-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            {minutes}
          </motion.span>
          <span className="text-sm font-medium text-muted-foreground">m</span>
        </div>
        
        {/* Remaining text */}
        <motion.p
          className="text-[11px] text-muted-foreground mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {remainingText}
        </motion.p>

        {/* Mascot */}
        <motion.div
          className="mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          <MiniMascot />
        </motion.div>
      </div>
    </div>
  );
};
