import { motion } from 'framer-motion';
import { Flame, MessageCircle, Share2, Clock, ExternalLink, Bookmark, Sparkles } from 'lucide-react';
import { Article } from '@/data/mockArticles';
import { useState, forwardRef } from 'react';

interface ArticleCardProps {
  article: Article;
  index: number;
}

const ArticleCard = forwardRef<HTMLElement, ArticleCardProps>(({ article, index }, ref) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatEngagement = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getRankBadgeStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-gold to-coral text-primary-foreground';
    if (rank === 2) return 'bg-gradient-to-br from-muted-foreground to-muted text-foreground';
    if (rank === 3) return 'bg-gradient-to-br from-coral to-cyber-purple text-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      ml: 'tag-ai',
      nlp: 'tag-ml',
      cv: 'tag-ai',
      robotics: 'tag-hot',
      research: 'tag-ml',
      industry: 'tag-new',
    };
    return colors[category] || 'tag-ai';
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.3 }}
      layout
      className="group relative glass-card p-6 hover:scale-[1.01] transition-all duration-300"
      whileHover={{
        boxShadow: '0 8px 40px -8px hsl(var(--primary) / 0.2)',
      }}
    >
      {/* Rank Badge */}
      <motion.div
        className={`absolute -top-3 -left-3 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg ${getRankBadgeStyle(article.rank)}`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: Math.min(index * 0.03 + 0.1, 0.4), type: 'spring', stiffness: 200 }}
      >
        #{article.rank}
      </motion.div>

      {/* Engagement Score */}
      <div className="absolute -top-3 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral/20 border border-coral/30">
        <Flame className="w-4 h-4 text-coral" />
        <span className="text-sm font-semibold text-coral mono">
          {formatEngagement(article.engagement.score)}
        </span>
      </div>

      {/* Status Badges */}
      <div className="flex items-center gap-2 mb-4 ml-6">
        {article.isNew && (
          <motion.span
            className="px-2 py-0.5 rounded-full text-xs font-medium tag-new border"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ NEW
          </motion.span>
        )}
        {article.isTrending && (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium tag-trending border">
            🔥 TRENDING
          </span>
        )}
        {article.isHot && (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium tag-hot border">
            ⚡ HOT
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
        {article.punchyTitle}
      </h2>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-foreground">{article.source}</span>
        </div>
        <span className="text-border">•</span>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span className="mono text-xs">{article.timeAgo}</span>
        </div>
        <span className="text-border">•</span>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="mono text-xs">{formatEngagement(article.engagement.comments)} comments</span>
        </div>
      </div>

      {/* Punchy Summary */}
      <p className="text-muted-foreground leading-relaxed mb-4">
        {article.punchySummary}
      </p>

      {/* Key Insights */}
      <div className="mb-4 p-4 rounded-xl bg-muted/30 border border-border/50">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">KEY INSIGHTS</span>
        </div>
        <ul className="space-y-2">
          {article.keyInsights.map((insight, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm"
            >
              <span className="text-primary mt-1">•</span>
              <span className="text-muted-foreground">{insight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Power Quote */}
      {article.powerQuote && (
        <blockquote className="relative pl-4 py-2 mb-4 border-l-2 border-secondary italic text-muted-foreground">
          <span className="absolute -left-2 -top-2 text-4xl text-secondary/30">"</span>
          {article.powerQuote}
        </blockquote>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(article.category)}`}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions & Attribution */}
      <div className="pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </motion.button>
            <button className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <motion.a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Read Original</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Attribution Notice */}
        <div className="mt-3 pt-3 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center">
            Content via <span className="font-medium">{article.source}</span> | Curated by AI Pulse Today
          </p>
        </div>
      </div>
    </motion.article>
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
