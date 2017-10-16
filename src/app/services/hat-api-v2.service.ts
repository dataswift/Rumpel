/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 7, 2017
 */

import { Inject, Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { AuthHttp } from './auth-http.service';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { Observable } from 'rxjs/Observable';
import { DataDebit, DataDebitValues } from '../shared/interfaces/data-debit.interface';
import { FileMetadataReq, FileMetadataRes } from '../shared/interfaces/file.interface';

@Injectable()
export class HatApiV2Service {
  private pathPrefix = '/api/v2';
  private appNamespace: string;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private authHttp: AuthHttp,
              private http: Http) {
    this.appNamespace = config.name.toLowerCase();
  }

  getRecords(namespace: string, endpoint: string, take?: number, drop?: number): Observable<HatRecord[]> {
    const path = `${this.pathPrefix}/data/${namespace}/${endpoint}`;
    const queryParams = new URLSearchParams();

    queryParams.append('orderBy', 'date');
    queryParams.append('ordering', 'descending');

    if (take) {
      queryParams.append('take', take.toString());
    }

    if (drop) {
      queryParams.append('drop', drop.toString());
    }

    return this.authHttp.get(path, { search: queryParams }).map((res: Response) => <HatRecord[]>res.json());
  }

  createRecord(endpoint: string, record: any): Observable<HatRecord> {
    const path = `${this.pathPrefix}/data/${this.appNamespace}/${endpoint}`;

    return this.authHttp.post(path, record).map((res: Response) => <HatRecord>res.json());
  }

  deleteRecords(recordIds: Array<string>): Observable<number> {
    const path = `${this.pathPrefix}/data`;

    if (recordIds.length > 0) {
      const queryParams = new URLSearchParams();
      recordIds.forEach(recordId => queryParams.append('records', recordId));

      return this.authHttp.delete(path, { search: queryParams }).map((res: Response) => res.status);
    } else {
      return Observable.throw(new Error('Cannot delete. Record IDs missing.'));
    }
  }

  getAllDataDebits(): Observable<DataDebit[]> {
    const path = `${this.pathPrefix}/data-debit`;

    return this.authHttp.get(path).map((res: Response) => <DataDebit[]>res.json());
  }

  getDataDebit(debitId: string): Observable<DataDebit> {
    const path = `${this.pathPrefix}/data-debit/${debitId}`;

    return this.authHttp.get(path).map((res: Response) => <DataDebit>res.json());
  }

  getDataDebitValues(debitId: string): Observable<DataDebitValues> {
    const path = `${this.pathPrefix}/data-debit/${debitId}/values`;

    return this.authHttp.get(path).map((res: Response) => <DataDebitValues>res.json());
  }

  updateDataDebit(debitId: string, action: string): Observable<DataDebit> {
    const path = `${this.pathPrefix}/data-debit/${debitId}/${action}`;

    return this.authHttp.get(path).map((res: Response) => <DataDebit>res.json());
  }

  getFileMetadata(fileId: string): Observable<FileMetadataRes> {
    const path = `${this.pathPrefix}/files/file/${fileId}`;

    return this.authHttp.get(path).map((res: Response) => <FileMetadataRes>res.json());
  }

  uploadFile(file: ArrayBuffer, metadata: FileMetadataReq): Observable<FileMetadataRes> {
    const headers = new Headers({ 'x-amz-server-side-encryption': 'AES256' });

    return this.uploadFileMetadata(metadata)
      .flatMap(uploadedMetadata => {
        return this.http.put(uploadedMetadata.contentUrl, file, { headers: headers })
          .map((res: Response) => uploadedMetadata)
      })
      .flatMap(uploadedMetadata => this.markFileAsComplete(uploadedMetadata.fileId))
  }

  deleteFile(fileId: string): Observable<number> {
    const path = `${this.pathPrefix}/files/file/${fileId}`;

    return this.authHttp.delete(path).map((res: Response) => res.status);
  }

  updateFilePermissions(fileId: string, permission: string, userId?: string): Observable<number> {
    let actionIdentifier;
    switch (permission) {
      case 'allow':
        actionIdentifier = 'allowAccessPublic';
        break;
      case 'restrict':
        actionIdentifier = 'restrictAccessPublic';
        break;
      default:
        return Observable.throw(new Error('Requested permission cannot be matched to available options.'))
    }

    const path = `${this.pathPrefix}/files/${actionIdentifier}/${fileId}`;

    return this.authHttp.get(path).map((res: Response) => res.status);
  }

  private uploadFileMetadata(metadata: FileMetadataReq): Observable<FileMetadataRes> {
    const path = `${this.pathPrefix}/files/upload`;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.authHttp.post(path, metadata, { headers: headers }).map((res: Response) => <FileMetadataRes>res.json());
  }

  private markFileAsComplete(fileId: string): Observable<FileMetadataRes> {
    const path = `${this.pathPrefix}/files/file/${fileId}/complete`;

    return this.authHttp.put(path, {}).map((res: Response) => <FileMetadataRes>res.json());
  }

}
