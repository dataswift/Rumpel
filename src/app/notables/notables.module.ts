import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NotablesRoutingModule } from './notables-routing.module';
import { SharedModule } from '../shared/shared.module';

import { TileNotablesComponent } from './tile-notables/tile-notables.component';
import { NotablesViewComponent } from './notables-view/notables-view.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { NotablesMdEditorComponent } from './notables-md-editor/notables-md-editor.component';
import { ShareBeltComponent } from './share-belt/share-belt.component';

import { NotablesService } from './notables.service';

@NgModule({
  imports: [ SharedModule, FormsModule, NotablesRoutingModule ],
  declarations: [ TileNotablesComponent, InputBoxComponent, NotablesViewComponent, NotablesMdEditorComponent, ShareBeltComponent ],
  providers: [ NotablesService ],
  exports: [ TileNotablesComponent ]
})
export class NotablesModule {}
