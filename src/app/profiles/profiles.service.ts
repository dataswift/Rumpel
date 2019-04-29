/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { throwError as observableThrowError, ReplaySubject, Observable, forkJoin, of, zip } from 'rxjs';
import { catchError, filter, map, startWith } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { HatApiService } from '../core/services/hat-api.service';
import { BaseDataService } from '../services/base-data.service';
import { AuthService } from '../core/services/auth.service';

import { Profile, ProfileSharingConfig } from '../shared/interfaces/profile.interface';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { APP_CONFIG, AppConfig } from '../app.config';
import { BundleStructure, PropertyQuery } from '../shared/interfaces/bundle.interface';

const DEFAULT_PHATA_BUNDLE: BundleStructure = {
  name: 'phata',
  bundle: {
    notables: {
      endpoints: [{
        filters: [{
          field: 'shared',
          operator: {
            value: true,
            operator: 'contains'
          }
        }, {
          field: 'shared_on',
          operator: {
            value: 'phata',
            operator: 'contains'
          }
        }],
        mapping: {
          kind: 'kind',
          shared: 'shared',
          currently_shared: 'currently_shared',
          message: 'message',
          author: 'authorv1',
          location: 'locationv1',
          photo: 'photov1',
          shared_on: 'shared_on',
          created_time: 'created_time',
          public_until: 'public_until',
          updated_time: 'updated_time'
        },
        endpoint: 'rumpel/notablesv1'
      }],
      orderBy: 'updated_time',
      ordering: 'descending'
    }
  }
};

