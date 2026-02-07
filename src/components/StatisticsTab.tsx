import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { PlayfulCard } from "@/components/PlayfulCard";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { WeeklyBarChart } from "@/components/WeeklyBarChart";
import { AppUsageCard } from "@/components/AppUsageCard";

// Mock data
const mockWeeklyData = {
  averageMinutes: 270,
  trend: "up" as const,
  trendPercent: 15,
  dailyData: [
    { day: "月", minutes: 180 },
    { day: "火", minutes: 240 },
    { day: "水", minutes: 300 },
    { day: "木", minutes: 280 },
    { day: "金", minutes: 320 },
    { day: "土", minutes: 260 },
    { day: "日", minutes: 310 },
  ],
  averageLine: 270,
  goalLine: 180,
  increasedApps: [
    { name: "TikTok", minutes: 65, icon: "🎵", color: "hsl(var(--chart-3))" },
    { name: "Twitter", minutes: 48, icon: "🐦", color: "hsl(var(--chart-5))" },
  ],
  decreasedApps: [
    { name: "Instagram", minutes: 32, icon: "📸", color: "hsl(var(--chart-2))" },
    { name: "YouTube", minutes: 28, icon: "▶️", color: "hsl(var(--chart-4))" },
  ],
};

function formatTime(minutes: number): { hours: number; mins: number } {
  return {
    hours: Math.floor(minutes / 60),
    mins: minutes % 60,
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const StatisticsTab = () => {
  const { hours, mins } = formatTime(mockWeeklyData.averageMinutes);
  const isUp = mockWeeklyData.trend === "up";

  return (
    <motion.div
      className="flex flex-col gap-6 p-5 pb-28"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center pt-2">
        <h1 className="text-2xl font-extrabold text-foreground">統計</h1>
        <p className="text-sm font-semibold text-muted-foreground mt-1">今週</p>
      </motion.div>

      {/* Summary Card */}
      <PlayfulCard className="text-center py-6">
        {/* Trend Badge */}
        <motion.div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
            isUp ? "bg-accent/20" : "bg-secondary/20"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        >
          {isUp ? (
            <TrendingUp className="w-5 h-5 text-accent" />
          ) : (
            <TrendingDown className="w-5 h-5 text-secondary" />
          )}
          <span className={`font-bold ${isUp ? "text-accent" : "text-secondary"}`}>
            {mockWeeklyData.trendPercent}% {isUp ? "増加" : "減少"}
          </span>
        </motion.div>

        {/* Average Time */}
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <AnimatedNumber value={hours} className="text-5xl font-black text-foreground" />
          <span className="text-xl font-bold text-muted-foreground">時間</span>
          <AnimatedNumber value={mins} className="text-5xl font-black text-foreground" />
          <span className="text-xl font-bold text-muted-foreground">分</span>
        </div>

        <motion.p
          className="text-sm font-semibold text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          1日あたりの平均スクリーンタイム
        </motion.p>

        {/* Bar Chart */}
        <WeeklyBarChart
          data={mockWeeklyData.dailyData}
          averageLine={mockWeeklyData.averageLine}
          goalLine={mockWeeklyData.goalLine}
        />
      </PlayfulCard>

      {/* App Comparison */}
      <div className="grid grid-cols-2 gap-4">
        {/* Increased Apps */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-bold text-foreground">利用が増えた</h2>
          </div>
          <PlayfulCard className="space-y-2 p-3">
            {mockWeeklyData.increasedApps.map((app, index) => (
              <AppUsageCard
                key={app.name}
                name={app.name}
                minutes={app.minutes}
                icon={app.icon}
                index={index}
              />
            ))}
          </PlayfulCard>
        </motion.div>

        {/* Decreased Apps */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-secondary" />
            <h2 className="text-sm font-bold text-foreground">利用が減った</h2>
          </div>
          <PlayfulCard className="space-y-2 p-3">
            {mockWeeklyData.decreasedApps.map((app, index) => (
              <AppUsageCard
                key={app.name}
                name={app.name}
                minutes={app.minutes}
                icon={app.icon}
                index={index}
              />
            ))}
          </PlayfulCard>
        </motion.div>
      </div>
    </motion.div>
  );
};
