import { motion } from "framer-motion";

interface StatBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay?: number;
}

export const StatBadge = ({
  icon,
  label,
  value,
  delay = 0,
}: StatBadgeProps) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl bg-card border border-border"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <span className="text-lg font-bold text-foreground">{value}</span>
      <span className="text-[10px] text-muted-foreground text-center font-medium leading-tight">
        {label}
      </span>
    </motion.div>
  );
};
