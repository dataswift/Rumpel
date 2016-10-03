import { Location } from './location.interface';

export interface Notable {
  message: string;
  created_time: any;
  updated_time: any;
  public_until?: any;
  shared: Array<string>;
  location?: Location;
  photo?: { link: string; source: string; caption: string }
}