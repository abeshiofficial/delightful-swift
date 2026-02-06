import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

// Mock data for weekly statistics
const mockWeeklyData = {
  averageMinutes: 270, // 4時間30分
  trend: "up" as const, // 増加/減少
  dailyData: [
    { day: "月", minutes: 180 },
    { day: "火", minutes: 240 },
    { day: "水", minutes: 300 },
    { day: "木", minutes: 280 },
    { day: "金", minutes: 320 },
    { day: "土", minutes: 260 },
    { day: "日", minutes: 310 },
  ],
  averageLine: 270, // 平均ライン
  goalLine: 180, // 目標ライン
  increasedApps: [
    { name: "TikTok", minutes: 65 },
    { name: "Twitter", minutes: 48 },
  ],
  decreasedApps: [
    { name: "Instagram", minutes: 32 },
    { name: "YouTube", minutes: 28 },
  ],
};

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}分`;
  if (mins === 0) return `${hours}時間`;
  return `${hours}時間${mins}分`;
}

const BarChart = ({
  data,
  averageLine,
  goalLine,
}: {
  data: { day: string; minutes: number }[];
  averageLine: number;
  goalLine: number;
}) => {
  const maxMinutes = Math.max(...data.map((d) => d.minutes), 720); // max 12時間
  const chartHeight = 160;

  const getBarHeight = (minutes: number) => {
    return (minutes / maxMinutes) * chartHeight;
  };

  const getLinePosition = (minutes: number) => {
    return chartHeight - (minutes / maxMinutes) * chartHeight;
  };

  return (
    <div className="relative mt-4">
      {/* Chart area */}
      <div className="flex items-end justify-between gap-2 h-40 relative">
        {/* Average line */}
        <div
          className="absolute left-0 right-12 border-t-2 border-dashed border-muted-foreground/30"
          style={{ top: getLinePosition(averageLine) }}
        />
        {/* Goal line */}
        <div
          className="absolute left-0 right-12 border-t-2 border-secondary"
          style={{ top: getLinePosition(goalLine) }}
        />

        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 gap-1">
            <div
              className="w-full max-w-8 bg-primary/40 rounded-t-md transition-all"
              style={{ height: getBarHeight(item.minutes) }}
            />
          </div>
        ))}

        {/* Y-axis labels */}
        <div className="absolute right-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-muted-foreground">
          <span>12時間</span>
          <span>平均</span>
          <span>目標</span>
          <span>0時間</span>
        </div>
      </div>
    </div>
  );
};

const AppListItem = ({ name, minutes }: { name: string; minutes: number }) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
      <span className="text-xs">📱</span>
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-medium text-foreground">{name}</span>
      <span className="text-xs text-muted-foreground">
        使った時間: {formatTime(minutes)}
      </span>
    </div>
  </div>
);

export const StatisticsTab = () => {
  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-lg font-medium text-foreground">統計</h1>
        <p className="text-sm text-muted-foreground mt-1">今週</p>
      </div>

      {/* Summary Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6 pb-6 text-center">
          {/* Trend Icon */}
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>

          <p className="text-4xl font-bold text-foreground mb-2">
            {formatTime(mockWeeklyData.averageMinutes)}
          </p>
          <p className="text-sm text-muted-foreground">
            1日あたりのスクリーンタイムが増加
          </p>

          {/* Bar Chart */}
          <BarChart
            data={mockWeeklyData.dailyData}
            averageLine={mockWeeklyData.averageLine}
            goalLine={mockWeeklyData.goalLine}
          />
        </CardContent>
      </Card>

      {/* App Comparison */}
      <div className="grid grid-cols-2 gap-4">
        {/* Increased Apps */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-foreground">利用が増えたアプリ</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="py-4 space-y-3">
              {mockWeeklyData.increasedApps.map((app) => (
                <AppListItem
                  key={app.name}
                  name={app.name}
                  minutes={app.minutes}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Decreased Apps */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-foreground">利用が減ったアプリ</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="py-4 space-y-3">
              {mockWeeklyData.decreasedApps.map((app) => (
                <AppListItem
                  key={app.name}
                  name={app.name}
                  minutes={app.minutes}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
