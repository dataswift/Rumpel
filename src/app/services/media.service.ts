import { Injectable } from '@angular/core';
import {HatApiService} from "./hat-api.service";
import {Subject, Observable} from "rxjs";
import { uniqBy } from 'lodash';
import { MusicListen } from "../shared/interfaces/music-listen.interface";
import * as moment from 'moment';

@Injectable()
export class MediaService {
  private _musicListens$: Subject<MusicListen[]> = <Subject<MusicListen[]>>new Subject();
  private store: { musicListens: MusicListen[]; tableId: number; };

  constructor(private hat: HatApiService) {
    this.store = {
      musicListens: [],
      tableId: null
    };

    this.verifyTable();
  }

  get musicListens$(): Observable<MusicListen[]> {
    return this._musicListens$.asObservable();
  }

  getRecentMusicListens(failedAttempts: number = 0): void {
    if (this.store.musicListens.length > 0) {
      this.pushToStream();
    } else if (this.store.tableId) {
      this.hat.getValuesWithLimit(this.store.tableId)
        .map((rawMusicListens: any[]) => {
          let rumpMusicListens = rawMusicListens.map(this.musicMap);
          return uniqBy(rumpMusicListens, "id");
        })
        .subscribe((musicListens: MusicListen[]) => {
          this.store.musicListens = musicListens;

          this.pushToStream();
        });
    } else if (failedAttempts <= 10) {
      Observable.timer(75).subscribe(() => this.getRecentMusicListens(++failedAttempts))
    }
  }

  musicMap(rawMusicListen: any): MusicListen {
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

  private verifyTable(): void {
    this.hat.getTable('music_listens', 'facebook')
      .subscribe(table => {
        if (table === "Not Found") {
          console.log("Music Listens table does not exist.")
        } else {
          this.store.tableId = table.id;
        }
      });
  }

  private pushToStream() {
    return this._musicListens$.next(this.store.musicListens);
  }
}
