/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LocationsModule } from '../locations/locations.module';

import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AboutComponent } from './about/about.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { NotificationCentreComponent } from './notification-centre/notification-centre.component';

import { DialogAnchorDirective } from './dialog-anchor.directive';
import { DialogService } from './dialog.service';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MarkdownToHtmlPipe } from '../shared/pipes/markdown-to-html.pipe';

import { PrivateSpaceComponent } from './private-space/private-space.component';
import { ProfilesModule } from '../profiles/profiles.module';
import { CustomAngularMaterialModule } from './custom-angular-material.module';
import { HttpBackendClient } from './services/http-backend-client.service';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [ SharedModule, LocationsModule, ProfilesModule, CustomAngularMaterialModule ],
  declarations: [ HeaderComponent,
                  SideMenuComponent,
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
            DialogAnchorDirective ],
  providers: [ DialogService, MarkdownToHtmlPipe, HttpBackendClient, AuthService ]
})
export class CoreModule {}
