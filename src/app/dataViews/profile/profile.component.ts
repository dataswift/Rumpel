import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services';
import { Profile } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'rump-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profile: Profile;

  constructor(private profileSvc: ProfileService) {}

  ngOnInit() {
    this.profileSvc.initializeProfile();
    this.profileSvc.getFullProfile().subscribe(profile => {
      if (profile) this.profile = profile;
    });

    this.profile = {
      private: true,
      personal: { title: '', firstName: '', middleName: '',
                  lastName: '', preferredName: '', private: true },
      nick: { name: '', private: true },
      birth: { date: '', private: true },
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
  }

}
