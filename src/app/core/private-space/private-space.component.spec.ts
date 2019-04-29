import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSpaceComponent } from './private-space.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../header/header.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { CustomAngularMaterialModule } from '../custom-angular-material.module';
import { APP_CONFIG } from '../../app.config';
import { HatApplicationsService } from '../../explore/hat-applications.service';
import { of } from 'rxjs';
import { DialogService } from '../dialog.service';
import { ProfilesService } from '../../profiles/profiles.service';
import { AuthService } from '../services/auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SystemStatusService } from '../../services/system-status.service';

const SYSTEM_STATUS_MOCK = {
  title: 'Previous Login',
  kind: {
    kind: 'Text',
    units: '',
    metric: '2 hours ago',
  }
};

describe('PrivateSpaceComponent', () => {
  let component: PrivateSpaceComponent;
  let fixture: ComponentFixture<PrivateSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, CustomAngularMaterialModule, NoopAnimationsModule ],
      declarations: [ PrivateSpaceComponent, HeaderComponent, SideMenuComponent ],
      providers: [
        { provide: APP_CONFIG, useValue: { mainMenu: [], appsMenu: [] }},
        { provide: HatApplicationsService, useValue: { inactiveDataplugs$: of([]), enable: () => of({}) } },
        { provide: SystemStatusService, useValue: {
          fetchSystemStatus: () => of([SYSTEM_STATUS_MOCK]),
            systemStatus$: of([SYSTEM_STATUS_MOCK])}},
        { provide: DialogService, useValue: {} },
        { provide: AuthService, useValue: { user$: of({}), getApplicationDetails: () => of({}) } },
        { provide: ProfilesService, useValue: {
            getProfileData: () => null,
            getProfileInitData: () => null,
            data$: of({}) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
