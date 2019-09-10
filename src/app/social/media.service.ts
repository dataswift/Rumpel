/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { Injectable } from '@angular/core';
import { HatApiService } from '../core/services/hat-api.service';
import { BaseDataService } from '../services/base-data.service';
import { AuthService } from '../core/services/auth.service';

import { MusicListen } from '../shared/interfaces/music-listen.interface';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import * as moment from 'moment';

@Injectable()
export class MediaService extends BaseDataService<MusicListen> {

  constructor(hat: HatApiService, authSvc: AuthService) {
    super(hat, authSvc, 'facebook', 'music_listens', 'changeme');
  }

  coerceType(rawMusicListen: HatRecord<any>): HatRecord<MusicListen> {
    const musicListen: MusicListen = {
      id: rawMusicListen.data.id,
      type: rawMusicListen.data.type,
      createdTime: moment(rawMusicListen.data.start_time),
      start_time: moment(rawMusicListen.data.start_time),
      end_time: moment(rawMusicListen.data.end_time),
      data: {
        song: {
          title: rawMusicListen.data.data.song.title,
          type: rawMusicListen.data.data.song.type,
          url: rawMusicListen.data.data.song.url
        }
      }
    };

    if (rawMusicListen.data.data.playlist) {
      musicListen.data['playlist'] = {
        title: rawMusicListen.data.data.playlist.title,
        type: rawMusicListen.data.data.playlist.type,
        url: rawMusicListen.data.data.playlist.url
      };
    }

    if (rawMusicListen.data.data.musician) {
      musicListen.data['musician'] = {
        title: rawMusicListen.data.data.musician.title,
        type: rawMusicListen.data.data.musician.type,
        url: rawMusicListen.data.data.musician.url
      };
    }

    return {
      endpoint: rawMusicListen.endpoint,
      recordId: rawMusicListen.recordId,
      data: musicListen
    };
  }

}
