import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface HourlyData {
  hour: number;
  minutes: number;
}

interface HourlyAreaChartProps {
  data: HourlyData[];
  currentHour: number;
}

export const HourlyAreaChart = ({ data, currentHour }: HourlyAreaChartProps) => {
  // Filter data up to current hour
  const filteredData = data.filter((d) => d.hour <= currentHour);

  // Format hour for display
  const formatHour = (hour: number) => {
    if (hour === 0) return "0";
    if (hour === 12) return "12";
    if (hour === currentHour) return `${hour}`;
    return "";
  };

  return (
    <motion.div
      className="w-full h-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={filteredData}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(160 40% 55%)" stopOpacity={0.6} />
              <stop offset="100%" stopColor="hsl(160 45% 65%)" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="hour"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={formatHour}
            interval={0}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={(value) => `${value}m`}
            width={35}
          />
          <Area
            type="monotone"
            dataKey="minutes"
            stroke="hsl(160 40% 55%)"
            strokeWidth={2}
            fill="url(#areaGradient)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
