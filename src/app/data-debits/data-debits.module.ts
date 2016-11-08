import { NgModule } from '@angular/core';

import { DataDebitsRoutingModule } from './data-debits.routing';
import { SharedModule } from '../shared/shared.module';

import { DataDebitConfirmComponent } from './data-debit-confirm/data-debit-confirm.component';
import { TileDataDebitComponent } from './tile-data-debit/tile-data-debit.component';

import { DataDebitService } from './data-debits.service';

@NgModule({
    imports: [ SharedModule, DataDebitsRoutingModule ],
    declarations: [ DataDebitConfirmComponent, TileDataDebitComponent ],
    providers: [ DataDebitService ],
    exports: [ TileDataDebitComponent ]
})
export class DataDebitsModule {}
