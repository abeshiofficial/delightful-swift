import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, BarChart3, Settings } from "lucide-react";

type TabType = "today" | "statistics" | "settings";

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: "today" as const, label: "Today", icon: Home },
  { id: "statistics" as const, label: "統計", icon: BarChart3 },
  { id: "settings" as const, label: "設定", icon: Settings },
];

export const BottomTabBar = ({ activeTab, onTabChange }: BottomTabBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              whileTap={{ scale: 0.9 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute -top-1 w-12 h-1 bg-primary rounded-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon className={cn("w-6 h-6", isActive && "stroke-[2.5]")} />
              </motion.div>
              <span className={cn("text-xs", isActive ? "font-bold" : "font-medium")}>
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
      {/* Safe area padding */}
      <div className="h-4 bg-card/80" />
    </div>
  );
};
