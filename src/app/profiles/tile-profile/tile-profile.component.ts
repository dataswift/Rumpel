import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profiles.service';
import { Profile } from '../../shared/interfaces/profile.interface';

@Component({
  selector: 'rump-tile-profile',
  templateUrl: 'tile-profile.component.html',
  styleUrls: ['tile-profile.component.scss']
})
export class TileProfileComponent implements OnInit {
  public profile: Profile;

  constructor(private profilesSvc: ProfilesService) {}

  ngOnInit() {
    this.profilesSvc.getFullProfile().subscribe(profile => {
      if (profile) this.profile = profile;
    });

    this.profile = {
      private: true,
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

}
