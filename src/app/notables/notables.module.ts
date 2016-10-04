import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { TileNotablesComponent } from './tile-notables/tile-notables.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { NotablesService } from './notables.service';

@NgModule({
  imports: [ SharedModule, FormsModule ],
  declarations: [ TileNotablesComponent, InputBoxComponent ],
  providers: [ NotablesService ],
  exports: [ TileNotablesComponent ]
})
export class NotablesModule {}
