import { Event } from './event.interface';
import { Image } from './image.interface';
import { Location } from './location.interface';
import { Post } from './post.interface';

export interface DataPoint {
  timestamp: any;
  type: string;
  source: string;
  location?: Location;
  content?: Event | Image | Post;
}