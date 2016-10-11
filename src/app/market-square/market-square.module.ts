import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { TileDataOffersComponent } from './tile-data-offers/tile-data-offers.component';
import { TileDataPlugsComponent } from './tile-data-plugs/tile-data-plugs.component';

import { MarketSquareService } from './market-square.service';

@NgModule({
    imports: [ SharedModule ],
    declarations: [ TileDataOffersComponent, TileDataPlugsComponent ],
    providers: [ MarketSquareService ],
    exports: [ TileDataOffersComponent, TileDataPlugsComponent ]
})
export class MarketSquareModule {}
