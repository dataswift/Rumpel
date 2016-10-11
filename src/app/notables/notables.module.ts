import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { routing } from './notables.routing';
import { SharedModule } from '../shared/shared.module';

import { TileNotablesComponent } from './tile-notables/tile-notables.component';
import { NotablesViewComponent } from './notables-view/notables-view.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { NotablesMdEditorComponent } from './notables-md-editor/notables-md-editor.component';

import { NotablesService } from './notables.service';

@NgModule({
  imports: [ SharedModule, FormsModule, routing ],
  declarations: [ TileNotablesComponent, InputBoxComponent, NotablesViewComponent, NotablesMdEditorComponent ],
  providers: [ NotablesService ],
  exports: [ TileNotablesComponent ]
})
export class NotablesModule {}
