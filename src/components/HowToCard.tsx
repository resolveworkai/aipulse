import { motion } from 'framer-motion';
import { Clock, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { HowToGuide } from '@/data/howToGuides';
import { useState } from 'react';

interface HowToCardProps {
  guide: HowToGuide;
  index: number;
}

const HowToCard = ({ guide, index }: HowToCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'tag-trending';
      case 'intermediate':
        return 'tag-new';
      case 'advanced':
        return 'tag-hot';
      default:
        return 'tag-ai';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.3 }}
      className="glass-card p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{guide.icon}</span>
          <div>
            <h3 className="text-xl font-bold">{guide.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(guide.difficulty)}`}>
                {guide.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {guide.timeToComplete}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4">
        {guide.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {guide.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-lg text-xs font-medium bg-muted/50 text-muted-foreground"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-4"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Hide Setup Guide
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Show Setup Guide
          </>
        )}
      </button>

      {/* Expanded Content */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {/* Prerequisites */}
        <div className="mb-4 p-4 rounded-xl bg-muted/30 border border-border/50">
          <h4 className="text-sm font-semibold mb-2">Prerequisites</h4>
          <ul className="space-y-1">
            {guide.prerequisites.map((prereq, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5">•</span>
                {prereq}
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-3">Installation Steps</h4>
          <div className="space-y-3">
            {guide.steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div>
                  <h5 className="text-sm font-medium">{step.title}</h5>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono bg-muted/30 px-2 py-1 rounded">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
          {guide.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HowToCard;
