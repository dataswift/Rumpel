import { HatApiService } from '../core/services/hat-api.service';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app.config';
import { HttpBackendClient } from '../core/services/http-backend-client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FileUploadService extends HatApiService {

  constructor(@Inject(APP_CONFIG) private _config: AppConfig,
              private _authHttp: HttpBackendClient,
              private _http: HttpClient) {
    super(_config, _authHttp, _http);
  }

  postFileUploadMetaData(file) {
    const url = `/api/v2/files/upload`;
    const body = JSON.stringify({
      name: file.name,
      source: 'userUpload'
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    this._authHttp.post(url, body, { headers: headers }).subscribe( resBody => {
      this.uploadFileDirectly(resBody, file);
    });
  }


  uploadFileDirectly(metaDataResponse, file) {
    const url = metaDataResponse.contentUrl;
    const headers = new HttpHeaders({
      'x-amz-server-side-encryption': 'AES256'
    });

    const fileReader: FileReader = new FileReader();
    fileReader.onloadend = (e) => {
      this._http.put(url, fileReader.result, { headers: headers }).subscribe( res => {
        this.markFileUploadComplete(metaDataResponse.fileId);
      });
    };

    fileReader.readAsArrayBuffer(file);
  }


  markFileUploadComplete(fileId) {
    const url = `/api/v2/files/file/` + fileId + `/complete`;

    this._authHttp.put(url, null).subscribe( resBody => {
      console.log('File upload complete', resBody);
    });
  }


}
