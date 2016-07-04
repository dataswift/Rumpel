import { Location } from './location.interface';

export interface Event {
  title: string;
  description?: string;
  start: any;
  end?: any;
  source: string;
  location?: Location;
}