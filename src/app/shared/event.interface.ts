import { Location } from './location.interface';

export interface Event {
  title: string;
  startTime: any;
  endTime: any;
  location?: Location;
}