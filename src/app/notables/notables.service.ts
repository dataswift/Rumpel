/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject, forkJoin, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseDataService } from '../services/base-data.service';
import { HatApiService } from '../core/services/hat-api.service';
import { DexApiService } from '../services/dex-api.service';
import { AuthService } from '../core/services/auth.service';

import { APP_CONFIG, AppConfig } from '../app.config';
import { Notable } from '../shared/interfaces';
import { NotablesServiceMeta } from '../shared/interfaces/notables-service-meta.interface';
import { User } from '../user/user.interface';
import { HatRecord } from '../shared/interfaces/hat-record.interface';

@Injectable()
export class NotablesService extends BaseDataService<Notable> {
  public notablesServiceMeta: NotablesServiceMeta;

  private _editedNotable$: ReplaySubject<HatRecord<Notable>>;
  public editedNotable$: Observable<HatRecord<Notable>>;

  private _notablesMeta$: BehaviorSubject<NotablesServiceMeta>;
  public notablesMeta$: Observable<NotablesServiceMeta>;

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              hat: HatApiService,
              authSvc: AuthService,
              private dex: DexApiService) {
    super(hat, authSvc, 'rumpel', 'notablesv1', 'updated_time');

    this.notablesServiceMeta = {
      phata: '',
      offerClaimed: false,
      userMessage: ''
    };

    this._editedNotable$ = <ReplaySubject<HatRecord<Notable>>>new ReplaySubject(1);
    this.editedNotable$ = this._editedNotable$.asObservable();

    this._notablesMeta$ = <BehaviorSubject<NotablesServiceMeta>>new BehaviorSubject(this.notablesServiceMeta);
    this.notablesMeta$ = this._notablesMeta$.asObservable();

    authSvc.user$.subscribe((user: User) => {
      this.notablesServiceMeta.phata = user.fullDomain;
      this._notablesMeta$.next(this.notablesServiceMeta);
    });
  }

  get hatDomain(): string {
    return this.notablesServiceMeta.phata;
  }

  saveNotable(recordValue: HatRecord<Notable>): Observable<HatRecord<Notable>> {
    const permissionKey = recordValue.data.isShared ? 'allow' : 'restrict';
    let filePermissionUpdate$: Observable<any>;
    const notablePost$ = recordValue.recordId ? this.update(recordValue) : this.save(recordValue.data);

    if (recordValue.data.photov1) {
      filePermissionUpdate$ = this.hat.updateFilePermissions(recordValue.data.photov1.link.split('/').pop(), permissionKey);
    } else {
      filePermissionUpdate$ = of(null); // Dummy observable to make subsequent forkJoin succeed
    }

    return forkJoin(notablePost$, filePermissionUpdate$).pipe(
      tap(() => {
        if (recordValue.data.currently_shared === true) {
          this.dex.tickleNotables(this.hatDomain);
        }
      }),
      map(([savedNotable, permissionUpdateResult]) => this.coerceType(savedNotable))
    );
  }

  editNotable(notable: HatRecord<Notable>) {
    this._editedNotable$.next(notable);
  }

  coerceType(rawNotable: HatRecord<any>): HatRecord<Notable> {
    return {
      endpoint: rawNotable.endpoint,
      recordId: rawNotable.recordId,
      data: new Notable(rawNotable.data)
    };
  }
}
