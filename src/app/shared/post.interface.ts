import { Location } from './location.interface';

export interface Post {
  title: string;
  body: string;
  type: string;
  image: string;
  privacy: string;
  start: any;
  end?: any;
  location?: Location;
  source: string;
}