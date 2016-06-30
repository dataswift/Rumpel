import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-profile',
  templateUrl: 'tile-profile.component.html',
  styleUrls: ['tile-profile.component.css']
})
export class TileProfileComponent implements OnInit {
  public user = [
    { field: 'name', value: 'myname@google.com', private: false, icon: 'user' },
    { field: 'phone', value: '01229 123456', private: true, icon: 'phone' },
    { field: 'mobile', value: '07809 123456', private: true, icon: 'cell' },
    { field: 'address', value: [
        { field: 'number', value: '100' },
        { field: 'street', value: 'Smith Lane' },
        { field: 'city', value: 'Cambridge' },
        { field: 'postcode', value: 'CB98 9UT' },
        { field: 'country', value: 'United Kingdom' }
      ],
      private: true, icon: 'home'
    },
    { field: 'email', value: 'myname@gmail.com', private: false, icon: 'mail' },
    { field: 'fbProfile', value: 'facebook.com/username', private: false, icon: 'replyall' }
  ];

  constructor() {}

  ngOnInit() {
  }

  togglePrivacy(propName: string) {
    let propToChange = this.user.find(prop => prop.field === propName);
    propToChange.private = !propToChange.private;
  }

  isArray(prop: any) {
    return Array.isArray(prop.value);
  }

}
