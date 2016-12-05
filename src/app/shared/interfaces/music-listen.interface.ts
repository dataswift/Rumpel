import { Moment } from 'moment';

export interface MusicListen {
  id: string;
  type: string;
  createdTime: Moment;
  start_time: Moment;
  end_time: Moment;
  data: {
    song: Song;
    musician?: Musician;
    playlist?: Playlist;
  };
}

interface Song {
  title: string;
  type: string;
  url: string;
}

interface Playlist {
  title: string;
  type: string;
  url: string;
}

interface Musician {
  title: string;
  type: string;
  url: string;
}
