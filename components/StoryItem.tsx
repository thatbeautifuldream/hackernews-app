import { Text, View } from 'react-native';
import { formatTime } from '@/lib/utils/date';
import { formatNumber } from '@/lib/utils/number';
import { ExternalLinkIcon, MessageSquareIcon } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import type { THNItem } from '@/types/hackernews';

export type TStoryItemProps = {
  story: THNItem;
  onPress: () => void;
};

export const StoryItem = ({ story, onPress }: TStoryItemProps) => {
  const domain = story.url ? new URL(story.url).hostname.replace('www.', '') : null;

  return (
    <View className="border-b border-border p-4">
      <Text className="mb-2 text-sm font-semibold text-foreground">{story.title}</Text>
      <View className="mb-2 flex-row items-center gap-2">
        <Text className="text-xs text-muted-foreground">{story.by}</Text>
        <Text className="text-xs text-muted-foreground">
          {formatTime({ timestamp: story.time })}
        </Text>
      </View>
      <View className="flex-row items-center gap-3">
        <View className="flex-row items-center gap-1">
          <Icon as={MessageSquareIcon} size={12} className="text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">{story.descendants || 0}</Text>
        </View>
        {domain && (
          <View className="flex-row items-center gap-1">
            <Icon as={ExternalLinkIcon} size={12} className="text-muted-foreground" />
            <Text className="text-xs text-muted-foreground">{domain}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
