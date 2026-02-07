import { motion } from "framer-motion";

interface SemiCircleProgressProps {
  progress: number; // 0-100
  hours: number;
  minutes: number;
  remainingText: string;
  className?: string;
}

export const CircularProgress = ({
  progress,
  hours,
  minutes,
  remainingText,
  className = "",
}: SemiCircleProgressProps) => {
  const radius = 80;
  const strokeWidth = 16;
  const centerX = 120;
  const centerY = 100;
  
  // Arc path for semi-circle (180° arc from left to right)
  const startX = centerX - radius;
  const startY = centerY;
  const endX = centerX + radius;
  const endY = centerY;
  
  // Background arc path
  const arcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
  
  // Calculate the arc length for animation
  const arcLength = Math.PI * radius;
  const progressOffset = arcLength * (1 - progress / 100);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <svg width="240" height="120" viewBox="0 0 240 120">
        {/* Background arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Progress arc */}
        <motion.path
          d={arcPath}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={progressOffset}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: progressOffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">

        {/* Time display */}
        <div className="flex items-baseline gap-0.5">
          <motion.span
            className="text-3xl font-bold text-foreground tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {hours}
          </motion.span>
          <span className="text-sm font-medium text-muted-foreground">h</span>
          <motion.span
            className="text-3xl font-bold text-foreground tracking-tight ml-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {minutes}
          </motion.span>
          <span className="text-sm font-medium text-muted-foreground">m</span>
        </div>
        
        {/* Remaining text */}
        <motion.p
          className="text-[11px] text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {remainingText}
        </motion.p>
      </div>
    </div>
  );
};
