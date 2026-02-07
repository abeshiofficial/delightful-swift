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
      dayName: dayNames[date.getDay()],
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
    <div className="flex justify-between gap-1 px-1">
      {days.map((day, index) => {
        const isSelected = isSameDay(day.date, selectedDate);
        return (
          <motion.button
            key={index}
            onClick={() => onSelectDate(day.date)}
            className={cn(
              "flex flex-col items-center py-2 px-2 rounded-xl transition-colors min-w-[40px]",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-[10px] font-medium uppercase">
              {day.isToday ? "Today" : day.dayName}
            </span>
            <span className={cn(
              "text-base font-semibold mt-0.5",
              isSelected ? "text-primary-foreground" : "text-foreground"
            )}>
              {day.dayNum}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};
