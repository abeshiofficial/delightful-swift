import { motion } from "framer-motion";

interface AppUsageCardProps {
  name: string;
  minutes: number;
  icon?: string;
  color?: string;
  index?: number;
}

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}分`;
  if (mins === 0) return `${hours}時間`;
  return `${hours}時間${mins}分`;
}

export const AppUsageCard = ({
  name,
  minutes,
  icon = "📱",
  color = "hsl(var(--chart-1))",
  index = 0,
}: AppUsageCardProps) => {
  return (
    <motion.div
      className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{ x: 4 }}
    >
      <motion.div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
        style={{ backgroundColor: color }}
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <div className="flex flex-col flex-1">
        <span className="font-bold text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">{formatTime(minutes)}</span>
      </div>
      <motion.div
        className="w-2 h-8 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
      />
    </motion.div>
  );
};
