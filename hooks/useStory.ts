import { useQuery } from '@tanstack/react-query';
import { fetchItem } from '@/lib/api/hackernews';
import { queryKeys } from '@/lib/api/queryKeys';
import type { THNItem } from '@/types/hackernews';

export type TUseStoryParams = {
  id: number | null;
  enabled?: boolean;
};

export const useStory = ({ id, enabled = true }: TUseStoryParams) => {
  return useQuery<THNItem | null>({
    queryKey: id != null ? queryKeys.item.detail(id) : ['item', null],
    queryFn: () => fetchItem(id!),
    enabled: enabled && id != null,
    staleTime: 5 * 60 * 1000,
  });
};
