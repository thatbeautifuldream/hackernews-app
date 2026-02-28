import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { queryClient } from '@/lib/query-client-instance';
import { onAppStateChange, useAppState } from '@/lib/query-client';

// Remove any stale useInfiniteQuery cache that might have been stored under the
// old ['stories', 'list', *] key before the migration to useQuery + in-memory
// pagination. Called at module level so it runs before any component renders.
queryClient.removeQueries({ queryKey: ['stories', 'list'] });

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  useAppState(onAppStateChange);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="story/[id]"
            options={{ title: 'Story', headerBackButtonDisplayMode: 'minimal' }}
          />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
