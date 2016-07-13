import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService, HatApiService } from '../../services';
import { Profile } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'rump-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
  private hatIdMapping: any;
  public profile: Profile;
  public profilePhoto: any;
  public hatUrl: string;

  constructor(private profileSvc: ProfileService,
              private hat: HatApiService,
              private router: Router) {}

  ngOnInit() {
    this.hatUrl = this.hat.getUrl();
    this.profilePhoto = {};
    this.profileSvc.initializeProfile().subscribe(hatIdMapping => {
      this.hatIdMapping = hatIdMapping;

      this.profileSvc.getFullProfile().subscribe(profile => {
        if (profile) this.profile = profile;
      });
    });

    this.profileSvc.getPicture().subscribe(
      profilePicture => {
        if (profilePicture) this.profilePhoto = profilePicture;
      },
      err => this.profilePhoto = { url: 'avatar_placeholder.svg'}
    );

    this.profile = {
      private: 'true',
      fb_profile_photo: { private: true },
      personal: { title: '', first_name: '', middle_name: '',
                  last_name: '', preferred_name: '', private: true },
      nick: { name: '', private: true },
      birth: { date: '', private: true },
      gender: { type: '', private: true },
      age: { group: '', private: true },
      primary_email: { value: '', private: true },
      alternative_email: { value: '', private: true },
      home_phone: { no: '', private: true },
      mobile: { no: '', private: true },
      address_details: { no: '', street: '', postcode: '', private: true },
      address_global: { city: '', county: '', country: '', private: true },
      website: { link: '', private: true },
      blog: { link: '', private: true },
      facebook: { link: '', private: true },
      linkedin: { link: '', private: true },
      twitter: { link: '', private: true },
      google: { link: '', private: true },
      youtube: { link: '', private: true },
      emergency_contact: { first_name: '', last_name: '', mobile: '',
                          relationship: '', private: true },
      about: { title: '', body: '', private: true }
    };
  }

  submitForm(event) {
    event.preventDefault();
    this.profileSvc.saveProfile(this.profile, this.hatIdMapping).subscribe();
    this.router.navigate(['']);
  }

  discardChanges() {
    this.router.navigate(['']);
  }

  toggleProfilePrivacy() {
    this.profile.private = this.profile.private === 'true' ? 'false' : 'true';
  }

  togglePrivacy(field: string) {
    this.profile[field].private = this.profile[field].private === 'true' ? 'false' : 'true';
  }

}
