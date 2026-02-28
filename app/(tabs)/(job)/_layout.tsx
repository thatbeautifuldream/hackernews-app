import { Stack } from 'expo-router';

export default function JobStack() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true, headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ title: 'Jobs' }} />
    </Stack>
  );
}
