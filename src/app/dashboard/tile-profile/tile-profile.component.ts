import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-profile',
  templateUrl: 'tile-profile.component.html',
  styleUrls: ['tile-profile.component.css']
})
export class TileProfileComponent implements OnInit {
  public user = {
    name: { value: 'myname@google.com', private: false },
    phone: { value: '01229 123456', private: true },
    mobile: { value: '07809 123456', private: true },
    address: {
      value: {
        number: '100',
        street: 'Smith Lane',
        city: 'Cambridge',
        postcode: 'CB98 9UT',
        country: 'United Kingdom'
      },
      private: true
    },
    email: { value: 'myname@gmail.com', private: false },
    fbProfile: { value: 'facebook.com/username', private: false }
  };

  constructor() {}

  ngOnInit() {
  }

  togglePrivacy(item: any) {
    item.private = !item.private;
  }

}
