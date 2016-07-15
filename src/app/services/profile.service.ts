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
    return this.hat.getDataSources()
      .flatMap(sources => {
        const profileTable = sources.find(source => source.name === 'profile' && source.source === 'rumpel');

        if (profileTable) {
          return this.hat.getModelMapping(profileTable.id);
        } else {
          return this.hat.postModel(hatModel.profile);
        }
      });
  }

  getFullProfile() {
    return this.hat.getAllValuesOf('profile', 'rumpel')
      .map(profiles => {
        const sortedProfiles = profiles.sort((a, b) => {
          return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
        });

        return sortedProfiles[0];
      });
  }

  getPicture() {
    return this.hat.getAllValuesOf('profile_picture', 'facebook')
      .map(pictures => {
        const sortedPictures = pictures.sort((a, b) => {
          return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
        });

        return sortedPictures[0];
      });
  }

  saveProfile(profile: Profile, hatIdMapping: any) {
    return this.hat.postRecord(profile, hatIdMapping, 'profile').map(res => res.json());
  }
}
