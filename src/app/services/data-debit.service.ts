import { Injectable } from '@angular/core';
import { HatApiService, MarketSquareService } from './';
import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class DataDebitService {

  constructor(private _hatSvc: HatApiService,
              private _marketSvc: MarketSquareService) {}

  loadOffer(uuid: string): Observable<any> {
    return Observable.forkJoin(
      this._marketSvc.getOffer()
        .map((marketOffers: Array<any>) => marketOffers.find(offerItem => offerItem.offer.uuid === uuid))
    );
  }

  loadAllDataDebits() {
    return this._hatSvc.getAllDataDebits();
  }

}
