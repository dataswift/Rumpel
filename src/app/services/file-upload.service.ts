import { HatApiV2Service } from './hat-api-v2.service';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { AuthHttp } from './auth-http.service';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable()
export class FileUploadService extends HatApiV2Service {

  constructor(@Inject(APP_CONFIG) private _config: IAppConfig, private _authHttp: AuthHttp, private _http: Http) {
    super(_config, _authHttp, _http);
  }


  postFileUploadMetaData (file) {
    const url = `/api/v2/files/upload`;
    const body = `{
            "name": "` + file.name + `",
            "source": "userUpload"
    }`;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    this._authHttp.post(url, body, { headers: headers }).subscribe( res => {
      this.uploadFileDirectly(res.json(), file);
    });
  }


  uploadFileDirectly (metaDataResponse, file) {
    const url = metaDataResponse.contentUrl;
    const headers = new Headers({
      'x-amz-server-side-encryption': 'AES256'
    });

    const fileReader: FileReader = new FileReader();
    fileReader.onloadend = (e) => {
      this._authHttp.put(url, fileReader.result, { headers: headers }).subscribe( res => {
        console.log( res.json() );
        this.markFileUploadComplete(metaDataResponse.fileId);
      });
    }
    fileReader.readAsArrayBuffer(file);
  }


  markFileUploadComplete (fileId) {
    const url = `/api/v2/files/file/:` + fileId + `/complete`;
    this._authHttp.put(url, null).subscribe( res => {
      console.log('File upload complete', res.json());
    });
  }


}
