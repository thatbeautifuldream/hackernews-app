import { View } from 'react-native';

export type TStoryItemSkeletonProps = {
  count?: number;
};

export const StoryItemSkeleton = ({ count = 5 }: TStoryItemSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <View key={`story-skeleton-${Date.now()}-${index}`} className="border-b border-border p-4">
          <View className="mb-2 h-4 w-3/4 animate-pulse rounded bg-muted" />
          <View className="mb-2 flex-row gap-2">
            <View className="h-3 w-16 animate-pulse rounded bg-muted" />
            <View className="h-3 w-12 animate-pulse rounded bg-muted" />
          </View>
          <View className="flex-row gap-3">
            <View className="h-3 w-10 animate-pulse rounded bg-muted" />
            <View className="h-3 w-20 animate-pulse rounded bg-muted" />
          </View>
        </View>
      ))}
    </>
  );
};
