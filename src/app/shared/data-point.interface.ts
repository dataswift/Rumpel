import { Event } from './interfaces/event.interface';
import { Location } from './interfaces';
import { Post } from './interfaces/post.interface';

export interface DataPoint {
  timestamp: any;
  type: string;
  source: string;
  location?: Location;
  content?: Event | Post;
}