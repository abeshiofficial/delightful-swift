import { motion } from "framer-motion";

interface MiniMascotProps {
  className?: string;
}

export const MiniMascot = ({ className = "" }: MiniMascotProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        y: [0, -2, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Simple blob mascot */}
      <svg width="48" height="36" viewBox="0 0 48 36" fill="none">
        {/* Body - soft blob shape */}
        <motion.ellipse
          cx="24"
          cy="20"
          rx="20"
          ry="14"
          fill="hsl(var(--primary))"
          animate={{
            rx: [20, 21, 20],
            ry: [14, 13.5, 14],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Left eye */}
        <motion.ellipse
          cx="17"
          cy="18"
          rx="2"
          ry="2.5"
          fill="hsl(var(--foreground))"
          animate={{
            scaleY: [1, 0.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
        
        {/* Right eye */}
        <motion.ellipse
          cx="31"
          cy="18"
          rx="2"
          ry="2.5"
          fill="hsl(var(--foreground))"
          animate={{
            scaleY: [1, 0.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
        
        {/* Smile */}
        <path
          d="M20 24 Q24 27 28 24"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cheeks */}
        <circle cx="12" cy="22" r="3" fill="hsl(var(--accent))" opacity="0.5" />
        <circle cx="36" cy="22" r="3" fill="hsl(var(--accent))" opacity="0.5" />
      </svg>
    </motion.div>
  );
};
