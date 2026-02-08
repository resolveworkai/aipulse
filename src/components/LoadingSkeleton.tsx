import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-6"
        >
          {/* Rank Badge */}
          <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl shimmer" />

          {/* Engagement Score */}
          <div className="absolute -top-3 right-4 w-20 h-8 rounded-full shimmer" />

          {/* Status Badges */}
          <div className="flex gap-2 mb-4 ml-6">
            <div className="w-16 h-5 rounded-full shimmer" />
            <div className="w-20 h-5 rounded-full shimmer" />
          </div>

          {/* Title */}
          <div className="space-y-2 mb-4">
            <div className="h-7 w-full shimmer rounded-lg" />
            <div className="h-7 w-3/4 shimmer rounded-lg" />
          </div>

          {/* Meta */}
          <div className="flex gap-4 mb-4">
            <div className="h-4 w-24 shimmer rounded" />
            <div className="h-4 w-20 shimmer rounded" />
            <div className="h-4 w-28 shimmer rounded" />
          </div>

          {/* Summary */}
          <div className="space-y-2 mb-4">
            <div className="h-4 w-full shimmer rounded" />
            <div className="h-4 w-full shimmer rounded" />
            <div className="h-4 w-2/3 shimmer rounded" />
          </div>

          {/* Key Insights Box */}
          <div className="p-4 rounded-xl bg-muted/20 mb-4">
            <div className="h-5 w-32 shimmer rounded mb-3" />
            <div className="space-y-2">
              <div className="h-4 w-full shimmer rounded" />
              <div className="h-4 w-5/6 shimmer rounded" />
              <div className="h-4 w-4/5 shimmer rounded" />
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="h-6 w-16 rounded-lg shimmer" />
            ))}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-border/30 flex justify-between">
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-lg shimmer" />
              <div className="w-10 h-10 rounded-lg shimmer" />
            </div>
            <div className="w-32 h-10 rounded-xl shimmer" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
