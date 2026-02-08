import { useState } from "react";
import { motion } from "framer-motion";
import { Hand, Flame, Clock } from "lucide-react";
import { PlayfulCard } from "@/components/PlayfulCard";
import { CircularProgress } from "@/components/CircularProgress";
import { StatBadge } from "@/components/StatBadge";
import { AppUsageCard } from "@/components/AppUsageCard";
import { DaySelector } from "@/components/DaySelector";
import { HourlyAreaChart } from "@/components/HourlyAreaChart";

// Current hour (simulating 15:00)
const CURRENT_HOUR = 15;

// Mock hourly data (0:00 - 23:59)
const mockHourlyData = [
  { hour: 0, minutes: 2 },
  { hour: 1, minutes: 0 },
  { hour: 2, minutes: 0 },
  { hour: 3, minutes: 0 },
  { hour: 4, minutes: 0 },
  { hour: 5, minutes: 0 },
  { hour: 6, minutes: 5 },
  { hour: 7, minutes: 15 },
  { hour: 8, minutes: 25 },
  { hour: 9, minutes: 18 },
  { hour: 10, minutes: 12 },
  { hour: 11, minutes: 20 },
  { hour: 12, minutes: 35 },
  { hour: 13, minutes: 28 },
  { hour: 14, minutes: 22 },
  { hour: 15, minutes: 18 },
  { hour: 16, minutes: 0 },
  { hour: 17, minutes: 0 },
  { hour: 18, minutes: 0 },
  { hour: 19, minutes: 0 },
  { hour: 20, minutes: 0 },
  { hour: 21, minutes: 0 },
  { hour: 22, minutes: 0 },
  { hour: 23, minutes: 0 },
];

// Mock data
const mockData = {
  usageTimeMinutes: 230,
  goalMinutes: 290,
  cancelCount: 10,
  streakDays: 9,
  savedMinutes: 60,
  topApps: [
    { name: "Instagram", minutes: 45, icon: "📸" },
    { name: "YouTube", minutes: 38, icon: "▶️" },
    { name: "X (Twitter)", minutes: 25, icon: "𝕏" },
    { name: "TikTok", minutes: 20, icon: "🎵" },
    { name: "LINE", minutes: 15, icon: "💬" },
  ],
};

function formatTimeDisplay(minutes: number): { hours: number; mins: number } {
  return {
    hours: Math.floor(minutes / 60),
    mins: minutes % 60,
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export const TodayTab = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const progress = (mockData.usageTimeMinutes / mockData.goalMinutes) * 100;
  const remainingMinutes = mockData.goalMinutes - mockData.usageTimeMinutes;
  const { hours, mins } = formatTimeDisplay(mockData.usageTimeMinutes);
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingMins = remainingMinutes % 60;
  const remainingText = `目標まで残り${remainingHours}時間${remainingMins}分`;

  const handleAppClick = (appName: string) => {
    // TODO: Navigate to app detail page
    console.log(`Navigate to ${appName} detail`);
  };

  return (
    <motion.div
      className="relative flex flex-col gap-6 px-5 pt-4 pb-28 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Gradient background overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `linear-gradient(180deg, 
            rgba(162, 143, 249, 0.5) 0%, 
            rgba(200, 150, 200, 0.4) 20%, 
            rgba(255, 180, 150, 0.3) 45%, 
            rgba(255, 220, 150, 0.15) 65%, 
            hsl(var(--background)) 100%
          )`,
        }}
      />
      {/* Day Selector */}
      <motion.div variants={itemVariants} className="relative z-10">
        <DaySelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </motion.div>

      {/* Main Progress + Stats Card */}
      <motion.div variants={itemVariants} className="relative z-10">
        <PlayfulCard className="flex flex-col items-center py-6 gap-5 bg-white/80">
          <CircularProgress
            progress={Math.min(progress, 100)}
            hours={hours}
            minutes={mins}
            remainingText={remainingText}
          />
          
          <div className="grid grid-cols-3 gap-4 w-full px-2">
            <StatBadge
              icon={<Hand className="w-4 h-4" strokeWidth={2.5} />}
              label="やめとく"
              value={`${mockData.cancelCount}`}
            />
            <StatBadge
              icon={<Flame className="w-4 h-4" strokeWidth={2.5} />}
              label="連続達成"
              value={`${mockData.streakDays}日`}
            />
            <StatBadge
              icon={<Clock className="w-4 h-4" strokeWidth={2.5} />}
              label="節約時間"
              value={`${mockData.savedMinutes}m`}
            />
          </div>
        </PlayfulCard>
      </motion.div>

      {/* Hourly Usage Chart */}
      <motion.div variants={itemVariants} className="space-y-3 relative z-10">
        <h2 className="text-sm font-semibold text-foreground px-1">時間別利用</h2>
        <PlayfulCard className="bg-white/80">
          <HourlyAreaChart data={mockHourlyData} currentHour={CURRENT_HOUR} />
        </PlayfulCard>
      </motion.div>

      {/* Top Apps */}
      <motion.div variants={itemVariants} className="space-y-3 relative z-10">
        <h2 className="text-sm font-semibold text-foreground px-1">よく使ったアプリ</h2>
        <PlayfulCard className="divide-y divide-border bg-white/80">
          {mockData.topApps.map((app, index) => (
            <AppUsageCard
              key={app.name}
              name={app.name}
              minutes={app.minutes}
              icon={app.icon}
              index={index}
              onClick={() => handleAppClick(app.name)}
            />
          ))}
        </PlayfulCard>
      </motion.div>
    </motion.div>
  );
};
