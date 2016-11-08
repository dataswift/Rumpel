import { NgModule } from '@angular/core';

import { SocialRoutingModule } from './social-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SocialComponent } from './social/social.component';
import { TileSocialComponent } from './tile-social/tile-social.component';
import { FbPostComponent } from './fb-post/fb-post.component';

import { SocialService } from './social.service';

@NgModule({
    imports: [ SharedModule, SocialRoutingModule ],
    declarations: [ SocialComponent, TileSocialComponent, FbPostComponent ],
    providers: [ SocialService ],
    exports: [ TileSocialComponent, FbPostComponent ]
})
export class SocialModule {}
