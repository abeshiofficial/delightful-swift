import { useState } from "react";
import { TodayTab } from "@/components/TodayTab";
import { StatisticsTab } from "@/components/StatisticsTab";
import { BottomTabBar } from "@/components/BottomTabBar";

type TabType = "today" | "statistics" | "settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("today");

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      {/* Content Area */}
      <div className="overflow-y-auto">
        {activeTab === "today" && <TodayTab />}
        {activeTab === "statistics" && <StatisticsTab />}
        {activeTab === "settings" && (
          <div className="flex flex-col items-center justify-center min-h-screen p-6 pb-24">
            <p className="text-muted-foreground">設定タブ（未実装）</p>
          </div>
        )}
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
