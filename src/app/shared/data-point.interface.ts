import { Event } from './event.interface';
import { Image } from './image.interface';
import { Location } from './interfaces';
import { Post } from './post.interface';

export interface DataPoint {
  timestamp: any;
  type: string;
  source: string;
  location?: Location;
  content?: Event | Image | Post;
}