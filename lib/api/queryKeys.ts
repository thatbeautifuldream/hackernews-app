import type { TStoryType } from '@/types/hackernews';

export const queryKeys = {
  stories: {
    all: ['stories'] as const,
    lists: () => ['stories', 'list'] as const,
    list: (storyType: TStoryType) => ['stories', 'list', storyType] as const,
    // 'ids' key is separate from 'list' to avoid collision with the old
    // useInfiniteQuery cache which stored { pages, pageParams } under 'list'
    ids: (storyType: TStoryType) => ['story-ids', storyType] as const,
  },
  item: {
    all: ['item'] as const,
    detail: (id: number) => ['item', id] as const,
  },
  user: {
    all: ['user'] as const,
    detail: (id: string) => ['user', id] as const,
  },
} as const;

export type TQueryKeys = typeof queryKeys;
