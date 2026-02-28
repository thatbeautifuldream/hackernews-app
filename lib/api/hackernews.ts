import type {
  THNItem,
  THNUser,
  TStoryIdsResponse,
  TUpdatesResponse,
  TStoryType,
} from '@/types/hackernews';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export type TFetchStoryIds = (storyType: TStoryType) => Promise<TStoryIdsResponse>;

// API returns null for items that don't exist or have been removed
export type TFetchItem = (id: number) => Promise<THNItem | null>;

export type TFetchUser = (id: string) => Promise<THNUser>;

export type TFetchMaxItemId = () => Promise<number>;

export type TFetchUpdates = () => Promise<TUpdatesResponse>;

export const STORY_TYPE_ENDPOINTS: Record<TStoryType, string> = {
  top: 'topstories',
  new: 'newstories',
  best: 'beststories',
  ask: 'askstories',
  show: 'showstories',
  job: 'jobstories',
};

export const fetchStoryIds: TFetchStoryIds = async (storyType) => {
  const endpoint = STORY_TYPE_ENDPOINTS[storyType];
  const response = await fetch(`${BASE_URL}/${endpoint}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${storyType} story IDs (${response.status})`);
  }
  const data = await response.json();
  // API returns an array of IDs; guard against unexpected null/non-array
  if (!Array.isArray(data)) {
    throw new Error(`Unexpected response for ${storyType} stories`);
  }
  return data;
};

export const fetchItem: TFetchItem = async (id) => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch item ${id} (${response.status})`);
  }
  // HN API returns literal `null` (200 OK) for non-existent/removed items
  return response.json();
};

export const fetchUser: TFetchUser = async (id) => {
  const response = await fetch(`${BASE_URL}/user/${id}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user ${id} (${response.status})`);
  }
  return response.json();
};

export const fetchMaxItemId: TFetchMaxItemId = async () => {
  const response = await fetch(`${BASE_URL}/maxitem.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch max item ID');
  }
  return response.json();
};

export const fetchUpdates: TFetchUpdates = async () => {
  const response = await fetch(`${BASE_URL}/updates.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch updates');
  }
  return response.json();
};
