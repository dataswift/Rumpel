import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { HatApiService } from '../services/hat-api.service';
import * as moment from 'moment';
import * as PouchDB from 'pouchdb';
import { Photo } from "../shared/interfaces/index";

@Injectable()
export class PhotosService {
  private _photos$:Subject<Photo[]>;
  private tableVerified:boolean;
  private failedAttempts:number;
  private _authBearer:string;
  private _tableId$:Subject<number>;
  private _store: { photos: Array<Photo>; sourcelessPhotos: Array<Photo>; tableId: number; };
  private photoDb: any;

  constructor(private _hat:HatApiService,
              private sanitizer:DomSanitizer,
              private http:Http) {
    this._store = { photos: [], sourcelessPhotos: [], tableId: null };
    this.photoDb = new PouchDB('dropboxPhotos');

    this._photos$ = <Subject<Photo[]>> new Subject();
    this._tableId$ = <Subject<number>> new Subject();

    this._authBearer = '';
    this.tableVerified = false;
    this.failedAttempts = 0;

    this.verifyTable();
  }

  get photos$() {
    return this._photos$.asObservable();
  }

  private get tableId$() {
    return this._tableId$.asObservable();
  }

  getRecentPhotos():void {
    this.publishPhotos();
    this.tableId$
      .flatMap(tableId => this._hat.getValuesWithLimit(tableId))
      .map(photoData => photoData.map(this.imgMap))
      .map(sourcelessPhotos => sourcelessPhotos.sort((a, b) => a.timestamp.isAfter(b.timestamp) ? -1 : 1))
      .subscribe(sourcelessPhotos => {
        this._store.sourcelessPhotos = sourcelessPhotos;
        this.loadDropboxAccessToken()
          .forEach(token => console.log("Loaded Dropbox token"))
          .then(() => {
            this.loadPhotoSources();
          });
      });
  }

  private loadPhotoSources():void {
    let photo = this._store.sourcelessPhotos.shift();

    this.photoDb.get(photo.path, {attachments: true})
      .then(savedPhoto => {
        photo.src = this.sanitizer.bypassSecurityTrustUrl("data: image/jpg;base64," + savedPhoto._attachments[photo.path].data);
        this._store.photos.push(photo);
        this.publishPhotos();
      }, () => {
        this.downloadPhotoData(photo, "w640h480").subscribe(srcArrayBuffer => {
          let base64String = this.base64ArrayBuffer(srcArrayBuffer);

          this.photoDb.putAttachment(photo.path, photo.path, base64String, 'image/jpg').then(() => {
            photo.src = this.sanitizer.bypassSecurityTrustUrl("data: image/jpg;base64," + base64String);
            this._store.photos.push(photo);
            this.publishPhotos();
          });
        });
      });

    if (this._store.sourcelessPhotos.length > 0) {
      this.loadPhotoSources();
    }
  }

  private imgMap(image):Photo {
    let photo:Photo = {
      name: image.data.photos.name.substring(0, image.data.photos.name.lastIndexOf(".")),
      kind: image.data.photos.name.substring(image.data.photos.name.lastIndexOf(".") + 1),
      path: image.data.photos.path_lower,
      displayPath: image.data.photos.path_display.substring(0, image.data.photos.path_display.lastIndexOf("/") + 1),
      size: image.data.photos.size,
      timestamp: null
    };

    if (image.data.photos.media_info && image.data.photos.media_info.metadata.time_taken) {
      photo['timestamp'] = moment(image.data.photos.media_info.metadata.time_taken);
    } else {
      photo['timestamp'] = moment(image.data.photos.client_modified);
    }

    return photo;
  }

  private loadDropboxAccessToken():Observable<string> {
    if (this._authBearer) {
      return Observable.of(this._authBearer);
    } else {
      return this._hat.getAllValuesOf('metadata', 'dropbox_data_plug')
        .map(metadataRecords => {
          if (metadataRecords.length > 0) {
            this._authBearer = "Bearer " + metadataRecords[0]['access_token'];
            return this._authBearer;
          }
        });
    }
  }

  private downloadPhotoData(photo:Photo, size:string = 'w128h128'):Observable<ArrayBuffer> {
    let url = 'https://content.dropboxapi.com/2/files/get_thumbnail';
    let headers = new Headers();
    headers.append('Authorization', this._authBearer);
    headers.append('Dropbox-API-Arg', `{"path":"${photo.path}","size":{".tag":"${size}"}}`);

    return this.http.get(url, {headers: headers, responseType: ResponseContentType.ArrayBuffer})
      .map(res => res.arrayBuffer());
  }

  private verifyTable():void {
    if (this._store.tableId) {
      this._tableId$.next(this._store.tableId);
    } else {
      this._hat.getTable('photos', 'dropbox').subscribe(table => {
        if (table === "Not Found") {
          this.tableVerified = false;
        } else if (table.id) {
          this._store.tableId = table.id;
          this.tableVerified = true;
          this._tableId$.next(this._store.tableId);
        }
      });
    }

  }

  private publishPhotos():void {
    return this._photos$.next(this._store.photos);
  }

  private base64ArrayBuffer(arrayBuffer):string {
    var base64 = '';
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    var bytes = new Uint8Array(arrayBuffer);
    var byteLength = bytes.byteLength;
    var byteRemainder = byteLength % 3;
    var mainLength = byteLength - byteRemainder;

    var a, b, c, d;
    var chunk;

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
      d = chunk & 63; // 63       = 2^6 - 1

      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
      chunk = bytes[mainLength];

      a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

      // Set the 4 least significant bits to zero
      b = (chunk & 3) << 4; // 3   = 2^2 - 1

      base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

      a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

      // Set the 2 least significant bits to zero
      c = (chunk & 15) << 2; // 15    = 2^4 - 1

      base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64;
  }
}
