import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

interface LiveIndicatorProps {
  lastUpdated: Date;
}

const LiveIndicator = ({ lastUpdated }: LiveIndicatorProps) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    if (diff < 1) return 'Just now';
    if (diff === 1) return '1 min ago';
    if (diff < 60) return `${diff} mins ago`;
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <motion.div
      className="flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-border/50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="relative flex items-center gap-2">
        <div className="relative">
          <motion.div
            className="w-2.5 h-2.5 rounded-full bg-neon-green"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-neon-green"
            animate={{
              scale: [1, 2],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </div>
        <span className="text-sm font-medium text-neon-green">LIVE</span>
      </div>
      <div className="h-4 w-px bg-border" />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Radio className="w-3.5 h-3.5" />
        <span className="mono text-xs">Updated {formatTime(lastUpdated)}</span>
      </div>
      <div className="h-4 w-px bg-border hidden sm:block" />
      <span className="text-xs text-muted-foreground hidden sm:block">Auto-refresh: ON</span>
    </motion.div>
  );
};

export default LiveIndicator;
