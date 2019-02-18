import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HatClaimComponent } from './hat-claim.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HatClaimSubscriptionsComponent } from '../hat-claim-subscriptions/hat-claim-subscriptions.component';
import { HatClaimDetailsComponent } from '../hat-claim-details/hat-claim-details.component';
import { HatClaimNewPasswordComponent } from '../hat-claim-new-password/hat-claim-new-password.component';
import { HatClaimUrlComponent } from '../hat-claim-url/hat-claim-url.component';
import { HatClaimConfirmationComponent } from '../hat-claim-confirmation/hat-claim-confirmation.component';
import { HatClaimSuccessComponent } from '../hat-claim-success/hat-claim-success.component';
import { HatClaimService } from '../hat-claim.service';
import { of } from 'rxjs';

describe('HatClaimComponent', () => {
  let component: HatClaimComponent;
  let fixture: ComponentFixture<HatClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, CustomAngularMaterialModule, RouterTestingModule ],
      declarations: [
        HatClaimComponent,
        HatClaimDetailsComponent,
        HatClaimNewPasswordComponent,
        HatClaimSubscriptionsComponent,
        HatClaimUrlComponent,
        HatClaimConfirmationComponent,
        HatClaimSuccessComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}), snapshot: { queryParams: {} } } },
        { provide: Router, useValue: {} },
        { provide: HatClaimService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
