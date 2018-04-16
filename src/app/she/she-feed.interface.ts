export interface SheFeed {
  source: string;
  date: { iso: string; unix: number };
  types: string[];
  title?: SheTitle;
  content: SheContent;
  location?: SheLocation;
}

interface SheTitle {
  text: string;
  action: string;
}

interface SheContent {
  text: string;
  media?: Array<{ url: string; }>;
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
