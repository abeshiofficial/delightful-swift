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
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const TodayTab = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const progress = (mockData.usageTimeMinutes / mockData.goalMinutes) * 100;
  const remainingMinutes = mockData.goalMinutes - mockData.usageTimeMinutes;
  const { hours, mins } = formatTimeDisplay(mockData.usageTimeMinutes);
  const remainingText = `目標まであと ${Math.floor(remainingMinutes / 60)}時間${remainingMinutes % 60}分`;

  return (
    <motion.div
      className="flex flex-col gap-5 p-5 pb-28"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Day Selector */}
      <motion.div variants={itemVariants}>
        <DaySelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </motion.div>

      {/* Main Progress Card */}
      <motion.div variants={itemVariants} className="flex justify-center py-4">
        <CircularProgress
          progress={Math.min(progress, 100)}
          size={220}
          strokeWidth={10}
          hours={hours}
          minutes={mins}
          remainingText={remainingText}
        />
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
        <StatBadge
          icon={<Hand className="w-5 h-5" />}
          label="やめとく回数"
          value={`${mockData.cancelCount}回`}
          color="primary"
          delay={0.2}
        />
        <StatBadge
          icon={<Flame className="w-5 h-5" />}
          label="連続達成日数"
          value={`${mockData.streakDays}日`}
          color="accent"
          delay={0.3}
        />
        <StatBadge
          icon={<Clock className="w-5 h-5" />}
          label="節約できた時間"
          value={`${mockData.savedMinutes}分`}
          color="secondary"
          delay={0.4}
        />
      </motion.div>

      {/* Top Apps */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground px-1">よく使ったアプリ</h2>
        <PlayfulCard className="py-3">
          {mockData.topApps.map((app, index) => (
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
    </motion.div>
  );
};
