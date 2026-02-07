import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface AppData {
  name: string;
  minutes: number;
  icon: string;
}

interface AppRankingProps {
  apps: AppData[];
  onAppClick?: (appName: string) => void;
}

const LaurelIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C10.5 4 9.5 6 9.5 8.5C9.5 10 10 11.5 11 12.5C9.5 12 8 12 6.5 12.5C5 13 4 14 3.5 15.5C5 15 6.5 15 8 15.5C9.5 16 10.5 17 11 18.5C10.5 17 9.5 16 8 15.5C6.5 15 5 15 3.5 15.5C4 17 5 18 6.5 18.5C8 19 9.5 19 11 18.5C10.5 20 10.5 21.5 11 23L12 22L13 23C13.5 21.5 13.5 20 13 18.5C14.5 19 16 19 17.5 18.5C19 18 20 17 20.5 15.5C19 15 17.5 15 16 15.5C14.5 16 13.5 17 13 18.5C13.5 17 14.5 16 16 15.5C17.5 15 19 15 20.5 15.5C20 14 19 13 17.5 12.5C16 12 14.5 12 13 12.5C14 11.5 14.5 10 14.5 8.5C14.5 6 13.5 4 12 2Z" />
  </svg>
);

const PodiumCard = ({
  app,
  rank,
  height,
  delay,
  onClick,
}: {
  app: AppData;
  rank: number;
  height: string;
  delay: number;
  onClick?: () => void;
}) => {
  const hours = Math.floor(app.minutes / 60);
  const mins = app.minutes % 60;
  const timeText = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  return (
    <motion.button
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
    >
      {/* App icon */}
      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-xl mb-2 shadow-sm">
        {app.icon}
      </div>

      {/* Podium */}
      <motion.div
        className="bg-gradient-to-b from-muted/50 to-muted rounded-t-2xl flex flex-col items-center justify-end pb-3 px-4 relative"
        style={{ height, minWidth: rank === 1 ? 88 : 76 }}
        initial={{ height: 0 }}
        animate={{ height }}
        transition={{ delay: delay + 0.1, duration: 0.4, type: "spring" }}
      >
        {/* Laurel and rank */}
        <div className="flex items-center gap-0.5 mb-1">
          <LaurelIcon className="w-5 h-5 text-muted-foreground/50 scale-x-[-1]" />
          <span className="text-2xl font-black text-foreground">{rank}</span>
          <LaurelIcon className="w-5 h-5 text-muted-foreground/50" />
        </div>

        {/* Time */}
        <span className="text-xs text-muted-foreground font-medium">{timeText}</span>
      </motion.div>
    </motion.button>
  );
};

const ListItem = ({
  app,
  rank,
  index,
  onClick,
}: {
  app: AppData;
  rank: number;
  index: number;
  onClick?: () => void;
}) => {
  const hours = Math.floor(app.minutes / 60);
  const mins = app.minutes % 60;
  const timeText = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  return (
    <motion.button
      className="flex items-center gap-3 w-full text-left py-2 px-1 rounded-xl active:bg-muted/50 transition-colors"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.08 }}
      onClick={onClick}
    >
      {/* Rank */}
      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
        <span className="text-xs font-bold text-muted-foreground">{rank}</span>
      </div>

      {/* App icon */}
      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-base flex-shrink-0">
        {app.icon}
      </div>

      {/* App info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-sm truncate">{app.name}</p>
        <p className="text-xs text-muted-foreground">{timeText}</p>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
    </motion.button>
  );
};

export const AppRanking = ({ apps, onAppClick }: AppRankingProps) => {
  const top3 = apps.slice(0, 3);
  const rest = apps.slice(3, 5);

  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3;
  const heights = ["80px", "100px", "70px"];
  const ranks = [2, 1, 3];

  return (
    <div className="space-y-4">
      {/* Podium for top 3 */}
      <div className="flex items-end justify-center gap-2 pt-4">
        {podiumOrder.map((app, index) => (
          <PodiumCard
            key={app.name}
            app={app}
            rank={ranks[index]}
            height={heights[index]}
            delay={index * 0.1}
            onClick={() => onAppClick?.(app.name)}
          />
        ))}
      </div>

      {/* List for 4th and 5th */}
      {rest.length > 0 && (
        <div className="border-t border-border pt-3 mt-2">
          {rest.map((app, index) => (
            <ListItem
              key={app.name}
              app={app}
              rank={index + 4}
              index={index}
              onClick={() => onAppClick?.(app.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
