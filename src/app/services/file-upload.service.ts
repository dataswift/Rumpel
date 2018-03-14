import { HatApiService } from './hat-api.service';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from './auth-http.service';
import { APP_CONFIG, AppConfig } from '../app.config';

@Injectable()
export class FileUploadService extends HatApiService {

  constructor(@Inject(APP_CONFIG) private _config: AppConfig, private _authHttp: AuthHttp, private _http: Http) {
    super(_config, _authHttp, _http);
  }

  postFileUploadMetaData(file) {
    const url = `/api/v2/files/upload`;
    const body = JSON.stringify({
      name: file.name,
      source: 'userUpload'
    });
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    this._authHttp.post(url, body, { headers: headers }).subscribe( res => {
      this.uploadFileDirectly(res.json(), file);
    });
  }


  uploadFileDirectly(metaDataResponse, file) {
    const url = metaDataResponse.contentUrl;
    const headers = new Headers({
      'x-amz-server-side-encryption': 'AES256'
    });

    const fileReader: FileReader = new FileReader();
    fileReader.onloadend = (e) => {
      this._http.put(url, fileReader.result, { headers: headers }).subscribe( res => {
        this.markFileUploadComplete(metaDataResponse.fileId);
      });
    }
    fileReader.readAsArrayBuffer(file);
  }


  markFileUploadComplete(fileId) {
    const url = `/api/v2/files/file/` + fileId + `/complete`;
    this._authHttp.put(url, null).subscribe( res => {
      console.log('File upload complete', res.json());
    });
  }


}
