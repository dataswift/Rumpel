import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { routing } from './photos.routing';
import { SharedModule } from '../shared/shared.module';

import { PhotosComponent } from './photos/photos.component';

import { PhotosService } from './photos.service';

@NgModule({
    imports: [ SharedModule, FormsModule, routing ],
    declarations: [ PhotosComponent ],
    providers: [ PhotosService ]
})
export class PhotosModule {}