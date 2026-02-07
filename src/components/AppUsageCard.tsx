import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface AppUsageCardProps {
  name: string;
  minutes: number;
  icon?: string;
  index?: number;
  onClick?: () => void;
}

export const AppUsageCard = ({
  name,
  minutes,
  icon = "📱",
  index = 0,
  onClick,
}: AppUsageCardProps) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const timeText = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  return (
    <motion.button
      className="flex items-center gap-3 w-full text-left py-1.5 -mx-1 px-1 rounded-xl active:bg-muted/50 transition-colors"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 + 0.2 }}
      onClick={onClick}
    >
      {/* App icon */}
      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-base flex-shrink-0">
        {icon}
      </div>

      {/* App info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-sm truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{timeText}</p>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
    </motion.button>
  );
};
