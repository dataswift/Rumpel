import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStandaloneComponent } from './login-standalone.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { FormsModule } from '@angular/forms';
import { APP_CONFIG } from '../../app.config';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InfoHeaderComponent } from '../info-header/info-header.component';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';

describe('LoginStandaloneComponent', () => {
  let component: LoginStandaloneComponent;
  let fixture: ComponentFixture<LoginStandaloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, CustomAngularMaterialModule, FormsModule ],
      declarations: [ LoginStandaloneComponent, InfoHeaderComponent ],
      providers: [
        { provide: APP_CONFIG, useValue: { supportedDomains: ['.hat.org'] } },
        { provide: BrowserStorageService, useValue: { getItem: () => null } },
        { provide: AuthService, useValue: { domainRegistered: () => of(true) } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
