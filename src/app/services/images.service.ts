import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { Image } from '../shared/index';
import * as moment from 'moment';

@Injectable()
export class ImagesService {
  images$: Observable<any>;
  private _imagesObserver: Observer<any>;
  private _dataLoaded: boolean;
  private _store: { images: Array<Image> };

  constructor(private _http: Http) {
    this._dataLoaded = false;
    this._store = { images: [] };
    this.images$ = new Observable(observer => this._imagesObserver = observer).share();
  }

  loadAll() {
    if (this._dataLoaded) return this._imagesObserver.next(this._store.images);

    this._http.get('/mock-data/photos.json').map(res => res.json())
      .map((data: Array<any>) => {
        const newImages: Array<Image> = data.map((image) => {
          let newImage: Image = {
            source: image.path,
            timestamp: moment(image.lastUpdated)
          };

          if (image.location) {
            newImage.location = {
              latitude: image.location.latitude,
              longitude: image.location.longitude,
              accuracy: null,
              timestamp: moment(image.lastUpdated)
            };
          }
          return newImage;
        });
        return newImages;
      })
      .subscribe(data => {
        this._dataLoaded = true;
        this._store.images = data;
        this._imagesObserver.next(this._store.images);
      }, err => console.log('There was an error loading images from HAT', err));
  }
}
