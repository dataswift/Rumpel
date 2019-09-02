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

import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { Post } from '../shared/interfaces';
import * as moment from 'moment';

@Injectable()
export class SocialService extends BaseDataService<Post> {
  constructor(hat: HatApiService, authSvc: AuthService) {
    super(hat, authSvc, 'facebook', 'feed', 'updated_time');
  }

  coerceType(rawPost: HatRecord<any>): HatRecord<Post> {
    const posts = rawPost.data.posts || rawPost.data;
    let postContent;

    switch (posts.type) {
      case 'link':
        postContent = {
          caption: posts.caption,
          description: posts.description,
          link: posts.link,
          name: posts.name,
          picture: posts.picture,
          fullPicture: posts.full_picture
        };
        break;
      case 'status':
        postContent = {
          message: posts.message
        };
        break;
      case 'photo':
        postContent = {
          name: posts.name,
          message: posts.message,
          picture: posts.picture,
          fullPicture: posts.full_picture
        };
        break;
      default:
        postContent = null;
        break;
    }

    return {
      endpoint: rawPost.endpoint,
      recordId: rawPost.recordId,
      data: {
        id: posts.id,
        createdTime: moment(posts.created_time),
        updatedTime: moment(posts.updated_time),
        statusType: posts.status_type,
        type: posts.type,
        privacy: {
          value: posts.privacy.value,
          description: posts.privacy.description
        },
        from: !!posts.from ? posts.from.name : null,
        application: !!posts.application ? posts.application.name : null,
        story: posts.story,
        content: postContent
      }
    };
  }
}
