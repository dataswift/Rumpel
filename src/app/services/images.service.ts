import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';
import { DomSanitizationService } from '@angular/platform-browser';

import { HatApiService } from './hat-api.service';
import { DataPoint } from '../shared';
import * as moment from 'moment';

@Injectable()
export class ImagesService {
  dropbox$: Observable<any>;
  images$: Observable<any>;
  private _imagesObserver: Observer<any>;
  private _dropboxObserver: Observer<any>;
  private _authBearer: string;
  private _store: { images: Array<DataPoint> };

  constructor(private _http: Http,
              private _hat: HatApiService,
              private sanitizer: DomSanitizationService) {
    this._store = { images: [] };
    this.images$ = new Observable(observer => this._imagesObserver = observer).share();
    this.dropbox$ = new Observable(observer => this._dropboxObserver = observer).share();
  }

  loadAll() {
    if (this._store.images.length > 0) return Observable.of(this._store.images);

    Observable.forkJoin(
      this._hat.getAllValuesOf('photos', 'dropbox')
        .map(data => data.map(this.imgMap)),
      this._hat.getAllValuesOf('metadata', 'dropbox_data_plug')
    ).subscribe(responses => {
      this._store.images = responses[0];
      this._authBearer = "Bearer " + responses[1][0]['access_token'];
      this.downloadImages();
    }, err => console.log('There was an error loading images from HAT', err));

    return this.images$;
  }

  imgMap(image): DataPoint {
    return {
      timestamp: image.media_info.metadata.time_taken ? moment(image.media_info.metadata.time_taken) : moment(image.client_modified),
      type: 'photo',
      source: 'dropbox',
      content: {
        path: image.path_lower,
        content: null,
        timestamp: moment(image.media_info.metadata.time_taken)
      }
    };
  }

  downloadImages() {
    let boundDownload = this.downloadThumbnail.bind(this);
    this._store.images.forEach((image) => {
      boundDownload(image, 'w640h480');
    });
  }

  downloadThumbnail(image, size = "w128h128") {
    var dropboxApiArg = `{"path":"${image.content.path}","size":{".tag":"${size}"}}`;

    var xhr = new XMLHttpRequest()

    var decoder = this.base64ArrayBuffer.bind(this);
    var obs = this._imagesObserver;
    var san = this.sanitizer;

    xhr.open("GET", "https://content.dropboxapi.com/2/files/get_thumbnail", true); // method, url, async
    xhr.responseType = 'arraybuffer';
    xhr.setRequestHeader("Authorization", this._authBearer);
    xhr.setRequestHeader('Dropbox-API-Arg', dropboxApiArg);

    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4) {
        // Construct a response object similar to a regular $http call
        //
        // data – {string|Object} – The response body transformed with the transform functions.
        // status – {number} – HTTP status code of the response.
        // headers – {function([headerName])} – Header getter function.
        // config – {Object} – The configuration object that was used to generate the request.
        var r = {
          data: { path: image.source, content: 'data: image/jpg;base64,' + decoder(xhr.response) },
          status: xhr.status,
          headers: xhr.getResponseHeader,
          config: {}
        };

        image.content.content = san.bypassSecurityTrustUrl(r.data.content);
        obs.next([image]);
      }
    };

    // This is only available in XHR2, provide multipart fallback
    // if necessary
    xhr.send();

    return obs;
  }

  base64ArrayBuffer(arrayBuffer) {
    var base64 = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    var bytes = new Uint8Array(arrayBuffer)
    var byteLength = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength = byteLength - byteRemainder

    var a, b, c, d
    var chunk

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
      d = chunk & 63 // 63       = 2^6 - 1

      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
      chunk = bytes[mainLength]

      a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

      // Set the 4 least significant bits to zero
      b = (chunk & 3) << 4 // 3   = 2^2 - 1

      base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

      a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

      // Set the 2 least significant bits to zero
      c = (chunk & 15) << 2 // 15    = 2^4 - 1

      base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64
  }
}
