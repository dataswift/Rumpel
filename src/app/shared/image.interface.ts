import { Location } from './location.interface';

export interface Image {
  source: string;
  url: any;
  start: any;
  end?: any;
  location?: Location
}