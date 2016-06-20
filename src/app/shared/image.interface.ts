import { Location } from './location.interface';

export interface Image {
  source: string;
  start: any;
  end?: any;
  location?: Location
}