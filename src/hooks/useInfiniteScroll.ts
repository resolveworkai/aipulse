import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/data/mockArticles';

interface UseInfiniteScrollOptions {
  articles: Article[];
  itemsPerPage?: number;
}

export const useInfiniteScroll = ({ articles, itemsPerPage = 10 }: UseInfiniteScrollOptions) => {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Reset when articles change (e.g., filter applied)
  useEffect(() => {
    setDisplayedArticles(articles.slice(0, itemsPerPage));
    setPage(1);
    setHasMore(articles.length > itemsPerPage);
  }, [articles, itemsPerPage]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    
    // Simulate network delay for smooth UX
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newArticles = articles.slice(startIndex, endIndex);

      if (newArticles.length > 0) {
        setDisplayedArticles(prev => [...prev, ...newArticles]);
        setPage(nextPage);
        setHasMore(endIndex < articles.length);
      } else {
        setHasMore(false);
      }
      
      setIsLoadingMore(false);
    }, 300);
  }, [articles, page, itemsPerPage, hasMore, isLoadingMore]);

  return {
    displayedArticles,
    loadMore,
    hasMore,
    isLoadingMore,
    totalCount: articles.length,
    displayedCount: displayedArticles.length
  };
};
