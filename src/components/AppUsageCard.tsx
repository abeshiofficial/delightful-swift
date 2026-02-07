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
  const timeText = hours > 0 ? `${hours}時間${mins}分` : `${mins}分`;

  return (
    <motion.button
      className="flex items-center gap-3 w-full text-left py-3 active:bg-muted/50 transition-colors"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 + 0.1 }}
      onClick={onClick}
    >
      {/* App icon */}
      <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-lg flex-shrink-0">
        {icon}
      </div>

      {/* App name */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-sm truncate">{name}</p>
      </div>

      {/* Time */}
      <span className="text-sm text-muted-foreground font-medium">{timeText}</span>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-muted-foreground/60 flex-shrink-0" />
    </motion.button>
  );
};
