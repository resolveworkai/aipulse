import { motion } from 'framer-motion';
import { TrendingUp, Clock, Newspaper, Zap } from 'lucide-react';

interface HeroStatsProps {
  articleCount: number;
  sourceCount: number;
}

const HeroStats = ({ articleCount, sourceCount }: HeroStatsProps) => {
  const stats = [
    {
      icon: Newspaper,
      value: articleCount,
      label: 'Trending Stories',
      color: 'text-primary',
    },
    {
      icon: TrendingUp,
      value: sourceCount,
      label: 'Trusted Sources',
      color: 'text-secondary',
    },
    {
      icon: Clock,
      value: '30',
      suffix: 'min',
      label: 'Auto-Refresh',
      color: 'text-accent',
    },
    {
      icon: Zap,
      value: '24/7',
      label: 'Live Updates',
      color: 'text-gold',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="glass-card p-4 text-center group hover:scale-[1.02] transition-transform"
          >
            <div className={`inline-flex p-2 rounded-xl bg-muted/50 mb-2 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="flex items-baseline justify-center gap-1">
              <motion.span
                className="text-2xl md:text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {stat.value}
              </motion.span>
              {stat.suffix && (
                <span className="text-sm text-muted-foreground">{stat.suffix}</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroStats;
