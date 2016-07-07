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
        const profileTable = sources.find(source => source.name === 'profilis' && source.source === 'rumpel');

        if (profileTable) {
          return this.hat.getModelMapping(profileTable.id);
        } else {
          return this.hat.postModel(hatModel.profile);
        }
      })
      .subscribe(hatIdMapping => {
        console.log(hatIdMapping);
        this.hatIdMapping = hatIdMapping;
      });
  }

  getFullProfile() {
    return this.hat.getAllValuesOf('profilis', 'rumpel')
      .map(profiles => {
        const sortedProfiles = profiles.sort((a, b) => {
          return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
        });

        return sortedProfiles[0];
      });
  }

  saveProfile(profile: Profile) {
    return this.hat.postRecord(profile, this.hatIdMapping, 'profilis').map(res => res.json());
  }
}
