import { Stack } from 'expo-router';

export default function ShowStack() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true, headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ title: 'Show HN' }} />
    </Stack>
  );
}
