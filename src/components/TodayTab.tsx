import { useState } from "react";
import { motion } from "framer-motion";
import { Hand, Flame, Clock } from "lucide-react";
import { PlayfulCard } from "@/components/PlayfulCard";
import { CircularProgress } from "@/components/CircularProgress";
import { StatBadge } from "@/components/StatBadge";
import { AppUsageCard } from "@/components/AppUsageCard";
import { DaySelector } from "@/components/DaySelector";

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
  const remainingText = `目標まで ${remainingHours}h ${remainingMins}m`;

  const handleAppClick = (appName: string) => {
    // TODO: Navigate to app detail page
    console.log(`Navigate to ${appName} detail`);
  };

  return (
    <motion.div
      className="flex flex-col gap-6 px-5 pt-4 pb-28"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Day Selector - no card */}
      <motion.div variants={itemVariants}>
        <DaySelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </motion.div>

      {/* Main Progress - no card */}
      <motion.div variants={itemVariants} className="flex flex-col items-center">
        <CircularProgress
          progress={Math.min(progress, 100)}
          hours={hours}
          minutes={mins}
          remainingText={remainingText}
        />
      </motion.div>
      
      {/* Stats Row - no card */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
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
      </motion.div>

      {/* Top Apps */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground px-1">よく使ったアプリ</h2>
        <PlayfulCard className="divide-y divide-border">
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
