import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MarketSquareService } from '../market-square.service';

@Component({
  selector: 'rump-tile-data-offers',
  templateUrl: 'tile-data-offers.component.html',
  styleUrls: ['tile-data-offers.component.scss']
})
export class TileDataOffersComponent implements OnInit {
  public offers: any;
  @Output() navigateModal = new EventEmitter<any>();

  constructor(private market: MarketSquareService) {}

  ngOnInit() {
    this.market.getOffer().subscribe(offers => this.offers = offers);
  }

}
