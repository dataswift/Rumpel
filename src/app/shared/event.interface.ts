import { Location } from './location.interface';

export interface Event {
  title: string;
  start: any;
  end: any;
  location?: Location;
}