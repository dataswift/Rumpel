import { Location } from './location.interface';

export interface Note {
  message: string;
  created_time: any;
  updated_time: any;
  public_until?: any;
  private: boolean;
  location?: Location;
  photo?: { link: string; source: string; caption: string }
}