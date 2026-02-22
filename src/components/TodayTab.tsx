import { useState } from "react";
import { motion } from "framer-motion";
import { Hand, Flame, Clock, Shield, Calendar, ChevronRight } from "lucide-react";
import { PlayfulCard } from "@/components/PlayfulCard";
import { CircularProgress } from "@/components/CircularProgress";
import { StatBadge } from "@/components/StatBadge";
import { AppUsageCard } from "@/components/AppUsageCard";
import { DaySelector } from "@/components/DaySelector";
import { HourlyAreaChart } from "@/components/HourlyAreaChart";
import { Mascot, MascotMood } from "@/components/Mascot";

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
  usageTimeMinutes: 620, // 10時間20分
  goalMinutes: 480, // 8時間
  cancelCount: 10,
  streakDays: 9,
  savedMinutes: 60,
  topApps: [
    { name: "Instagram", minutes: 120, icon: "📸" },
    { name: "YouTube", minutes: 150, icon: "▶️" },
    { name: "X (Twitter)", minutes: 95, icon: "𝕏" },
    { name: "TikTok", minutes: 80, icon: "🎵" },
    { name: "LINE", minutes: 55, icon: "💬" },
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

function getMascotMood(progress: number): MascotMood {
  if (progress >= 100) return "sad";
  if (progress >= 80) return "neutral";
  if (progress >= 50) return "happy";
  return "excited";
}

export const TodayTab = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const progress = (mockData.usageTimeMinutes / mockData.goalMinutes) * 100;
  const isOverGoal = mockData.usageTimeMinutes > mockData.goalMinutes;
  const overMinutes = mockData.usageTimeMinutes - mockData.goalMinutes;
  const overHours = Math.floor(overMinutes / 60);
  const overMins = overMinutes % 60;
  const remainingMinutes = mockData.goalMinutes - mockData.usageTimeMinutes;
  const { hours, mins } = formatTimeDisplay(mockData.usageTimeMinutes);
  const remainingHours = Math.floor(Math.abs(remainingMinutes) / 60);
  const remainingMins = Math.abs(remainingMinutes) % 60;
  const remainingText = isOverGoal
    ? `目標を${overHours > 0 ? `${overHours}時間` : ""}${overMins}分オーバー`
    : `目標まで残り${remainingHours}時間${remainingMins}分`;
  const mascotMood = getMascotMood(progress);

  const handleAppClick = (appName: string) => {
    // TODO: Navigate to app detail page
    console.log(`Navigate to ${appName} detail`);
  };

  const handleBlockedAppsClick = () => {
    // TODO: Navigate to blocked apps list
    console.log("Navigate to blocked apps list");
  };

  const handleScheduleClick = () => {
    // TODO: Navigate to block schedule settings
    console.log("Navigate to block schedule settings");
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
            rgba(160, 140, 210, 0.5) 0%, 
            rgba(190, 150, 200, 0.4) 15%, 
            rgba(220, 160, 170, 0.35) 35%, 
            rgba(240, 180, 150, 0.25) 50%, 
            rgba(245, 210, 180, 0.15) 65%, 
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
            isOver={isOverGoal}
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

      {/* Quick Action Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 relative z-10">
        <motion.button
          onClick={handleBlockedAppsClick}
          className="flex flex-col gap-3 p-4 rounded-2xl bg-white/80 border border-border text-left hover:bg-white/90 transition-colors"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <p className="text-xs font-semibold text-foreground">ブロック中</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-1.5">
            {["📸", "▶️", "🎵"].map((icon, i) => (
              <div key={i} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm">
                {icon}
              </div>
            ))}
            <span className="text-[10px] text-muted-foreground font-medium ml-1">+2</span>
          </div>
        </motion.button>

        <motion.button
          onClick={handleScheduleClick}
          className="flex flex-col gap-3 p-4 rounded-2xl bg-white/80 border border-border text-left hover:bg-white/90 transition-colors"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <p className="text-xs font-semibold text-foreground">スケジュール</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted">
                <span className="text-[10px] font-semibold text-foreground">9:00</span>
                <span className="text-[10px] text-muted-foreground">-</span>
                <span className="text-[10px] font-semibold text-foreground">18:00</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">稼働中</span>
            </div>
            <div className="flex items-center gap-0.5">
              {["月", "火", "水", "木", "金", "土", "日"].map((day, i) => {
                const active = i < 5; // 月〜金がアクティブ
                return (
                  <span
                    key={day}
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-semibold ${
                      active
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </div>
        </motion.button>
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
