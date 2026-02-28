import { Stack } from 'expo-router';

export default function AskStack() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true, headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ title: 'Ask HN' }} />
    </Stack>
  );
}
