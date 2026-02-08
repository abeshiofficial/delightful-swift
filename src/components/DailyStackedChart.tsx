import { motion } from "framer-motion";

interface DailyData {
  day: string;
  apps: { name: string; minutes: number }[];
}

interface DailyStackedChartProps {
  data: DailyData[];
  topApps: string[];
}

// Fixed colors for apps - using semantic design tokens
const APP_COLORS = [
  "hsl(var(--primary))",           // Purple - 1st app
  "hsl(var(--chart-2))",           // Coral/Pink - 2nd app
  "hsl(var(--chart-3))",           // Teal - 3rd app
  "hsl(var(--muted-foreground))",  // Gray - Other
];

export const DailyStackedChart = ({
  data,
  topApps,
}: DailyStackedChartProps) => {
  const chartHeight = 80; // Half the size of weekly chart

  // Process data to get stacked segments for each day (100% stacked)
  const processedData = data.map((day) => {
    const segments: { name: string; minutes: number; color: string }[] = [];
    let otherMinutes = 0;

    // Add top 3 apps
    topApps.forEach((appName, index) => {
      const appData = day.apps.find((a) => a.name === appName);
      segments.push({
        name: appName,
        minutes: appData?.minutes || 0,
        color: APP_COLORS[index],
      });
    });

    // Calculate "Other" total
    day.apps.forEach((app) => {
      if (!topApps.includes(app.name)) {
        otherMinutes += app.minutes;
      }
    });

    segments.push({
      name: "その他",
      minutes: otherMinutes,
      color: APP_COLORS[3],
    });

    // Calculate total for percentage
    const total = segments.reduce((sum, seg) => sum + seg.minutes, 0);

    return {
      day: day.day,
      segments: segments.map((seg) => ({
        ...seg,
        percentage: total > 0 ? (seg.minutes / total) * 100 : 0,
      })),
    };
  });

  return (
    <div>
      {/* Chart area */}
      <div className="flex items-end justify-between gap-2" style={{ height: chartHeight }}>
        {processedData.map((day, dayIndex) => (
          <div key={day.day} className="flex flex-col items-center flex-1 gap-1.5">
            <motion.div
              className="w-full flex flex-col-reverse overflow-hidden rounded-md"
              style={{ maxWidth: 28, height: chartHeight }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                delay: dayIndex * 0.05,
                duration: 0.4,
                type: "spring",
                stiffness: 120,
              }}
            >
              {day.segments.map((segment, segIndex) => (
                <motion.div
                  key={segment.name}
                  className="w-full"
                  style={{
                    height: `${segment.percentage}%`,
                    backgroundColor: segment.color,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: dayIndex * 0.05 + segIndex * 0.05 + 0.2 }}
                />
              ))}
            </motion.div>
            <motion.span
              className="text-[10px] font-medium text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: dayIndex * 0.05 + 0.3 }}
            >
              {day.day}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {topApps.map((appName, index) => (
          <div key={appName} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: APP_COLORS[index] }}
            />
            <span className="text-[10px] font-medium text-muted-foreground">
              {appName}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: APP_COLORS[3] }}
          />
          <span className="text-[10px] font-medium text-muted-foreground">
            その他
          </span>
        </div>
      </motion.div>
    </div>
  );
};
