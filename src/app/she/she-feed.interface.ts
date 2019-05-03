export interface DayGroupedSheFeed {
  day: string;
  data: SheFeed[];
}

export interface SheMapItem {
  source: string;
  timestamp: number;
  latitude: number;
  longitude: number;
  altitude?: number;
  speed?: number;
  content?: { title: string; body: string; };
}

export interface SheFeed {
  source: string;
  date: { iso: string; unix: number };
  types: string[];
  title?: SheTitle;
  content?: SheContent;
  location?: SheLocation;
}

interface SheTitle {
  text: string;
  subtitle?: string;
  action: string;
}

interface SheContent {
  text: string;
  media?: Array<{ url: string; }>;
  nestedStructure?: { [key: string]: SheNestedStructure[]; };
}

export interface SheNestedStructure {
  content: string;
  badge?: string;
  type?: string[];
}

interface SheLocation {
  geo?: { longitude: number; latitude: number; };
  address?: {
    name?: string;
    street?: string;
    city?: string;
    country?: string;
  };
  tags: string[];
}
