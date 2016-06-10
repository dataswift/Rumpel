import { Location } from './location.interface';

export interface Image {
  source: string;
  timestamp: Date;
  location?: Location
}