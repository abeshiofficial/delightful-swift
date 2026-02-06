import { motion } from "framer-motion";

interface DayData {
  day: string;
  minutes: number;
}

interface WeeklyBarChartProps {
  data: DayData[];
  averageLine?: number;
  goalLine?: number;
  maxMinutes?: number;
}

export const WeeklyBarChart = ({
  data,
  averageLine,
  goalLine,
  maxMinutes = 720,
}: WeeklyBarChartProps) => {
  const chartHeight = 140;

  const getBarHeight = (minutes: number) => {
    return (minutes / maxMinutes) * chartHeight;
  };

  const getLinePosition = (minutes: number) => {
    return chartHeight - (minutes / maxMinutes) * chartHeight;
  };

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
  ];

  return (
    <div className="relative mt-6 px-2">
      {/* Reference lines */}
      {averageLine && (
        <motion.div
          className="absolute left-0 right-16 border-t-2 border-dashed border-muted-foreground/40 z-10"
          style={{ top: getLinePosition(averageLine) }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <span className="absolute -right-2 -top-3 text-xs text-muted-foreground bg-background px-1">
            平均
          </span>
        </motion.div>
      )}
      {goalLine && (
        <motion.div
          className="absolute left-0 right-16 border-t-2 border-secondary z-10"
          style={{ top: getLinePosition(goalLine) }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="absolute -right-2 -top-3 text-xs text-secondary font-semibold bg-background px-1">
            目標
          </span>
        </motion.div>
      )}

      {/* Chart area */}
      <div className="flex items-end justify-between gap-2" style={{ height: chartHeight }}>
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 gap-2">
            <motion.div
              className="w-full rounded-t-xl relative overflow-hidden"
              style={{
                backgroundColor: colors[index],
                maxWidth: 36,
              }}
              initial={{ height: 0 }}
              animate={{ height: getBarHeight(item.minutes) }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  delay: index * 0.1 + 0.5,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <motion.span
              className="text-xs font-semibold text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {item.day}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Y-axis labels */}
      <div className="absolute right-0 top-0 bottom-6 w-14 flex flex-col justify-between text-xs text-muted-foreground font-medium">
        <span>12h</span>
        <span>6h</span>
        <span>0</span>
      </div>
    </div>
  );
};
