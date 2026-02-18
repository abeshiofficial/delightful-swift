import { motion } from "framer-motion";

export type MascotMood = "neutral" | "happy" | "excited" | "sad" | "sleepy";

interface MascotProps {
  size?: "sm" | "md" | "lg";
  mood?: MascotMood;
  className?: string;
}

export const Mascot = ({ size = "md", mood = "neutral", className = "" }: MascotProps) => {
  const sizes = {
    sm: { body: 48, eyeSize: 5, eyeOffset: 10, mouthY: 30 },
    md: { body: 80, eyeSize: 7, eyeOffset: 16, mouthY: 50 },
    lg: { body: 120, eyeSize: 11, eyeOffset: 25, mouthY: 75 },
  };

  const { body, eyeSize, eyeOffset, mouthY } = sizes[size];

  // Eye shape per mood (scaleY for squint)
  const eyeConfig: Record<MascotMood, { scaleY: number; y: number }> = {
    neutral: { scaleY: 1,    y: 0   },
    happy:   { scaleY: 0.55, y: -1  },
    excited: { scaleY: 0.4,  y: -2  },
    sad:     { scaleY: 0.8,  y: 2   },
    sleepy:  { scaleY: 0.3,  y: 2   },
  };

  const eyeAnim = eyeConfig[mood];

  // Mouth SVG path per mood
  // Drawn in a local coordinate space centered at (0,0), width ~eyeOffset*1.6
  const mouthHalfW = eyeOffset * 0.8;
  const getMouthPath = (): string => {
    switch (mood) {
      case "excited":
        // Big smile
        return `M ${-mouthHalfW} 0 Q 0 ${mouthHalfW * 0.9} ${mouthHalfW} 0`;
      case "happy":
        // Normal smile
        return `M ${-mouthHalfW * 0.8} 0 Q 0 ${mouthHalfW * 0.6} ${mouthHalfW * 0.8} 0`;
      case "neutral":
        // Flat line
        return `M ${-mouthHalfW * 0.6} 0 L ${mouthHalfW * 0.6} 0`;
      case "sleepy":
        // Tiny flat line
        return `M ${-mouthHalfW * 0.4} 0 L ${mouthHalfW * 0.4} 0`;
      case "sad":
        // Frown
        return `M ${-mouthHalfW * 0.8} 0 Q 0 ${-mouthHalfW * 0.6} ${mouthHalfW * 0.8} 0`;
    }
  };

  // Body color accent per mood
  const bodyGlow: Record<MascotMood, string> = {
    neutral: "hsl(var(--primary))",
    happy:   "hsl(var(--primary))",
    excited: "hsl(var(--primary))",
    sad:     "hsl(220 40% 72%)",   // blueish when sad
    sleepy:  "hsl(var(--primary))",
  };

  // Bounce animation per mood
  const bodyAnimate = mood === "excited"
    ? { scale: [1, 1.06, 1], y: [0, -4, 0] }
    : mood === "sad"
    ? { scale: [1, 0.98, 1], y: [0, 2, 0] }
    : { scale: [1, 1.03, 1] };

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
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.2, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Body */}
      <motion.div
        className="relative rounded-full"
        style={{
          width: body,
          height: body,
          backgroundColor: bodyGlow[mood],
          borderRadius: "47% 53% 52% 48% / 48% 47% 53% 52%",
        }}
        animate={{
          ...bodyAnimate,
          borderRadius: [
            "47% 53% 52% 48% / 48% 47% 53% 52%",
            "50% 50% 48% 52% / 52% 50% 50% 48%",
            "47% 53% 52% 48% / 48% 47% 53% 52%",
          ],
        }}
        transition={{ duration: mood === "excited" ? 1.2 : 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Cheeks */}
        <motion.div
          className="absolute bg-accent/40 rounded-full"
          style={{ width: eyeSize * 2.5, height: eyeSize * 1.5, left: eyeOffset * 0.3, top: "55%" }}
          animate={{ opacity: mood === "sad" ? [0.15, 0.25, 0.15] : [0.4, 0.6, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bg-accent/40 rounded-full"
          style={{ width: eyeSize * 2.5, height: eyeSize * 1.5, right: eyeOffset * 0.3, top: "55%" }}
          animate={{ opacity: mood === "sad" ? [0.15, 0.25, 0.15] : [0.4, 0.6, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />

        {/* Tears when sad */}
        {mood === "sad" && (
          <>
            <motion.div
              className="absolute bg-blue-300/70 rounded-full"
              style={{ width: eyeSize * 0.5, height: eyeSize * 1.2, left: `calc(50% - ${eyeOffset}px - ${eyeSize * 0.25}px)`, top: "48%" }}
              animate={{ opacity: [0, 0.8, 0], y: [0, eyeSize * 0.8, eyeSize * 1.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn", delay: 0.4 }}
            />
            <motion.div
              className="absolute bg-blue-300/70 rounded-full"
              style={{ width: eyeSize * 0.5, height: eyeSize * 1.2, left: `calc(50% + ${eyeOffset}px - ${eyeSize * 0.25}px)`, top: "48%" }}
              animate={{ opacity: [0, 0.8, 0], y: [0, eyeSize * 0.8, eyeSize * 1.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn", delay: 1.0 }}
            />
          </>
        )}

        {/* Eyes */}
        <motion.div
          className="absolute bg-foreground rounded-full"
          style={{
            width: eyeSize,
            height: eyeSize,
            left: `calc(50% - ${eyeOffset}px - ${eyeSize / 2}px)`,
            top: "35%",
          }}
          animate={{ scaleY: eyeAnim.scaleY, y: eyeAnim.y }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        />
        <motion.div
          className="absolute bg-foreground rounded-full"
          style={{
            width: eyeSize,
            height: eyeSize,
            left: `calc(50% + ${eyeOffset}px - ${eyeSize / 2}px)`,
            top: "35%",
          }}
          animate={{ scaleY: eyeAnim.scaleY, y: eyeAnim.y }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        />

        {/* Mouth - SVG overlay */}
        <svg
          className="absolute"
          style={{
            width: body,
            height: body * 0.5,
            left: 0,
            top: `${mouthY}%`,
            overflow: "visible",
          }}
          viewBox={`${-body / 2} 0 ${body} ${body * 0.5}`}
        >
          <motion.path
            d={getMouthPath()}
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth={eyeSize * 0.55}
            strokeLinecap="round"
            initial={false}
            animate={{ d: getMouthPath() }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </svg>

        {/* Sparkle/highlight */}
        <motion.div
          className="absolute bg-white/60 rounded-full"
          style={{ width: eyeSize * 1.5, height: eyeSize * 1.5, right: "15%", top: "12%" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Stars when excited */}
        {mood === "excited" && (
          <>
            <motion.div
              className="absolute text-yellow-300"
              style={{ fontSize: eyeSize * 1.2, right: "-20%", top: "5%" }}
              animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ✦
            </motion.div>
            <motion.div
              className="absolute text-yellow-200"
              style={{ fontSize: eyeSize * 0.9, left: "-18%", top: "15%" }}
              animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
            >
              ✦
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};
