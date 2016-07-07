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
  }

  initializeProfile() {
    this.hat.getDataSources()
      .map(res => res.json())
      .flatMap(sources => {
        const profileTable = sources.find(source => source.name === 'profile' && source.source === 'rumpel');

        if (profileTable) {
          return this.hat.getModelMapping(profileTable.id);
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
      .map(profiles => profiles[0]);
  }
}
