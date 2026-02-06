import { Card, CardContent } from "@/components/ui/card";

// Mock data - would come from Screen Time API in real iOS app
const mockData = {
  usageTimeMinutes: 230, // 3時間50分
  goalMinutes: 290, // 目標まで残り1時間
  cancelCount: 10, // やめとく押した回数
  streakDays: 9, // 連続達成日数
  savedMinutes: 60, // 節約できた時間
  topApps: [
    { name: "Instagram", minutes: 45 },
    { name: "YouTube", minutes: 38 },
  ],
};

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}分`;
  if (mins === 0) return `${hours}時間`;
  return `${hours}時間${mins}分`;
}

const StatCard = ({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value: string;
}) => (
  <div className="flex flex-col items-center gap-1 flex-1">
    <span className="text-2xl">{emoji}</span>
    <span className="text-xs text-muted-foreground text-center whitespace-pre-line leading-tight">
      {label}
    </span>
    <span className="text-lg font-semibold text-foreground">{value}</span>
  </div>
);

const AppUsageItem = ({ name, minutes }: { name: string; minutes: number }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
      <span className="text-xs text-muted-foreground">📱</span>
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-medium text-foreground">{name}</span>
      <span className="text-xs text-muted-foreground">
        使った時間: {formatTime(minutes)}
      </span>
    </div>
  </div>
);

// Simple mascot character - abstract shape with minimal features
const Mascot = () => (
  <div className="flex justify-center py-4">
    <div className="relative">
      {/* Shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-foreground/5 rounded-full blur-sm" />
      {/* Body - slightly irregular circle */}
      <div
        className="w-20 h-20 bg-primary rounded-full relative"
        style={{
          borderRadius: "47% 53% 52% 48% / 48% 52% 48% 52%",
        }}
      >
        {/* Eyes - simple dots */}
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-foreground rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-foreground rounded-full" />
      </div>
    </div>
  </div>
);

export const TodayTab = () => {
  const remainingMinutes = mockData.goalMinutes - mockData.usageTimeMinutes;

  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-lg font-medium text-foreground">Today</h1>
      </div>

      {/* Usage Time Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6 pb-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">利用時間</p>
          <p className="text-4xl font-bold text-foreground mb-2">
            {formatTime(mockData.usageTimeMinutes)}
          </p>
          <p className="text-sm text-muted-foreground">
            目標まで残り時間：{formatTime(remainingMinutes)}
          </p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Card className="border-0 shadow-sm">
        <CardContent className="py-6">
          <div className="flex divide-x divide-border">
            <StatCard
              emoji="👋"
              label={"やめとく\n押した回数"}
              value={`${mockData.cancelCount}回`}
            />
            <StatCard
              emoji="🎉"
              label={"連続達成日数"}
              value={`${mockData.streakDays}回`}
            />
            <StatCard
              emoji="⏰"
              label={"節約できた\n時間"}
              value={formatTime(mockData.savedMinutes)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Mascot */}
      <Mascot />

      {/* Top Apps */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-foreground">よく使ったアプリ</h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="py-4 space-y-4">
            {mockData.topApps.map((app) => (
              <AppUsageItem key={app.name} name={app.name} minutes={app.minutes} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
