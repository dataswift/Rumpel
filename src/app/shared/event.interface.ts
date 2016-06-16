import { Location } from './location.interface';

export interface Event {
  title: string;
  timestamp: any;
  endTime: any;
  location?: Location;
}