import { motion } from "framer-motion";

interface MiniMascotProps {
  className?: string;
}

export const MiniMascot = ({ className = "" }: MiniMascotProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        y: [0, -1.5, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
        {/* Body - soft blob shape */}
        <motion.ellipse
          cx="20"
          cy="15"
          rx="16"
          ry="11"
          fill="hsl(var(--primary))"
          animate={{
            rx: [16, 16.5, 16],
            ry: [11, 10.5, 11],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Left eye */}
        <motion.circle
          cx="14"
          cy="13"
          r="1.5"
          fill="hsl(var(--foreground))"
          animate={{
            scaleY: [1, 0.15, 1],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
        
        {/* Right eye */}
        <motion.circle
          cx="26"
          cy="13"
          r="1.5"
          fill="hsl(var(--foreground))"
          animate={{
            scaleY: [1, 0.15, 1],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
        
        {/* Smile */}
        <path
          d="M16 18 Q20 21 24 18"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
};
