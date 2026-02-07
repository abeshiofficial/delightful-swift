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
  size = 220,
  strokeWidth = 10,
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
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Time display - smaller and refined */}
        <div className="flex items-baseline gap-0.5 mb-1">
          <motion.span
            className="text-2xl font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {hours}
          </motion.span>
          <span className="text-sm font-medium text-muted-foreground">時間</span>
          <motion.span
            className="text-2xl font-bold text-foreground ml-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {minutes}
          </motion.span>
          <span className="text-sm font-medium text-muted-foreground">分</span>
        </div>
        
        {/* Remaining text */}
        <motion.p
          className="text-xs text-muted-foreground mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {remainingText}
        </motion.p>

        {/* Mascot at bottom of circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        >
          <MiniMascot />
        </motion.div>
      </div>
    </div>
  );
};
