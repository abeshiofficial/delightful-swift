import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PlayfulCard } from "@/components/PlayfulCard";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { WeeklyBarChart } from "@/components/WeeklyBarChart";
import { AppUsageCardAlt } from "@/components/AppUsageCardAlt";
import { DailyStackedChart } from "@/components/DailyStackedChart";

// Mock data
const mockWeeklyData = {
  averageMinutes: 270,
  trend: "up" as const,
  trendPercent: 15,
  weeklyData: [
    { label: "12/23", minutes: 180, isCurrent: false },
    { label: "12/30", minutes: 240, isCurrent: false },
    { label: "1/6", minutes: 280, isCurrent: false },
    { label: "1/13", minutes: 300, isCurrent: false },
    { label: "1/20", minutes: 260, isCurrent: false },
    { label: "1/27", minutes: 220, isCurrent: false },
    { label: "2/3", minutes: 360, isCurrent: true },
  ],
  goalLine: 180,
  increasedApps: [
    { name: "TikTok", minutes: 65, icon: "🎵" },
    { name: "Twitter", minutes: 48, icon: "𝕏" },
  ],
  decreasedApps: [
    { name: "Instagram", minutes: 32, icon: "📷" },
    { name: "YouTube", minutes: 28, icon: "▶️" },
  ],
  // Daily data for the current week
  topAppsForWeek: ["Instagram", "YouTube", "TikTok"],
  dailyData: [
    { day: "日", apps: [{ name: "Instagram", minutes: 45 }, { name: "YouTube", minutes: 30 }, { name: "TikTok", minutes: 25 }, { name: "Twitter", minutes: 15 }, { name: "LINE", minutes: 10 }] },
    { day: "月", apps: [{ name: "Instagram", minutes: 50 }, { name: "YouTube", minutes: 40 }, { name: "TikTok", minutes: 20 }, { name: "Twitter", minutes: 10 }, { name: "LINE", minutes: 15 }] },
    { day: "火", apps: [{ name: "Instagram", minutes: 35 }, { name: "YouTube", minutes: 55 }, { name: "TikTok", minutes: 30 }, { name: "Twitter", minutes: 20 }, { name: "LINE", minutes: 5 }] },
    { day: "水", apps: [{ name: "Instagram", minutes: 60 }, { name: "YouTube", minutes: 25 }, { name: "TikTok", minutes: 35 }, { name: "Twitter", minutes: 25 }, { name: "LINE", minutes: 10 }] },
    { day: "木", apps: [{ name: "Instagram", minutes: 40 }, { name: "YouTube", minutes: 45 }, { name: "TikTok", minutes: 40 }, { name: "Twitter", minutes: 15 }, { name: "LINE", minutes: 20 }] },
    { day: "金", apps: [{ name: "Instagram", minutes: 55 }, { name: "YouTube", minutes: 35 }, { name: "TikTok", minutes: 45 }, { name: "Twitter", minutes: 30 }, { name: "LINE", minutes: 10 }] },
    { day: "土", apps: [{ name: "Instagram", minutes: 70 }, { name: "YouTube", minutes: 50 }, { name: "TikTok", minutes: 55 }, { name: "Twitter", minutes: 20 }, { name: "LINE", minutes: 25 }] },
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
      {/* Week label */}
      <motion.div variants={itemVariants} className="text-center pt-2">
        <p className="text-sm font-semibold text-muted-foreground">今週</p>
      </motion.div>

      {/* Summary Card */}
      <PlayfulCard className="text-center py-6">
        {/* Trend Badge - Black background */}
        <motion.div
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full mb-4 bg-foreground"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        >
          {isUp ? (
            <ArrowUpRight className="w-4 h-4 text-background" strokeWidth={2.5} />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-background" strokeWidth={2.5} />
          )}
          <span className="font-bold text-background text-sm">
            {mockWeeklyData.trendPercent}% {isUp ? "増加" : "減少"}
          </span>
        </motion.div>

        {/* Average Time */}
        <div className="flex items-baseline justify-center gap-0.5 mb-1">
          <AnimatedNumber value={hours} className="text-5xl font-black text-foreground" />
          <span className="text-base font-medium text-muted-foreground">時間</span>
          <AnimatedNumber value={mins} className="text-5xl font-black text-foreground" />
          <span className="text-base font-medium text-muted-foreground">分</span>
        </div>

        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          毎週の1日あたり平均利用時間
        </motion.p>

        {/* Weekly Bar Chart */}
        <WeeklyBarChart
          data={mockWeeklyData.weeklyData}
          goalLine={mockWeeklyData.goalLine}
        />

        {/* Daily Stacked Chart */}
        <DailyStackedChart
          data={mockWeeklyData.dailyData}
          topApps={mockWeeklyData.topAppsForWeek}
        />
      </PlayfulCard>

      {/* App Comparison */}
      <div className="grid grid-cols-2 gap-4">
        {/* Increased Apps */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-foreground" strokeWidth={2.5} />
            <h2 className="text-sm font-bold text-foreground">利用が増えた</h2>
          </div>
          <div className="space-y-2">
            {mockWeeklyData.increasedApps.map((app, index) => (
              <AppUsageCardAlt
                key={app.name}
                name={app.name}
                minutes={app.minutes}
                icon={app.icon}
                index={index}
                trend="up"
              />
            ))}
          </div>
        </motion.div>

        {/* Decreased Apps */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2">
            <ArrowDownRight className="w-4 h-4 text-foreground" strokeWidth={2.5} />
            <h2 className="text-sm font-bold text-foreground">利用が減った</h2>
          </div>
          <div className="space-y-2">
            {mockWeeklyData.decreasedApps.map((app, index) => (
              <AppUsageCardAlt
                key={app.name}
                name={app.name}
                minutes={app.minutes}
                icon={app.icon}
                index={index}
                trend="down"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
