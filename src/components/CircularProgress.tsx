import { motion } from "framer-motion";
import { MiniMascot } from "./MiniMascot";

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
  const totalSegments = 24;
  const filledSegments = Math.round((progress / 100) * totalSegments);
  
  // Semi-circle arc from 180° to 0° (left to right)
  const startAngle = 180;
  const endAngle = 0;
  const angleRange = startAngle - endAngle;
  
  const segments = Array.from({ length: totalSegments }, (_, i) => {
    const angle = startAngle - (i / (totalSegments - 1)) * angleRange;
    const isFilled = i < filledSegments;
    return { angle, isFilled, index: i };
  });

  const radius = 90;
  const segmentWidth = 8;
  const segmentHeight = 20;
  const centerX = 120;
  const centerY = 110;

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <svg width="240" height="140" viewBox="0 0 240 140">
        {segments.map(({ angle, isFilled, index }) => {
          const radians = (angle * Math.PI) / 180;
          const x = centerX + radius * Math.cos(radians);
          const y = centerY - radius * Math.sin(radians);
          
          return (
            <motion.rect
              key={index}
              x={x - segmentWidth / 2}
              y={y - segmentHeight / 2}
              width={segmentWidth}
              height={segmentHeight}
              rx={segmentWidth / 2}
              ry={segmentWidth / 2}
              fill={isFilled ? "hsl(var(--primary))" : "hsl(var(--muted))"}
              transform={`rotate(${-angle + 90}, ${x}, ${y})`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.02,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            />
          );
        })}
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
        {/* Mascot */}
        <motion.div
          className="mb-1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <MiniMascot />
        </motion.div>

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
