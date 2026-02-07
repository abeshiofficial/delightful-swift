import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface AppUsageCardAltProps {
  name: string;
  minutes: number;
  icon?: string;
  index?: number;
  trend?: "up" | "down";
}

export const AppUsageCardAlt = ({
  name,
  minutes,
  icon = "📱",
  index = 0,
  trend = "up",
}: AppUsageCardAltProps) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const timeText = hours > 0 ? `${hours}時間${mins}分` : `${mins}分`;

  return (
    <motion.div
      className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 + 0.2 }}
    >
      {/* App icon */}
      <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center text-base flex-shrink-0">
        <span className="text-background">{icon}</span>
      </div>

      {/* App info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground text-sm truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{timeText}</p>
      </div>

      {/* Trend arrow */}
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        {trend === "up" ? (
          <ArrowUpRight className="w-4 h-4 text-foreground" strokeWidth={2.5} />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-foreground" strokeWidth={2.5} />
        )}
      </div>
    </motion.div>
  );
};
