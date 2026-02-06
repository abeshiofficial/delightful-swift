import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlayfulCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "accent";
  hoverable?: boolean;
}

const variants = {
  default: "bg-card shadow-playful",
  primary: "bg-primary shadow-primary",
  secondary: "bg-secondary shadow-secondary text-secondary-foreground",
  accent: "bg-accent shadow-accent",
};

export const PlayfulCard = ({
  children,
  className = "",
  variant = "default",
  hoverable = false,
}: PlayfulCardProps) => {
  return (
    <motion.div
      className={cn(
        "rounded-2xl p-5",
        variants[variant],
        hoverable && "cursor-pointer bounce-tap",
        className
      )}
      whileHover={hoverable ? { y: -4, scale: 1.02 } : undefined}
      whileTap={hoverable ? { y: 0, scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  );
};
