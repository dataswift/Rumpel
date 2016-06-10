import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

interface Location {
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface HatData {
  title: string;
  type: string;
  message: string;
  start: Date;
  end: Date;
  location: Location;
  photoLink: URL;
}

@Injectable()
export class DataService {
  private hatData: Array<HatData> = [];
  public updated$: EventEmitter<any>;

  constructor(private _http: Http) {
    this.updated$ = new EventEmitter();
  }

  getEvents() {
    return this._http.get('/mock-data/events.json')
      .map(res => res.json())
      .map((data: Array<any>) => {
        const newEvents: Array<HatData> = data.map((event) => {
          return {
            title: event.title,
            type: 'event',
            message: null,
            start: new Date(event.start),
            end: new Date(event.end),
            location: { title: null, address: null, longitude: null, latitude: null },
            photoLink: null
          }
        });
        return newEvents;
      });
  }

  getLocations() {
    return this._http.get('/mock-data/locations.json')
      .map(res => res.json().locations)
      .map((data: Array<any>) => {
        const newLocations: Array<HatData> = data.map((location) => {
          return {
            title: null,
            type: 'location',
            message: null,
            start: new Date(parseInt(location.timestampMs)),
            end: null,
            location: {
              title: null,
              address: null,
              latitude: location.latitudeE7,
              longitude: location.longitudeE7
            },
            photoLink: null
          }
        });
        return newLocations;
      });
  }

  getPhotos() {
    return this._http.get('/mock-data/photos.json')
      .map(res => res.json())
      .map((data: Array<any>) => {
        const newPhotos: Array<HatData> = data.map((photo) => {
          return {
            title: null,
            type: 'photo',
            message: null,
            start: new Date(photo.lastUpdated),
            end: null,
            location: {
              title: null,
              address: null,
              latitude: photo.location ? photo.location.latitude : null,
              longitude: photo.location ? photo.location.longitude : null
            },
            photoLink: photo.path
          }
        });
        return newPhotos;
      });
  }

  getData() {
    this.getEvents().subscribe(
      data => {
        console.log('Got events, all ' + data.length + ' of them.');
        this.hatData = this.hatData.concat(data);
        this.updated$.emit(data);
        console.log(this.hatData);
      },
      err => console.log('Could not retrieve events.')
    );

    this.getLocations().subscribe(
      data => {
        console.log('Got locations, all ' + data.length + ' of them.');
        this.hatData = this.hatData.concat(data);
        this.updated$.emit(data);
        console.log(this.hatData);
      },
      err => console.log('Could not retrieve locations.', err)
    );

    this.getPhotos().subscribe(
      data => {
        console.log('Got photos, all ' + data.length + ' of them.');
        this.hatData = this.hatData.concat(data);
        this.updated$.emit(data);
        console.log(this.hatData);
      },
      err => console.log('Could not retrieve photos.', err)
    );
  }
}
