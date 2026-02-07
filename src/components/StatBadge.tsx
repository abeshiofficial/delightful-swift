import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: "primary" | "secondary" | "accent" | "tertiary";
  delay?: number;
}

const colorClasses = {
  primary: "bg-primary/15",
  secondary: "bg-secondary/15",
  accent: "bg-accent/15",
  tertiary: "bg-tertiary/15",
};

const iconColorClasses = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  tertiary: "text-tertiary",
};

export const StatBadge = ({
  icon,
  label,
  value,
  color = "primary",
  delay = 0,
}: StatBadgeProps) => {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-2xl",
        colorClasses[color]
      )}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <div className={cn("w-10 h-10 rounded-full bg-card flex items-center justify-center", iconColorClasses[color])}>
        {icon}
      </div>
      <span className="text-xs text-muted-foreground text-center font-medium leading-tight">
        {label}
      </span>
      <span className="text-lg font-bold text-foreground">{value}</span>
    </motion.div>
  );
};
