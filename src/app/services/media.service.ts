/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import {HatApiService} from "./hat-api.service";

import { MusicListen } from "../shared/interfaces/music-listen.interface";
import * as moment from 'moment';
import {BaseDataService} from "./base-data.service";
import {UserService} from "./user.service";

@Injectable()
export class MediaService extends BaseDataService<MusicListen> {

  constructor(hat: HatApiService,
              userSvc: UserService) {
    super(hat, userSvc);

    this.registerUser$Listener('music_listens', 'facebook');
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
