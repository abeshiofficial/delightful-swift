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
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
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
    <div className="flex justify-between items-center">
      {days.map((day, index) => {
        const isSelected = isSameDay(day.date, selectedDate);
        return (
          <motion.button
            key={index}
            onClick={() => onSelectDate(day.date)}
            className={cn(
              "relative flex flex-col items-center py-2.5 px-3 rounded-2xl transition-all min-w-[44px]",
              isSelected
                ? "bg-primary"
                : "hover:bg-muted/80"
            )}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            whileTap={{ scale: 0.95 }}
          >
            {day.isToday && (
              <span className={cn(
                "absolute -top-1 text-[8px] font-semibold tracking-wider",
                isSelected ? "text-primary-foreground" : "text-primary"
              )}>
                Today
              </span>
            )}
            <span className={cn(
              "text-[11px] font-medium mt-1",
              isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {day.dayName}
            </span>
            <span className={cn(
              "text-base font-semibold",
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
