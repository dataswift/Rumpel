import { Location } from './location.interface';

export interface Event {
  title: string;
  startTime: Date;
  endTime: Date;
  location?: Location;
}