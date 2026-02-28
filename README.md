# Hacker News App

A modern Hacker News reader built with React Native, Expo, and TanStack Query.

## Features

- **Multiple Story Categories**: Browse Top, New, Best, Ask, Show, and Job stories
- **Infinite Scrolling**: Seamlessly load more stories as you scroll
- **Story Details**: View full story details with nested comments
- **Pull to Refresh**: Refresh story lists with pull-to-refresh
- **Offline Support**: Caching for offline viewing
- **Dark Mode**: Full dark mode support
- **Type-Safe**: Built with TypeScript using `type` declarations (not `interface`)

## Tech Stack

- **Framework**: React Native 0.81.5 with Expo 54
- **Navigation**: Expo Router (file-based routing)
- **Data Fetching**: TanStack Query v5
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **API**: HackerNews Firebase API
- **Language**: TypeScript (all types prefixed with `T`)

## Type Convention

This project follows a strict type convention:
- All types use `type` (not `interface`)
- All types are prefixed with `T`
- Examples:
  - `THNItem` - HackerNews item type
  - `THNUser` - HackerNews user type
  - `TStoryType` - Story category type
  - `TUseStoriesParams` - Hook parameter type
  - `TStoryItemProps` - Component props type

## Project Structure

```
hackernews-app/
├── app/                        # Expo Router pages
│   ├── _layout.tsx             # Root layout with QueryClientProvider
│   ├── (tabs)/                 # Tab navigation
│   │   ├── _layout.tsx         # Tab bar configuration
│   │   ├── top.tsx             # Top stories
│   │   ├── new.tsx             # New stories
│   │   ├── best.tsx            # Best stories
│   │   ├── ask.tsx             # Ask HN stories
│   │   ├── show.tsx            # Show HN stories
│   │   └── jobs.tsx           # Job stories
│   └── story/
│       └── [id].tsx           # Story detail with comments
├── components/                 # Reusable components
│   ├── StoryItem.tsx           # Story list item
│   ├── Comment.tsx             # Comment component with expand/collapse
│   ├── StoryItemSkeleton.tsx    # Loading skeleton
│   ├── ErrorMessage.tsx         # Error display
│   └── StoriesScreen.tsx       # Stories list screen
├── hooks/                      # TanStack Query hooks
│   ├── useStories.ts           # Infinite query for stories
│   ├── useStory.ts            # Single story query
│   ├── useComments.ts         # Comments batch query
│   └── useUser.ts             # User profile query
├── lib/
│   ├── api/
│   │   ├── hackernews.ts      # API functions
│   │   └── queryKeys.ts      # Query key factory
│   ├── query-client.ts        # Query client configuration
│   ├── query-client-instance.ts # Query client instance
│   └── utils/
│       ├── date.ts            # Date formatting utilities
│       └── number.ts          # Number formatting utilities
└── types/
    └── hackernews.ts         # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or bun
- Expo Go app (for mobile) or web browser

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Then:
- Press `w` to open in web browser
- Press `a` to open Android emulator
- Press `i` to open iOS simulator

### Build for Production

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## Key Implementation Details

### TanStack Query Setup

The app uses a configured QueryClient with optimal defaults:
- `staleTime: 5 minutes` - Data is fresh for 5 min
- `gcTime: 30 minutes` - Cache kept for 30 min
- `retry: 3` with exponential backoff - Failed requests retry
- Online/Offline detection with NetInfo
- App state awareness for refetching

### Infinite Scrolling

Stories are loaded in batches (20 per page) using `useInfiniteQuery`:
- Automatically loads next page when scrolling
- Maintains scroll position
- Deduplicates identical queries

### Query Keys

Hierarchical query keys for cache management:
```typescript
['stories', 'list', 'top']      // Top stories list
['item', 12345]                  // Specific story
['user', 'pg']                    // User profile
```

### Type Safety

Full TypeScript coverage with custom types:
- `THNItem` - All HackerNews items (stories, comments, jobs, polls)
- `THNUser` - User profiles
- `TStoryType` - Story categories
- All hook parameters and returns typed

## API Integration

Uses the official HackerNews Firebase API:
- **Base URL**: `https://hacker-news.firebaseio.com/v0`
- **Endpoints**:
  - `/topstories` - Top 500 stories
  - `/newstories` - Newest 500 stories
  - `/beststories` - Best stories
  - `/askstories` - Ask HN stories
  - `/showstories` - Show HN stories
  - `/jobstories` - Job stories
  - `/item/{id}` - Story/comment details
  - `/user/{id}` - User profile

## Performance Optimizations

1. **Request Batching**: Fetch multiple items in parallel using `useQueries`
2. **Memoization**: Components use `React.memo` for expensive renders
3. **Virtualization**: FlatList for efficient large list rendering
4. **Cache Strategies**: Optimal staleTime and gcTime settings
5. **Lazy Loading**: Comments loaded only when story is opened
6. **Prefetching**: Story details prefetched when needed

## Future Enhancements

- [ ] Search functionality (Algolia HN API)
- [ ] User profile pages
- [ ] Bookmark/favorite stories
- [ ] Comment threading improvements
- [ ] Story filtering and sorting options
- [ ] Notifications for top stories
- [ ] Analytics integration

## License

MIT
