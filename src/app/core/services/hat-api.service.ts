/*
 * Copyright (C) 2017 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 7, 2017
 */

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HttpBackendClient } from './http-backend-client.service';
import { APP_CONFIG, AppConfig } from '../../app.config';

import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { DataDebit, DataDebitValues } from '../../data-management/data-debit.interface';
import { FileMetadataReq, FileMetadataRes } from '../../shared/interfaces/file.interface';
import { BundleStructure, BundleValues, EndpointQuery, PropertyQuery } from '../../shared/interfaces/bundle.interface';
import { HatApplication } from '../../explore/hat-application.interface';
import { SheFeed } from '../../she/she-feed.interface';
import { HatClaimRequest } from '../../shared/interfaces/hat-claim.interface';
import { SheStaticProfile } from '../../shared/interfaces/she-static-profile.interface';
import { SystemStatusInterface } from '../../shared/interfaces/system-status.interface';
import { HatTool } from '../../tools/hat-tools.interface';

@Injectable()
export class HatApiService {
  private pathPrefix = '/api/v2.6';
  private appNamespace: string;

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private authHttp: HttpClient,
              private http: HttpBackendClient) {
    this.appNamespace = config.name.toLowerCase();
  }

  login(username: string, password: string): Observable<string> {
    const path = `/users/access_token`;
    const headers = new HttpHeaders({
      'username': encodeURIComponent(username),
      'password': encodeURIComponent(password)
    });

    return this.http.get<{ accessToken: string; }>(path, { headers: headers })
      .pipe(map(resBody => resBody.accessToken));
  }

  legacyHatLogin(name: string, redirect: string): Observable<string> {
    const path = `/control/v2/auth/hatlogin`;
    const queryParams = new HttpParams()
      .set('name', name)
      .set('redirect', redirect);

    return this.authHttp.get<{ message: string }>(path, { params: queryParams })
      .pipe(map(resBody => resBody.message));
  }

  recoverPassword(body: { email: string; }): Observable<any> {
    const path = `/control/v2/auth/passwordReset`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(path, body, { headers: headers });
  }

  changePassword(body: { password: string; newPassword: string; }): Observable<any> {
    const path = `/control/v2/auth/password`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.authHttp.post(path, body, { headers: headers });
  }

  resetPassword(resetToken: string, body: { newPassword: string; }): Observable<any> {
    const path = `/control/v2/auth/passwordreset/confirm/${resetToken}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(path, body, { headers: headers });
  }

  /*
    Call Hatters API call through HAT
   */
  claimHat(claimToken: string, body: HatClaimRequest): Observable<any> {
    const path = `/control/v2/auth/claim/complete/${claimToken}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(path, body, { headers: headers });
  }

  getApplicationToken(name: string, resource: string): Observable<string> {
    const path = `/users/application_token`;
    const queryParams = new HttpParams()
      .set('name', name)
      .set('resource', resource);

    return this.authHttp.get<{ accessToken: string; }>(path, { params: queryParams })
      .pipe(map(resBody => resBody.accessToken));
  }

  getApplicationList(): Observable<HatApplication[]> {
    const path = `${this.pathPrefix}/applications`;

    return this.authHttp.get<HatApplication[]>(path);
  }

  getApplicationHmi(applicationId: string): Observable<HatApplication[]> {
    const path = `${this.pathPrefix}/applications/hmi`;

    const queryParams = new HttpParams()
      .set('applicationId', applicationId);

    return this.authHttp.get<HatApplication[]>(path, { params: queryParams });
  }

  getApplicationById(applicationId: string): Observable<HatApplication> {
    const path = `${this.pathPrefix}/applications/${applicationId}`;

    return this.authHttp.get<HatApplication>(path);
  }

  getApplicationTokenNew(applicationId: string): Observable<string> {
    const path = `${this.pathPrefix}/applications/${applicationId}/access-token`;

    return this.authHttp.get<{ accessToken: string; }>(path)
      .pipe(map(resBody => resBody.accessToken));
  }

  setupApplication(applicationId: string): Observable<HatApplication> {
    const path = `${this.pathPrefix}/applications/${applicationId}/setup`;

    return this.authHttp.get<HatApplication>(path);
  }

  disableApplication(applicationId: string): Observable<HatApplication> {
    const path = `${this.pathPrefix}/applications/${applicationId}/disable`;

    return this.authHttp.get<HatApplication>(path);
  }

  getDataRecords(namespace: string, endpoint: string, take?: number, orderBy?: string, drop?: number): Observable<HatRecord<any>[]> {
    const path = `${this.pathPrefix}/data/${namespace}/${endpoint}`;
    let queryParams = new HttpParams()
      .set('ordering', 'descending');

    if (take) {
      queryParams = queryParams.set('take', take.toString());
    }

    if (orderBy) {
      queryParams = queryParams.set('orderBy', orderBy);
    }

    if (drop) {
      queryParams = queryParams.set('skip', drop.toString());
    }

    return this.authHttp.get<HatRecord<any>[]>(path, { params: queryParams });
  }

  getSheStaticProfileRecords(dataPreviewEndpoint: string): Observable<SheStaticProfile<string[][]>[]> {
    const path = `${this.pathPrefix}/${dataPreviewEndpoint}`;

    return this.authHttp.get<SheStaticProfile<string[][]>[]>(path);
  }

  getSystemStatusRecords(): Observable<SystemStatusInterface[]> {
    const path = `${this.pathPrefix}/system/status`;

    return this.authHttp.get<SystemStatusInterface[]>(path);
  }

  getSheRecords(endpoint?: string, since?: number | string, until?: number | string): Observable<SheFeed[]> {
    const path = endpoint ? `${this.pathPrefix}/${endpoint}` : `${this.pathPrefix}/she/feed`;

    let queryParams = new HttpParams();

    if (since) {
      queryParams = queryParams.set('since', since.toString());
    }

    if (until) {
      queryParams = queryParams.set('until', until.toString());
    }

    return this.authHttp.get<SheFeed[]>(path, { params: queryParams });
  }

  createRecord(namespace: string, endpoint: string, record: any): Observable<HatRecord<any>> {
    const path = `${this.pathPrefix}/data/${namespace}/${endpoint}`;

    return this.authHttp.post<HatRecord<any>>(path, record);
  }

  updateRecord(hatRecord: HatRecord<any>): Observable<HatRecord<any>> {
    const path = `${this.pathPrefix}/data`;

    return this.authHttp.put<HatRecord<any>>(path, [hatRecord]);
  }

  deleteRecords(recordIds: Array<string>): Observable<number> {
    const path = `${this.pathPrefix}/data`;

    if (recordIds.length > 0) {
      let queryParams = new HttpParams();
      recordIds.forEach(recordId => queryParams = queryParams.set('records', recordId));

      return this.authHttp.delete(path, { params: queryParams, observe: 'response' })
        .pipe(map((res: HttpResponse<any>) => res.status));
    } else {
      return observableThrowError(new Error('Cannot delete. Record ID(s) missing.'));
    }
  }

  getCombinatorRecords(name: string, orderBy: string, take: number): Observable<HatRecord<any>[]> {
    const path = `${this.pathPrefix}/combinator/${name}`;

    const queryParams = new HttpParams()
      .set('orderBy', orderBy)
      .set('take', take.toString())
      .set('ordering', 'descending');

    return this.authHttp.get<HatRecord<any>[]>(path, { params: queryParams });
  }

  proposeNewDataEndpoint(name: string, proposedCombinator: EndpointQuery[]): Observable<number> {
    const path = `${this.pathPrefix}/combinator/${name}`;

    return this.authHttp.post(path, proposedCombinator, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.status));
  }

  getDataBundle(bundleId: string): Observable<any> {
    const path = `${this.pathPrefix}/data-bundle/${bundleId}`;

    return this.authHttp.get(path);
  }

  getDataBundleStructure(bundleId: string): Observable<BundleStructure> {
    const path = `${this.pathPrefix}/data-bundle/${bundleId}/structure`;

    return this.authHttp.get<BundleStructure>(path);
  }

  proposeNewDataBundle(bundleId: string, bundle: { [bundleVersion: string]: PropertyQuery }): Observable<BundleValues> {
    const path = `${this.pathPrefix}/data-bundle/${bundleId}`;

    return this.authHttp.post<BundleValues>(path, bundle);
  }

  getAllDataDebits(): Observable<DataDebit[]> {
    const path = `${this.pathPrefix}/data-debit`;

    return this.authHttp.get<DataDebit[]>(path);
  }

  getDataDebit(debitId: string): Observable<DataDebit> {
    const path = `${this.pathPrefix}/data-debit/${debitId}`;

    return this.authHttp.get<DataDebit>(path);
  }

  getDataDebitValues(debitId: string): Observable<DataDebitValues> {
    const path = `${this.pathPrefix}/data-debit/${debitId}/values`;

    return this.authHttp.get<DataDebitValues>(path);
  }

  enableDataDebit(debitId: string): Observable<DataDebit> {
    const path = `${this.pathPrefix}/data-debit/${debitId}/enable`;

    return this.authHttp.get<DataDebit>(path);
  }

  disableDataDebit(debitId: string, atPeriodEnd: boolean): Observable<any> {
    const path = `${this.pathPrefix}/data-debit/${debitId}/disable`;

    const queryParams = new HttpParams()
      .set('atPeriodEnd', atPeriodEnd.toString());

    return this.authHttp.get<any>(path, { params: queryParams });
  }

  getFileMetadata(fileId: string): Observable<FileMetadataRes> {
    const path = `${this.pathPrefix}/files/file/${fileId}`;

    return this.authHttp.get<FileMetadataRes>(path);
  }

  uploadFile(file: ArrayBuffer, metadata: FileMetadataReq, contentType?: string): Observable<FileMetadataRes> {
    const headers = new HttpHeaders({
      'x-amz-server-side-encryption': 'AES256',
      'Content-Type': contentType || 'image/png'
    });

    return this.uploadFileMetadata(metadata).pipe(
      mergeMap(uploadedMetadata => {
        return this.http.put(uploadedMetadata.contentUrl, file, { headers: headers })
          .pipe(map(_ => uploadedMetadata));
      }),
      mergeMap(uploadedMetadata => this.markFileAsComplete(uploadedMetadata.fileId)));
  }

  deleteFile(fileId: string): Observable<number> {
    const path = `${this.pathPrefix}/files/file/${fileId}`;

    return this.authHttp.delete(path, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.status));
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
        return observableThrowError(new Error('Requested permission cannot be matched to available options.'))
    }

    const path = `${this.pathPrefix}/files/${actionIdentifier}/${fileId}`;

    return this.authHttp.get(path, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.status));
  }

  getPublicKey(domain: string): Observable<any> {
    const path = `https://${domain}/publickey`;

    return this.http.get(path, { observe: 'response', responseType: 'text' });
  }

  sendReport(actionCode: string, message?: string): Observable<any> {
    const path = `${this.pathPrefix}/report-frontend-action`;

    return this.authHttp.post(path, { actionCode: actionCode, message: message });
  }

  private uploadFileMetadata(metadata: FileMetadataReq): Observable<FileMetadataRes> {
    const path = `${this.pathPrefix}/files/upload`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.authHttp.post<FileMetadataRes>(path, metadata, { headers: headers });
  }

  getPhataPage(): Observable<BundleValues> {
    const path = `${this.pathPrefix}/phata/profile`;

    return this.http.get<BundleValues>(path);
  }

  private markFileAsComplete(fileId: string): Observable<FileMetadataRes> {
    const path = `${this.pathPrefix}/files/file/${fileId}/complete`;

    return this.authHttp.put<FileMetadataRes>(path, {});
  }

  proxiedRequest(appId: string): (a: string, b: string, c: any) => Observable<any> {
    const hatPath = `${this.pathPrefix}/applications/${appId}/proxy`;
    // Options object should have the same structure as the Angular HttpClient options object

    return (method: string, proxyPath: string, options: any) => {
      const completePath = hatPath + proxyPath;

      return this.authHttp.request(method, completePath, options);
    }
  }

  getToolList(toolId?: string): Observable<HatTool[]> {
    let path = `${this.pathPrefix}/she/function`;

    if (toolId) {
      path += `/${toolId}`
    }

    return this.authHttp.get<HatTool[]>(path);
  }


  enableTool(toolId: string): Observable<HatTool> {
    const path = `${this.pathPrefix}/she/function/${toolId}/enable`;

    return this.authHttp.get<HatTool>(path);
  }

  disableTool(toolId: string): Observable<HatTool> {
    const path = `${this.pathPrefix}/she/function/${toolId}/disable`;

    return this.authHttp.get<HatTool>(path);
  }

  triggerToolUpdate(toolId: string): Observable<number> {
    const path = `${this.pathPrefix}/she/function/${toolId}/trigger`;

    return this.authHttp.get(path, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.status));
  }

  getMarkDownContent(path: string): Observable<HttpResponse<string>> {

    return this.http.get(path, { observe: 'response', responseType: 'text' });
  }

}
