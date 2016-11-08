import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PhotosRoutingModule } from './photos-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PhotosComponent } from './photos/photos.component';

import { PhotosService } from './photos.service';

@NgModule({
    imports: [ SharedModule, FormsModule, PhotosRoutingModule ],
    declarations: [ PhotosComponent ],
    providers: [ PhotosService ]
})
export class PhotosModule {}