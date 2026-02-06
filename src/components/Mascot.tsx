import { motion } from "framer-motion";

interface MascotProps {
  size?: "sm" | "md" | "lg";
  mood?: "neutral" | "happy" | "sleepy";
  className?: string;
}

export const Mascot = ({ size = "md", mood = "neutral", className = "" }: MascotProps) => {
  const sizes = {
    sm: { body: 48, eyeSize: 6, eyeOffset: 12 },
    md: { body: 80, eyeSize: 8, eyeOffset: 20 },
    lg: { body: 120, eyeSize: 12, eyeOffset: 30 },
  };

  const { body, eyeSize, eyeOffset } = sizes[size];

  // Eye positions based on mood
  const eyeVariants = {
    neutral: { y: 0, scaleY: 1 },
    happy: { y: -2, scaleY: 0.6 },
    sleepy: { y: 2, scaleY: 0.4 },
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Shadow */}
      <motion.div
        className="absolute bg-foreground/10 rounded-full blur-sm"
        style={{
          width: body * 0.7,
          height: body * 0.15,
          bottom: -body * 0.05,
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Body - breathing animation */}
      <motion.div
        className="relative bg-primary rounded-full"
        style={{
          width: body,
          height: body,
          borderRadius: "47% 53% 52% 48% / 48% 47% 53% 52%",
        }}
        animate={{
          scale: [1, 1.03, 1],
          borderRadius: [
            "47% 53% 52% 48% / 48% 47% 53% 52%",
            "50% 50% 48% 52% / 52% 50% 50% 48%",
            "47% 53% 52% 48% / 48% 47% 53% 52%",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Cheeks (blush) */}
        <motion.div
          className="absolute bg-accent/40 rounded-full"
          style={{
            width: eyeSize * 2.5,
            height: eyeSize * 1.5,
            left: eyeOffset * 0.3,
            top: "55%",
          }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bg-accent/40 rounded-full"
          style={{
            width: eyeSize * 2.5,
            height: eyeSize * 1.5,
            right: eyeOffset * 0.3,
            top: "55%",
          }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />

        {/* Eyes */}
        <motion.div
          className="absolute bg-foreground rounded-full"
          style={{
            width: eyeSize,
            height: eyeSize,
            left: `calc(50% - ${eyeOffset}px - ${eyeSize / 2}px)`,
            top: "38%",
          }}
          variants={eyeVariants}
          animate={mood}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bg-foreground rounded-full"
          style={{
            width: eyeSize,
            height: eyeSize,
            left: `calc(50% + ${eyeOffset}px - ${eyeSize / 2}px)`,
            top: "38%",
          }}
          variants={eyeVariants}
          animate={mood}
          transition={{ duration: 0.3 }}
        />

        {/* Sparkle/highlight */}
        <motion.div
          className="absolute bg-white/60 rounded-full"
          style={{
            width: eyeSize * 1.5,
            height: eyeSize * 1.5,
            right: "15%",
            top: "15%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};
