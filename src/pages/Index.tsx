import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TodayTab } from "@/components/TodayTab";
import { StatisticsTab } from "@/components/StatisticsTab";
import { BottomTabBar } from "@/components/BottomTabBar";
import { Settings } from "lucide-react";

type TabType = "today" | "statistics" | "settings";

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("today");

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto overflow-hidden">
      {/* Content Area with page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="overflow-y-auto min-h-screen"
        >
          {activeTab === "today" && <TodayTab />}
          {activeTab === "statistics" && <StatisticsTab />}
          {activeTab === "settings" && (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 pb-28 gap-4">
              <motion.div
                className="w-20 h-20 rounded-full bg-muted flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Settings className="w-10 h-10 text-muted-foreground" />
              </motion.div>
              <p className="text-lg font-bold text-muted-foreground">設定タブ</p>
              <p className="text-sm text-muted-foreground">（未実装）</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
