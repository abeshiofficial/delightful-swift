import { motion } from "framer-motion";
import { PlayfulCard } from "@/components/PlayfulCard";
import { CircularProgress } from "@/components/CircularProgress";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { StatBadge } from "@/components/StatBadge";
import { AppUsageCard } from "@/components/AppUsageCard";
import { Mascot } from "@/components/Mascot";

// Mock data
const mockData = {
  usageTimeMinutes: 230,
  goalMinutes: 290,
  cancelCount: 10,
  streakDays: 9,
  savedMinutes: 60,
  topApps: [
    { name: "Instagram", minutes: 45, icon: "📸", color: "hsl(330 80% 60%)" },
    { name: "YouTube", minutes: 38, icon: "▶️", color: "hsl(0 70% 55%)" },
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
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const TodayTab = () => {
  const progress = (mockData.usageTimeMinutes / mockData.goalMinutes) * 100;
  const remainingMinutes = mockData.goalMinutes - mockData.usageTimeMinutes;
  const { hours, mins } = formatTimeDisplay(mockData.usageTimeMinutes);

  return (
    <motion.div
      className="flex flex-col gap-6 p-5 pb-28"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center pt-2">
        <h1 className="text-2xl font-extrabold text-foreground">Today</h1>
      </motion.div>

      {/* Main Progress Card */}
      <PlayfulCard className="flex flex-col items-center py-8">
        <p className="text-sm font-semibold text-muted-foreground mb-4">利用時間</p>

        <CircularProgress progress={Math.min(progress, 100)} size={200} strokeWidth={14}>
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1">
              <AnimatedNumber
                value={hours}
                className="text-5xl font-black text-foreground"
              />
              <span className="text-xl font-bold text-muted-foreground">時間</span>
              <AnimatedNumber
                value={mins}
                className="text-5xl font-black text-foreground"
              />
              <span className="text-xl font-bold text-muted-foreground">分</span>
            </div>
          </div>
        </CircularProgress>

        <motion.p
          className="text-sm font-semibold text-muted-foreground mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          目標まであと{" "}
          <span className="text-secondary font-bold">
            {Math.floor(remainingMinutes / 60)}時間{remainingMinutes % 60}分
          </span>
        </motion.p>
      </PlayfulCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <StatBadge
          emoji="👋"
          label={"やめとく\n押した回数"}
          value={`${mockData.cancelCount}回`}
          color="primary"
          delay={0.3}
        />
        <StatBadge
          emoji="🎉"
          label={"連続\n達成日数"}
          value={`${mockData.streakDays}日`}
          color="secondary"
          delay={0.4}
        />
        <StatBadge
          emoji="⏰"
          label={"節約できた\n時間"}
          value={`${mockData.savedMinutes}分`}
          color="accent"
          delay={0.5}
        />
      </div>

      {/* Mascot */}
      <motion.div
        className="flex justify-center py-2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
      >
        <Mascot size="lg" mood="happy" />
      </motion.div>

      {/* Top Apps */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">よく使ったアプリ</h2>
        <PlayfulCard className="space-y-3 p-4">
          {mockData.topApps.map((app, index) => (
            <AppUsageCard
              key={app.name}
              name={app.name}
              minutes={app.minutes}
              icon={app.icon}
              color={app.color}
              index={index}
            />
          ))}
        </PlayfulCard>
      </motion.div>
    </motion.div>
  );
};
