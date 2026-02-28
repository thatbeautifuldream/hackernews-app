import { Text, View, Pressable } from 'react-native';
import { formatTime } from '@/lib/utils/date';
import { MinusIcon, PlusIcon } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
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

export type TCommentProps = {
  comment: THNItem;
  depth?: number;
  onToggle?: () => void;
  expanded?: boolean;
};

export const Comment = ({ comment, depth = 0, onToggle, expanded = true }: TCommentProps) => {
  const hasKids = comment.kids && comment.kids.length > 0;
  const text = comment.text ? decodeHtml(comment.text) : null;

  return (
    <View style={{ paddingLeft: depth * 12 }} className="border-l border-border py-2 pr-2">
      <View className="mb-1 flex-row items-center gap-2">
        {hasKids && (
          <Pressable onPress={onToggle} hitSlop={8}>
            <Icon
              as={expanded ? MinusIcon : PlusIcon}
              size={14}
              className="text-muted-foreground"
            />
          </Pressable>
        )}
        <Text className="text-xs font-semibold text-muted-foreground">{comment.by ?? '[deleted]'}</Text>
        <Text className="text-xs text-muted-foreground">
          {formatTime({ timestamp: comment.time })}
        </Text>
      </View>
      {expanded && text ? (
        <Text className="text-sm leading-relaxed text-foreground" selectable>
          {text}
        </Text>
      ) : null}
    </View>
  );
};
