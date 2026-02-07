import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlayfulCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const PlayfulCard = ({
  children,
  className = "",
  hoverable = false,
}: PlayfulCardProps) => {
  return (
    <motion.div
      className={cn(
        "rounded-2xl p-5 bg-card border border-border shadow-card",
        hoverable && "cursor-pointer",
        className
      )}
      whileHover={hoverable ? { y: -2, boxShadow: "0 4px 12px -4px hsl(0 0% 0% / 0.1)" } : undefined}
      whileTap={hoverable ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  );
};
