import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatBadgeProps {
  emoji: string;
  label: string;
  value: string;
  color?: "primary" | "secondary" | "accent" | "tertiary";
  delay?: number;
}

const colorClasses = {
  primary: "bg-primary/20 border-primary/30",
  secondary: "bg-secondary/20 border-secondary/30",
  accent: "bg-accent/20 border-accent/30",
  tertiary: "bg-tertiary/20 border-tertiary/30",
};

export const StatBadge = ({
  emoji,
  label,
  value,
  color = "primary",
  delay = 0,
}: StatBadgeProps) => {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-2xl border-2",
        colorClasses[color]
      )}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
    >
      <motion.span
        className="text-3xl"
        animate={{
          rotate: [0, -10, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          delay: delay + 0.5,
          duration: 0.5,
        }}
      >
        {emoji}
      </motion.span>
      <span className="text-xs text-muted-foreground text-center font-semibold leading-tight whitespace-pre-line">
        {label}
      </span>
      <span className="text-xl font-bold text-foreground">{value}</span>
    </motion.div>
  );
};
