import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchStoryIds } from '@/lib/api/hackernews';
import { queryKeys } from '@/lib/api/queryKeys';
import type { TStoryType } from '@/types/hackernews';

export type TUseStoriesParams = {
  storyType: TStoryType;
  pageSize?: number;
};

/**
 * Fetches story IDs once and paginates in-memory.
 * HN API: top/new/best return up to 500 IDs; ask/show/job return up to 200.
 * Individual items are fetched separately via useQueries in the consumer.
 */
export const useStories = ({ storyType, pageSize = 20 }: TUseStoriesParams) => {
  const [page, setPage] = useState(0);

  const { data: allIds, isLoading, isError, error, refetch, isFetching } = useQuery({
    // Use 'story-ids' key (not 'stories.list') to avoid colliding with the old
    // useInfiniteQuery cache which stored { pages, pageParams } under the same key.
    queryKey: queryKeys.stories.ids(storyType),
    queryFn: () => fetchStoryIds(storyType),
    staleTime: 5 * 60 * 1000,
  });

  const visibleCount = (page + 1) * pageSize;
  const ids = Array.isArray(allIds) ? allIds : [];
  const visibleIds = ids.slice(0, visibleCount);
  const hasNextPage = ids.length > visibleCount;

  const fetchNextPage = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const handleRefetch = useCallback(() => {
    setPage(0);
    refetch();
  }, [refetch]);

  return {
    ids: visibleIds,
    totalIds: ids.length,
    isLoading,
    isError,
    error,
    refetch: handleRefetch,
    fetchNextPage,
    hasNextPage,
    isRefetching: isFetching && !isLoading,
  };
};
