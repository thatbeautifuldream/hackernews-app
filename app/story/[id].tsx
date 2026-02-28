import {
  ScrollView,
  Text,
  View,
  Linking,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useStory } from '@/hooks/useStory';
import { useComments } from '@/hooks/useComments';
import { Comment } from '@/components/Comment';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ExternalLinkIcon } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import { formatTime } from '@/lib/utils/date';
import { useState, useCallback } from 'react';
import type { THNItem } from '@/types/hackernews';

/** Strip HTML tags and decode common HTML entities from HN API text fields */
function decodeHtml(html: string): string {
  return html
    .replace(/<p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi, '$2 ($1)')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

export default function StoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const storyId = parseInt(id, 10);

  const { data: story, isLoading, isError, error, refetch } = useStory({ id: storyId });

  // story.kids contains comment IDs in ranked display order
  const commentIds = (story as THNItem | null)?.kids ?? [];
  const commentsResults = useComments({ commentIds, enabled: commentIds.length > 0 });

  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());

  const toggleComment = useCallback((commentId: number) => {
    setExpandedComments((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  }, []);

  const isLoadingComments = commentsResults.some((r) => r.isLoading);
  const comments = commentsResults
    .map((r) => r.data)
    .filter((item): item is THNItem => !!item && !item.deleted && !item.dead);

  if (isError) {
    return (
      <>
        <Stack.Screen options={{ title: 'Story' }} />
        <ErrorMessage
          message={error instanceof Error ? error.message : 'Failed to load story'}
          onRetry={refetch}
        />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: 'Story' }} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  // HN API returns null (200 OK) for items that no longer exist
  if (!story) {
    return (
      <>
        <Stack.Screen options={{ title: 'Story' }} />
        <ErrorMessage message="Story not found or has been removed" onRetry={refetch} />
      </>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: '' }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1 }}>
        {/* Story header */}
        <View className="border-b border-border p-4">
          <Text className="mb-3 text-xl font-bold text-foreground" selectable>
            {story.title}
          </Text>
          <View className="mb-3 flex-row flex-wrap items-center gap-2">
            {story.by ? (
              <Text className="text-sm text-muted-foreground">by {story.by}</Text>
            ) : null}
            <Text className="text-sm text-muted-foreground">
              {formatTime({ timestamp: story.time })}
            </Text>
            {story.score != null && (
              <Text
                className="text-sm text-muted-foreground"
                style={{ fontVariant: ['tabular-nums'] }}>
                {story.score} points
              </Text>
            )}
            {story.descendants != null && (
              <Text
                className="text-sm text-muted-foreground"
                style={{ fontVariant: ['tabular-nums'] }}>
                {story.descendants} comments
              </Text>
            )}
          </View>

          {story.url ? (
            <Pressable
              onPress={() => Linking.openURL(story.url!)}
              className="flex-row items-center gap-2 rounded-md bg-muted p-3 active:opacity-70"
              style={{ borderCurve: 'continuous' }}>
              <Icon as={ExternalLinkIcon} size={16} className="text-foreground" />
              <Text className="flex-1 text-sm font-medium text-foreground" numberOfLines={1}>
                {story.url.replace(/^https?:\/\//, '')}
              </Text>
            </Pressable>
          ) : null}

          {/* Text body — used by Ask HN, jobs, polls */}
          {story.text ? (
            <Text className="mt-3 text-sm leading-relaxed text-foreground" selectable>
              {decodeHtml(story.text)}
            </Text>
          ) : null}
        </View>

        {/* Comments section */}
        <View className="p-4">
          {isLoadingComments ? (
            <View className="items-center py-8">
              <ActivityIndicator />
              <Text className="mt-2 text-sm text-muted-foreground">Loading comments…</Text>
            </View>
          ) : comments.length > 0 ? (
            <>
              <Text className="mb-4 text-lg font-semibold text-foreground">
                {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
              </Text>
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  expanded={expandedComments.has(comment.id)}
                  onToggle={() => toggleComment(comment.id)}
                />
              ))}
            </>
          ) : (
            <Text className="text-center text-muted-foreground">No comments yet</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
