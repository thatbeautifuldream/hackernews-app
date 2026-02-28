import { Text, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';

export type TErrorMessageProps = {
  message?: string;
  onRetry?: () => void;
};

export const ErrorMessage = ({ message = 'Something went wrong', onRetry }: TErrorMessageProps) => {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <View className="items-center gap-4">
        <Text className="text-center text-lg font-semibold text-destructive">{message}</Text>
        {onRetry && (
          <Button onPress={onRetry} variant="outline" size="lg">
            <Icon as={RefreshCwIcon} size={16} className="mr-2" />
            <Text>Retry</Text>
          </Button>
        )}
      </View>
    </View>
  );
};
