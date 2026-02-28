import { Stack } from 'expo-router';

export default function TopStack() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true, headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ title: 'Top Stories' }} />
    </Stack>
  );
}
