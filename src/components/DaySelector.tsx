import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DaySelectorProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const getDaysOfWeek = (today: Date): { date: Date; dayName: string; dayNum: number; isToday: boolean }[] => {
  const days = [];
  for (let i = -6; i <= 0; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
    days.push({
      date,
      dayName: i === 0 ? "今日" : dayNames[date.getDay()],
      dayNum: date.getDate(),
      isToday: i === 0,
    });
  }
  return days;
};

export const DaySelector = ({ selectedDate, onSelectDate }: DaySelectorProps) => {
  const today = new Date();
  const days = getDaysOfWeek(today);

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Weekday labels row */}
      <div className="flex justify-between w-full">
        {days.map((day, index) => (
          <motion.span
            key={`label-${index}`}
            className="text-xs font-medium text-muted-foreground w-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.03 }}
          >
            {day.dayName}
          </motion.span>
        ))}
      </div>
      
      {/* Date circles row */}
      <div className="flex justify-between w-full">
        {days.map((day, index) => {
          const isSelected = isSameDay(day.date, selectedDate);
          return (
            <motion.button
              key={index}
              onClick={() => onSelectDate(day.date)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                isSelected
                  ? "bg-foreground text-background"
                  : "bg-muted text-foreground hover:bg-muted/80"
              )}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-semibold">
                {day.dayNum}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
