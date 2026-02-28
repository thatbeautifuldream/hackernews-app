export type THNItemType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';

export type THNItem = {
  id: number;
  deleted?: boolean;
  type: THNItemType;
  by?: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
};

export type THNUser = {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
};

export type TStoryType = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job';

export type TStoryIdsResponse = number[];

export type TUpdatesResponse = {
  items: number[];
  profiles: string[];
};
