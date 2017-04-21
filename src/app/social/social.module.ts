/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { NgModule } from '@angular/core';

import { SocialRoutingModule } from './social-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SocialComponent } from './social/social.component';
import { TileSocialComponent } from './tile-social/tile-social.component';
import { FbPostComponent } from './fb-post/fb-post.component';
import { TweetComponent } from './tweet/tweet.component';

import { SocialService } from './social.service';
import {TwitterService} from './twitter.service';
import {MediaService} from './media.service';

@NgModule({
    imports: [ SharedModule, SocialRoutingModule ],
    declarations: [ SocialComponent, TileSocialComponent, FbPostComponent, TweetComponent ],
    providers: [ SocialService, TwitterService, MediaService ],
    exports: [ TileSocialComponent, FbPostComponent, TweetComponent ]
})
export class SocialModule {}
