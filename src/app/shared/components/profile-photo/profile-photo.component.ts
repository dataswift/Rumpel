import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rump-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss']
})
export class ProfilePhotoComponent implements OnInit {
  @Input() userPhotoUrl: any;

  constructor() { }

  ngOnInit() {
  }

}
