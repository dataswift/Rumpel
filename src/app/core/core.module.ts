/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LocationsModule } from '../locations/locations.module';

import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { NotificationCentreComponent } from './notification-centre/notification-centre.component';

import { DialogAnchorDirective } from './dialog-anchor.directive';
import { DialogService } from './dialog.service';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MarkdownToHtmlPipe} from '../shared/pipes/markdown-to-html.pipe';

import { DataOfferService } from '../offers/data-offer.service';
import { PrivateSpaceComponent } from './private-space/private-space.component';
import { ProfilesModule } from '../profiles/profiles.module';


@NgModule({
  imports: [ SharedModule, LocationsModule, ProfilesModule ],
  declarations: [ HeaderComponent,
                  SideMenuComponent,
                  FooterComponent,
                  AboutComponent,
                  NotificationCentreComponent,
                  DialogBoxComponent,
                  ConfirmBoxComponent,
                  InfoBoxComponent,
                  FileUploadComponent,
                  DialogAnchorDirective,
                  MapBoxComponent,
                  PrivateSpaceComponent
  ],
  exports: [ HeaderComponent,
            SideMenuComponent,
            FooterComponent,
            DialogAnchorDirective ],
  providers: [ DialogService, MarkdownToHtmlPipe, DataOfferService ]
})
export class CoreModule {}
