import { Event } from './event.interface';
import { Image } from './image.interface';

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  start: any;
  end?: any;
  meta?: any;
}