import { useQueries } from '@tanstack/react-query';
import { fetchItem } from '@/lib/api/hackernews';
import { queryKeys } from '@/lib/api/queryKeys';

export type TUseCommentsParams = {
  commentIds: number[];
  enabled?: boolean;
};

export const useComments = ({ commentIds, enabled = true }: TUseCommentsParams) => {
  return useQueries({
    queries: commentIds.map((id) => ({
      queryKey: queryKeys.item.detail(id),
      queryFn: () => fetchItem(id),
      enabled: enabled && id > 0,
      staleTime: 5 * 60 * 1000,
    })),
  });
};
