import { Injectable } from '@angular/core';
import { HatApiService } from './hat-api.service';
import { AuthService } from './auth.service';
import { Profile } from '../shared';
import { hatModel } from '../shared/hat-profile-model';

@Injectable()
export class ProfileService {
  public profile: Profile;
  private hatIdMapping;

  constructor(private hat: HatApiService,
              private auth: AuthService) {

    this.profile = {
      private: true,
      personal: { title: '', firstName: '', middleName: '',
                  lastName: '', preferredName: '', private: true },
      nick: { name: '', private: true },
      body: { dateOfBirth: '', gender: '', age: '', private: true },
      gender: { type: '', private: true },
      age: { group: '', private: true },
      email: { email: '', email2: '', private: true },
      homePhone: { no: '', private: true },
      mobile: { no: '', private: true },
      addressDetails: { no: '', street: '', postcode: '', private: true },
      addressGlobal: { city: '', county: '', country: '', private: true },
      website: { link: '', private: true },
      blog: { link: '', private: true },
      facebook: { link: '', private: true },
      linkedin: { link: '', private: true },
      twitter: { link: '', private: true },
      google: { link: '', private: true },
      youtube: { link: '', private: true },
      emergencyContact: { firstName: '', lastName: '', mobile: '',
                          relationship: '', private: true },
      about: { title: '', body: '', private: true }
    };

    this.auth.auth$.subscribe(authenticated => {
      if (authenticated) {
        this.initializeProfile();
      }
    });
  }

  initializeProfile() {
    this.hat.getTable('profile', 'rumpel')
      .flatMap(table => {
        if (table && table.id) {
          return this.hat.getModelMapping(table.id);
        } else {
          return this.hat.postModel(hatModel.profile);
        }
      })
      .subscribe(hatIdMapping => {
        this.hatIdMapping = hatIdMapping;
      });
  }

  getFullProfile() {
    return this.hat.getAllValuesOf('profile', 'rumpel')
      .map(profiles => profiles[0] || this.profile);
  }
}
