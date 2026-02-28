import { Stack } from 'expo-router';

export default function BestStack() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true, headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ title: 'Best Stories' }} />
    </Stack>
  );
}
