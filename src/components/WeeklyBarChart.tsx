import { motion } from "framer-motion";

interface WeekData {
  label: string;
  minutes: number;
  isCurrent?: boolean;
}

interface WeeklyBarChartProps {
  data: WeekData[];
  goalLine?: number;
  maxMinutes?: number;
}

export const WeeklyBarChart = ({
  data,
  goalLine,
  maxMinutes = 360,
}: WeeklyBarChartProps) => {
  const chartHeight = 160;

  const getBarHeight = (minutes: number) => {
    return (minutes / maxMinutes) * chartHeight;
  };

  const getLinePosition = (minutes: number) => {
    return chartHeight - (minutes / maxMinutes) * chartHeight;
  };

  return (
    <div className="relative mt-8 px-2">
      {/* Goal line */}
      {goalLine && (
        <motion.div
          className="absolute left-0 right-12 border-t-2 border-dashed border-primary z-10"
          style={{ top: getLinePosition(goalLine) }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <span className="absolute -right-1 -top-3 text-xs text-primary font-medium bg-card px-1">
            目標
          </span>
        </motion.div>
      )}

      {/* Chart area */}
      <div className="flex items-end justify-between gap-2" style={{ height: chartHeight }}>
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 gap-2">
            <motion.div
              className="w-full rounded-t-lg relative overflow-hidden"
              style={{
                maxWidth: 32,
              }}
              initial={{ height: 0 }}
              animate={{ height: getBarHeight(item.minutes) }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
            >
              {/* Bar fill - solid purple for current, striped gray for past */}
              {item.isCurrent ? (
                <div className="absolute inset-0 bg-primary rounded-t-lg" />
              ) : (
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <pattern
                      id={`stripes-${index}`}
                      patternUnits="userSpaceOnUse"
                      width="6"
                      height="6"
                      patternTransform="rotate(45)"
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="6"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth="2"
                        strokeOpacity="0.3"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill={`url(#stripes-${index})`}
                    rx="8"
                  />
                  <rect
                    width="100%"
                    height="100%"
                    fill="none"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="1"
                    strokeOpacity="0.2"
                    rx="8"
                  />
                </svg>
              )}
            </motion.div>
            <motion.span
              className="text-[11px] font-medium text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.08 + 0.3 }}
            >
              {item.label}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Y-axis labels */}
      <div className="absolute right-0 top-0 bottom-6 w-10 flex flex-col justify-between text-xs text-muted-foreground font-medium">
        <span>6h</span>
        <span>0h</span>
      </div>
    </div>
  );
};
