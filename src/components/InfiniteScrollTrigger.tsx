import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface InfiniteScrollTriggerProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  displayedCount: number;
  totalCount: number;
}

const InfiniteScrollTrigger = ({ 
  onLoadMore, 
  hasMore, 
  isLoading, 
  displayedCount, 
  totalCount 
}: InfiniteScrollTriggerProps) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(onLoadMore);

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = onLoadMore;
  }, [onLoadMore]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore && !isLoading) {
      callbackRef.current();
    }
  }, [hasMore, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '200px',
      threshold: 0.1
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <div ref={observerRef} className="py-8">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center gap-3"
        >
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading more stories...</p>
        </motion.div>
      )}

      {!isLoading && hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />
          <p className="text-xs text-muted-foreground">Scroll for more</p>
        </motion.div>
      )}

      {!hasMore && displayedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted/50 border border-border/50">
            <span className="text-sm text-muted-foreground">
              📊 Showing all {totalCount} trending stories
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            New stories are added automatically as they trend
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default InfiniteScrollTrigger;
