interface StatBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const StatBadge = ({
  icon,
  label,
  value,
}: StatBadgeProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <span className="text-base font-bold text-foreground">{value}</span>
      <span className="text-[10px] text-muted-foreground text-center font-medium leading-tight">
        {label}
      </span>
    </div>
  );
};
