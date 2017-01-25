/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import { HatApiService } from '../services/hat-api.service';
import { Post } from '../shared/interfaces';
import * as moment from 'moment';
import {BaseDataService} from "../services/base-data.service";
import {UiStateService} from "../services/ui-state.service";

@Injectable()
export class SocialService extends BaseDataService<Post> {
  constructor(hatSvc: HatApiService, uiSvc: UiStateService) {
    super(hatSvc, uiSvc);

    this.ensureTableExists("posts", "facebook");
  }

  mapData(rawPost: any): Post {
    const posts = rawPost.data.posts;
    let postContent;

    switch (posts.type) {
      case "link":
        postContent = {
          caption: posts.caption,
          description: posts.description,
          link: posts.link,
          name: posts.name,
          picture: posts.picture,
          fullPicture: posts.full_picture
        };
        break;
      case "status":
        postContent = {
          message: posts.message
        };
        break;
      case "photo":
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
    };
  }
}
