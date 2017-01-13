/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License; v. 2.0. If a copy of the MPL was not distributed with this
 * file; You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1; 2017
 */

import { Moment } from 'moment';

export interface Tweet {
  id: string;
  text: string;
  createdTime: Moment;
  type: string;
  favorite_count: number;
  retweet_count: number;
  user: User;
  media?: TwitterMedia;
}

interface TwitterMedia {
  id: string;
  media_url_https: string;
  type: string;
}

interface User {
  id: number;
  name: string;
  screen_name: string;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  favourites_count: number;
  statuses_count: number;
  lang: string;
}
