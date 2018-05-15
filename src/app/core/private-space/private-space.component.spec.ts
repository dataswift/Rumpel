import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSpaceComponent } from './private-space.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../header/header.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { CustomAngularMaterialModule } from '../custom-angular-material.module';
import { APP_CONFIG } from '../../app.config';
import { HatApplicationsService } from '../../explore/hat-applications.service';
import { DataOfferService } from '../../offers/data-offer.service';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../dialog.service';
import { ProfilesService } from '../../profiles/profiles.service';
import { AuthService } from '../services/auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PrivateSpaceComponent', () => {
  let component: PrivateSpaceComponent;
  let fixture: ComponentFixture<PrivateSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, CustomAngularMaterialModule, NoopAnimationsModule ],
      declarations: [ PrivateSpaceComponent, HeaderComponent, SideMenuComponent ],
      providers: [
        { provide: APP_CONFIG, useValue: { menuItems: { private: [] }}},
        { provide: HatApplicationsService, useValue: { inactiveDataplugs$: Observable.of([]) } },
        { provide: DataOfferService, useValue: { offers$: Observable.of({ availableOffers: [] }), fetchUserAwareOfferList: () => null } },
        { provide: DialogService, useValue: {} },
        { provide: AuthService, useValue: { user$: Observable.of({}) } },
        { provide: ProfilesService, useValue: { profileData$: Observable.of({}) } }
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
