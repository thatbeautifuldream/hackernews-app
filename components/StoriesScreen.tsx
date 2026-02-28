import { FlatList, Pressable, RefreshControl, Text, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useQueries } from '@tanstack/react-query';
import { StoryItem } from '@/components/StoryItem';
import { StoryItemSkeleton } from '@/components/StoryItemSkeleton';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useStories } from '@/hooks/useStories';
import { fetchItem } from '@/lib/api/hackernews';
import { queryKeys } from '@/lib/api/queryKeys';
import type { TStoryType, THNItem } from '@/types/hackernews';

export type TStoriesScreenProps = {
  storyType: TStoryType;
};

export function StoriesScreen({ storyType }: TStoriesScreenProps) {
  const router = useRouter();

  const {
    ids: storyIds,
    isLoading: isLoadingIds,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useStories({ storyType });

  // Fetch each story item individually — shares cache with story detail screen.
  // useQueries adds new queries as storyIds grows (pagination) without
  // invalidating already-loaded items.
  const itemQueries = useQueries({
    queries: storyIds.map((id) => ({
      queryKey: queryKeys.item.detail(id),
      queryFn: () => fetchItem(id),
      staleTime: 5 * 60 * 1000,
    })),
  });

  // Only show items that are fully loaded and not deleted/dead
  const stories = itemQueries
    .map((q) => q.data)
    .filter((item): item is THNItem => !!item && !item.deleted && !item.dead);

  // True while IDs haven't loaded yet, or IDs are loaded but no items have
  // come back yet (brief window during initial fetch)
  const isLoadingFirstPage =
    isLoadingIds || (storyIds.length > 0 && stories.length === 0 && itemQueries.some((q) => q.isLoading));

  // Show footer spinner when some stories are visible but new items are still loading
  // (user scrolled to load more)
  const showLoadingMore = stories.length > 0 && itemQueries.some((q) => q.isLoading);

  const handleStoryPress = (storyId: number) => {
    router.push(`/story/${storyId}` as any);
  };

  if (isError && stories.length === 0) {
    return (
      <ErrorMessage
        message={error instanceof Error ? error.message : 'Failed to load stories'}
        onRetry={refetch}
      />
    );
  }

  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.id.toString()}
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleStoryPress(item.id)}>
          <StoryItem story={item} onPress={() => handleStoryPress(item.id)} />
        </Pressable>
      )}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      }
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        showLoadingMore ? (
          <View className="py-4">
            <ActivityIndicator />
          </View>
        ) : null
      }
      ListEmptyComponent={() =>
        isLoadingFirstPage ? (
          <StoryItemSkeleton />
        ) : (
          <View className="p-4">
            <Text className="text-center text-muted-foreground">No stories found</Text>
          </View>
        )
      }
    />
  );
}
