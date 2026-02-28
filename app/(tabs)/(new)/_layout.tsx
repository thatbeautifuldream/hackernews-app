import { Stack } from 'expo-router';

export default function NewStack() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true, headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ title: 'New Stories' }} />
    </Stack>
  );
}
