/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

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
