import { Injectable } from '@angular/core';
import { HatApiService } from '../services/hat-api.service';
import { AuthService } from '../services/auth.service';
import { Profile } from '../shared/interfaces/profile.interface';
import { ProfileHatModel } from './profile.hatmodel';

@Injectable()
export class ProfilesService {
  public profile: Profile;
  private hatIdMapping;

  constructor(private hat: HatApiService,
              private auth: AuthService) {
  }

  initializeProfile() {
    return this.hat.getTable('profile', 'rumpel')
      .flatMap(table => {
        if (table === "Not Found") {
          return this.hat.postModel(ProfileHatModel.model);
        } else {
          return this.hat.getModelMapping(table.id);
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
      })
      .map(this.mapProfile);
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
    return this.hat.postRecord(profile, hatIdMapping, 'profile');
  }

  private mapProfile(rawProfile) {
    if (!rawProfile) {
      return rawProfile;
    } else {
      return {
        private: rawProfile.private === 'true',
        fb_profile_photo: { private: rawProfile.fb_profile_photo.private === 'true' },
        personal: {
          title: rawProfile.personal.title,
          first_name: rawProfile.personal.first_name,
          middle_name: rawProfile.personal.middle_name,
          last_name: rawProfile.personal.last_name,
          preferred_name: rawProfile.personal.preferred_name,
          private: rawProfile.personal.private === 'true' },
        nick: { name: rawProfile.nick.name, private: rawProfile.nick.private === 'true' },
        birth: { date: rawProfile.birth.date, private: rawProfile.birth.private === 'true' },
        gender: { type: rawProfile.gender.type, private: rawProfile.gender.private === 'true' },
        age: { group: rawProfile.age.group, private: rawProfile.age.private === 'true' },
        primary_email: { value: rawProfile.primary_email.value, private: rawProfile.primary_email.private === 'true' },
        alternative_email: { value: rawProfile.alternative_email.value, private: rawProfile.alternative_email.private === 'true' },
        home_phone: { no: rawProfile.home_phone.no, private: rawProfile.home_phone.private === 'true' },
        mobile: { no: rawProfile.mobile.no, private: rawProfile.mobile.private === 'true' },
        address_details: {
          no: rawProfile.address_details.no,
          street: rawProfile.address_details.street,
          postcode: rawProfile.address_details.postcode,
          private: rawProfile.address_details.private === 'true' },
        address_global: {
          city: rawProfile.address_global.city,
          county: rawProfile.address_global.county,
          country: rawProfile.address_global.country,
          private: rawProfile.address_global.private === 'true' },
        website: { link: rawProfile.website.link, private: rawProfile.website.private === 'true' },
        blog: { link: rawProfile.blog.link, private: rawProfile.blog.private === 'true' },
        facebook: { link: rawProfile.facebook.link, private: rawProfile.facebook.private === 'true' },
        linkedin: { link: rawProfile.linkedin.link, private: rawProfile.linkedin.private === 'true' },
        twitter: { link: rawProfile.twitter.link, private: rawProfile.twitter.private === 'true' },
        google: { link: rawProfile.google.link, private: rawProfile.google.private === 'true' },
        youtube: { link: rawProfile.youtube.link, private: rawProfile.youtube.private === 'true' },
        emergency_contact: {
          first_name: rawProfile.emergency_contact.first_name,
          last_name: rawProfile.emergency_contact.last_name,
          mobile: rawProfile.emergency_contact.mobile,
          relationship: rawProfile.emergency_contact.relationship,
          private: rawProfile.emergency_contact.private === 'true' },
        about: { title: rawProfile.about.title, body: rawProfile.about.body, private: rawProfile.about.private === 'true' }
      };
    }
  }

}
