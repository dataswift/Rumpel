import { Component, OnInit, ViewChild } from '@angular/core';
import { HatClaimService } from '../hat-claim.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HatClaimNewPasswordComponent } from '../hat-claim-new-password/hat-claim-new-password.component';
import { HatClaimSubscriptionsComponent } from '../hat-claim-subscriptions/hat-claim-subscriptions.component';
import { ClaimMembership, HatClaimRequest } from '../../shared/interfaces/hat-claim.interface';

@Component({
  selector: 'rum-hat-claim',
  templateUrl: './hat-claim.component.html',
  styleUrls: ['./hat-claim.component.scss']
})
export class HatClaimComponent implements OnInit {

  public loading = false;
  public step = 1;
  private claimForm: HatClaimRequest;
  private readonly STEP_COUNT = 6;

  public email: string;
  public claimToken: string;
  public hatName: string;
  public hatDomain: string;

  public password: string;
  public optins: string[];

  @ViewChild(HatClaimNewPasswordComponent)
  private hatClaimNewPasswordComponent: HatClaimNewPasswordComponent;

  @ViewChild(HatClaimSubscriptionsComponent)
  private hatClaimSubscriptionsComponent: HatClaimSubscriptionsComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private hatClaimSvc: HatClaimService) { }

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      this.claimToken = routeParams['claimToken'] || null;
    });
    this.email = this.route.snapshot.queryParams['email'];

    const host = window.location.hostname;

    this.hatName = host.substring(0, host.indexOf('.'));
    this.hatDomain = host.substring(host.indexOf('.') + 1);
  }

  nextStep(): void {
    if (this.step === 3) {
      this.optins = this.hatClaimSubscriptionsComponent.buildOptins();
      this.step++;
    } else if (this.step === 4) {
      if (this.password) {
        this.step++;
      }
    } else if (this.step === 5) {
      this.handleSubmission();
    } else if (this.step === 6) {
      this.goToLogin();
    } else if (this.step < this.STEP_COUNT) {
      this.step++;
    } else {
      // TODO: Display error
    }
  }

  previousStep(): void {
    // User shouldn't be able to go back if they already passed confirmation screen
    if (this.step > 1 && this.step < 6) {
      this.step--;
    } else {
      // TODO: Display error
    }
  }

  private buildClaimRequest(): HatClaimRequest {
    const claimMembership: ClaimMembership = {
      plan: 'partner',
      membershipType: 'claimed'
    };

    const claimRequest: HatClaimRequest = {
      firstName: '',
      lastName: '',
      email: this.email,
      termsAgreed: true,
      optins: this.optins,
      hatName: this.hatName,
      hatCluster: this.hatDomain,
      hatCountry: 'not used',
      password: this.password,
      membership: claimMembership,
      applicationId: 'not used'
    };

    return claimRequest;
  }

  handlePasswordUpdate(password: any): void {
    this.password = password;
  }

  handleSubmission(): void {
    const hatClaimRequest: HatClaimRequest = this.buildClaimRequest();
    this.hatClaimSvc.submitHatClaim(this.claimForm, this.claimToken, this.password, hatClaimRequest).subscribe(_ => {
      this.step++;
    });
  }

  goToLogin(): void {
    this.router.navigate(['/user', 'login']);
  }

}