@Injectable()
export class ProfilesService extends BaseDataService<Profile> {
  private _bundle$: ReplaySubject<BundleStructure> = <ReplaySubject<BundleStructure>>new ReplaySubject(1);
  private previousBundle: BundleStructure;

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              hat: HatApiService,
              authSvc: AuthService) {
    super(hat, authSvc, 'rumpel', 'profile', 'dateCreated');
  }

  get profileData$(): Observable<{ values: Profile; share: ProfileSharingConfig; }> {
    const defaultProfile: Profile = {
      dateCreated: 0,
      shared: false,
      photo: { avatar: '' },
      personal: {
        title: '', firstName: '', middleName: '', lastName: '',
        preferredName: '', nickName: '', birthDate: '', gender: '', ageGroup: ''
      },
      contact: { primaryEmail: '', alternativeEmail: '', mobile: '', landline: '' },
      emergencyContact: { firstName: '', lastName: '', mobile: '', relationship: '' },
      address: { city: '', county: '', country: '' },
      about: { title: '', body: '' },
      online: { website: '', blog: '', facebook: '', twitter: '', linkedin: '', google: '', youtube: '' }
    };

    const defaultProfileShareConfig: ProfileSharingConfig = {
      photo: { avatar: false },
      personal: {
        title: false, firstName: false, middleName: false, lastName: false,
        preferredName: false, nickName: false, birthDate: false, gender: false, ageGroup: false
      },
      contact: { primaryEmail: false, alternativeEmail: false, mobile: false, landline: false },
      emergencyContact: { firstName: false, lastName: false, mobile: false, relationship: false },
      address: { city: false, county: false, country: false },
      about: { title: false, body: false },
      online: { website: false, blog: false, facebook: false, twitter: false, linkedin: false, google: false, youtube: false }
    };

    const filteredData$ = this.data$.pipe(filter(profile => profile.length > 0));

    return zip(filteredData$, this._bundle$.asObservable()).pipe(
      map(([profiles, profileBundle]) => {
        return {
          values: this.validateProfileNewOrDefault(profiles[0].data),
          share: this.generateProfileShare(this.validateProfileNewOrDefault(profiles[0].data), profileBundle)
        };
      }),
      startWith({ values: defaultProfile, share: defaultProfileShareConfig })
    );
  }

  coerceType(rawProfile: HatRecord<any>): HatRecord<Profile> {
    return {
      endpoint: rawProfile.endpoint,
      recordId: rawProfile.recordId,
      data: <Profile>rawProfile.data
    };
  }

  getProfileData(): void {
    this.getInitData(1);
    this.getPhataBundle();
  }

  getProfileInitData(): void {
    this.getInitData(1);
  }

  saveProfile(values: Profile, shares: ProfileSharingConfig): Observable<HatRecord<Profile>> {
    const permissionKey = shares.photo.avatar ? 'allow' : 'restrict';
    let filePermissionUpdate$: Observable<any>;
    // this.clearProfileCache();

    if (values.photo.avatar) {
      filePermissionUpdate$ = this.hat.updateFilePermissions(values.photo.avatar.split('/').pop(), permissionKey);
    } else {
      filePermissionUpdate$ = of(null);
    }

    const phataBundleUpdate$ = this.hat.proposeNewDataBundle('phata', this.generatePhataBundle(shares));

    return forkJoin(this.save(values), filePermissionUpdate$, phataBundleUpdate$).pipe(
      map(([savedProfile, permissionUpdateResult, bundleUpdateResult]) => this.coerceType(savedProfile))
    );
  }

  private generateProfileShare(profile: Profile, phataBundle: BundleStructure): ProfileSharingConfig {
    let bundleMapping;

    try {
      bundleMapping = Object.keys(phataBundle.bundle.profile.endpoints[0].mapping);
    } catch (e) {
      bundleMapping = [];
    }

    return <ProfileSharingConfig>Object.keys(profile).reduce((acc1, grouping) => {
      if (profile.hasOwnProperty(grouping) && typeof profile[grouping] === 'object') {
        acc1[grouping] = Object.keys(profile[grouping]).reduce((acc2, field) => {
          if (profile[grouping].hasOwnProperty(field)) {
            acc2[field] = bundleMapping.includes(`${grouping}.${field}`);
          }

          return acc2;
        }, {});
      }

      return acc1;
    }, {});
  }

  private generatePhataBundle(profile: ProfileSharingConfig): { [bundleVersion: string]: PropertyQuery } {
    const mapping = Object.keys(profile).reduce((acc, grouping) => {
      if (profile.hasOwnProperty(grouping) && typeof profile[grouping] === 'object') {
        const sharedFields = Object.keys(profile[grouping]).filter(field => profile[grouping][field] === true);
        sharedFields.forEach(field => acc[`${grouping}.${field}`] = `${grouping}.${field}`);
      }

      return acc;
    }, {});

    const profileIsShared = Object.keys(mapping).length > 0;

    if (profileIsShared) {
      return {
        notables: DEFAULT_PHATA_BUNDLE.bundle.notables,
        profile: {
          endpoints: [{
            endpoint: 'rumpel/profile',
            mapping: Object.keys(mapping).length > 0 ? mapping : null
          }],
          orderBy: 'dateCreated',
          ordering: 'descending',
          limit: 1
        }
      }
    } else {
      return { notables: this.previousBundle.bundle.notables };
    }
  }

  private getPhataBundle(): void {
    this.hat.getDataBundleStructure('phata').pipe(
      catchError(error => {
        if (error.status === 404) {
          return of(DEFAULT_PHATA_BUNDLE);
        } else {
          return observableThrowError(error);
        }
      }))
      .subscribe((bundle: BundleStructure) => {
        this.previousBundle = bundle;
        this._bundle$.next(bundle);
      });
  }

  private validateProfileNewOrDefault(profile: Profile): Profile {
    if (profile.photo) {
      return profile;
    } else {
      return {
        dateCreated: 0,
        shared: false,
        photo: {
          avatar: ''
        },
        personal: {
          title: '',
          firstName: '',
          middleName: '',
          lastName: '',
          preferredName: '',
          nickName: '',
          birthDate: '',
          gender: '',
          ageGroup: ''
        },
        contact: {
          primaryEmail: '',
          alternativeEmail: '',
          mobile: '',
          landline: ''
        },
        emergencyContact: {
          firstName: '',
          lastName: '',
          mobile: '',
          relationship: ''
        },
        address: {
          city: '',
          county: '',
          country: ''
        },
        about: {
          title: '',
          body: ''
        },
        online: {
          website: '',
          blog: '',
          facebook: '',
          twitter: '',
          linkedin: '',
          google: '',
          youtube: ''
        }
      };
    }
  }

}
