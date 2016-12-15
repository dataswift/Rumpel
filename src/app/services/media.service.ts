import { Injectable } from '@angular/core';
import {HatApiService} from "./hat-api.service";

import { MusicListen } from "../shared/interfaces/music-listen.interface";
import * as moment from 'moment';
import {BaseDataService} from "./base-data.service";

@Injectable()
export class MediaService extends BaseDataService<MusicListen> {

  constructor(private _hat: HatApiService) {
    super(_hat);

    this.ensureTableExists('music_listens', 'facebook');
  }

  mapData(rawMusicListen: any): MusicListen {
    let musicListen: MusicListen = {
      id: rawMusicListen.data.music_listens.id,
      type: rawMusicListen.data.music_listens.type,
      createdTime: moment(rawMusicListen.data.music_listens.start_time),
      start_time: moment(rawMusicListen.data.music_listens.start_time),
      end_time: moment(rawMusicListen.data.music_listens.end_time),
      data: {
        song: {
          title: rawMusicListen.data.music_listens.data.song.title,
          type: rawMusicListen.data.music_listens.data.song.type,
          url: rawMusicListen.data.music_listens.data.song.url
        }
      }
    };

    if (rawMusicListen.data.music_listens.data.playlist) {
      musicListen.data['playlist'] = {
        title: rawMusicListen.data.music_listens.data.playlist.title,
        type: rawMusicListen.data.music_listens.data.playlist.type,
        url: rawMusicListen.data.music_listens.data.playlist.url
      }
    }

    if (rawMusicListen.data.music_listens.data.musician) {
      musicListen.data['musician'] = {
        title: rawMusicListen.data.music_listens.data.musician.title,
        type: rawMusicListen.data.music_listens.data.musician.type,
        url: rawMusicListen.data.music_listens.data.musician.url
      }
    }

    return musicListen;
  }

}
