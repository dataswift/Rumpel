import { Component, OnInit } from '@angular/core';
import { Profile, User } from '../../shared/interfaces';
import { ProfilesService } from '../../profiles/profiles.service';
import { AuthService } from '../../core/services/auth.service';
import { SystemStatusService } from '../../services/system-status.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SystemStatusInterface } from '../../shared/interfaces/system-status.interface';

@Component({
  selector: 'rum-settings-header',
  templateUrl: './settings-header.component.html',
  styleUrls: ['./settings-header.component.scss']
})
export class SettingsHeaderComponent implements OnInit {
  public values: Profile;
  public profilePhoto: any;
  public hatUrl: string;
  public hatDomain: string;
  public dataBaseUsedPercent: SystemStatusInterface;

  constructor(private profilesSvc: ProfilesService,
              private authSvc: AuthService
              ) {
  }

  ngOnInit() {
    // this.systemStatusSvc.fetchSystemStatus().pipe(
    //   tap((records: SystemStatusInterface[]) => {
    //     console.log(records);
    //     this.dataBaseStorage = records.find(record => record.title === 'Database Storage');
    //     this.dataBaseUsedPercent = records.find(record => record.title === 'Database Storage Used Share');
    //   }),
    //   catchError(err => of([])));

    this.authSvc.user$.subscribe((user: User) => {
      this.hatUrl = `https://${user.hatId}.${user.domain}/#/public/profile`;
      this.hatDomain = user.fullDomain;
    });

    this.profilePhoto = {};
    this.profilesSvc.profileData$.subscribe((profile: { values: Profile; }) => {
      this.values = profile.values;
    });

    this.profilesSvc.getProfileData();
  };
}
