import { motion } from "framer-motion";
import mascotImage from "@/assets/mascot.png";

export type MascotMood = "neutral" | "happy" | "excited" | "sad" | "sleepy";

interface MascotProps {
  size?: "sm" | "md" | "lg";
  mood?: MascotMood;
  className?: string;
}

export const Mascot = ({ size = "md", mood = "neutral", className = "" }: MascotProps) => {
  const sizes = {
    sm: 64,
    md: 96,
    lg: 140,
  };

  const bodySize = sizes[size];

  // Animate per mood
  const getBodyAnimate = () => {
    switch (mood) {
      case "excited":
        return {
          y: [0, -10, 0],
          rotate: [0, -5, 5, -5, 0],
          scale: [1, 1.08, 1],
        };
      case "happy":
        return {
          y: [0, -5, 0],
          rotate: [0, -2, 2, 0],
          scale: [1, 1.04, 1],
        };
      case "neutral":
        return {
          y: [0, -3, 0],
          rotate: [0, 0, 0],
          scale: [1, 1.02, 1],
        };
      case "sad":
        return {
          y: [0, 3, 0],
          rotate: [0, -3, 3, -3, 0],
          scale: [1, 0.96, 1],
        };
      case "sleepy":
        return {
          y: [0, 2, 0],
          rotate: [0, 5, 0],
          scale: [1, 0.98, 1],
        };
    }
  };

  type EasingType = "easeIn" | "easeOut" | "easeInOut" | "linear";
  const getTransition = (): { duration: number; repeat: number; ease: EasingType } => {
    switch (mood) {
      case "excited":
        return { duration: 0.8, repeat: Infinity, ease: "easeInOut" };
      case "happy":
        return { duration: 2, repeat: Infinity, ease: "easeInOut" };
      case "sad":
        return { duration: 2.5, repeat: Infinity, ease: "easeInOut" };
      case "sleepy":
        return { duration: 3.5, repeat: Infinity, ease: "easeInOut" };
      default:
        return { duration: 3, repeat: Infinity, ease: "easeInOut" };
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Shadow */}
      <motion.div
        className="absolute bg-foreground/10 rounded-full blur-sm"
        style={{
          width: bodySize * 0.7,
          height: bodySize * 0.12,
          bottom: -4,
        }}
        animate={{
          scale: mood === "excited" ? [1, 1.15, 1] : [1, 1.05, 1],
          opacity: mood === "sad" ? [0.15, 0.25, 0.15] : [0.25, 0.15, 0.25],
        }}
        transition={getTransition()}
      />

      {/* Stars when excited */}
      {mood === "excited" && (
        <>
          <motion.div
            className="absolute text-yellow-300 pointer-events-none"
            style={{ fontSize: bodySize * 0.22, right: "-10%", top: "0%" }}
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          >
            ✦
          </motion.div>
          <motion.div
            className="absolute text-yellow-200 pointer-events-none"
            style={{ fontSize: bodySize * 0.16, left: "-8%", top: "10%" }}
            animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: 0.3 }}
          >
            ✦
          </motion.div>
        </>
      )}

      {/* Sad tears */}
      {mood === "sad" && (
        <>
          <motion.div
            className="absolute bg-blue-300/70 rounded-full pointer-events-none"
            style={{ width: 4, height: 8, left: "32%", top: "55%" }}
            animate={{ opacity: [0, 0.9, 0], y: [0, 12, 20] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeIn", delay: 0.3 }}
          />
          <motion.div
            className="absolute bg-blue-300/70 rounded-full pointer-events-none"
            style={{ width: 4, height: 8, right: "32%", top: "55%" }}
            animate={{ opacity: [0, 0.9, 0], y: [0, 12, 20] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeIn", delay: 1.0 }}
          />
        </>
      )}

      {/* Mascot Image */}
      <motion.img
        src={mascotImage}
        alt="mascot"
        style={{ width: bodySize, height: bodySize, objectFit: "contain" }}
        animate={getBodyAnimate()}
        transition={getTransition()}
        draggable={false}
      />

      {/* Sleepy ZZZ */}
      {mood === "sleepy" && (
        <motion.div
          className="absolute font-bold text-muted-foreground pointer-events-none"
          style={{ fontSize: bodySize * 0.18, right: "-5%", top: "0%" }}
          animate={{ opacity: [0, 1, 0], y: [0, -8, -16], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        >
          z
        </motion.div>
      )}
    </div>
  );
};
