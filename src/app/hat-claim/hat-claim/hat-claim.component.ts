import { Component, OnInit, ViewChild } from '@angular/core';
import { HatClaimService } from '../hat-claim.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HatClaimNewPasswordComponent } from '../hat-claim-new-password/hat-claim-new-password.component';
import { HatClaimSubscriptionsComponent } from '../hat-claim-subscriptions/hat-claim-subscriptions.component';
import { HatClaimRequest } from '../../shared/interfaces/hat-claim.interface';

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
  public errorMessage: string;

  @ViewChild(HatClaimNewPasswordComponent, { static: true })
  private hatClaimNewPasswordComponent!: HatClaimNewPasswordComponent;


  @ViewChild(HatClaimSubscriptionsComponent, { static: true })
  private hatClaimSubscriptionsComponent: HatClaimSubscriptionsComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private hatClaimSvc: HatClaimService) { }

  ngOnInit() {
    this.email = this.route.snapshot.queryParams['email'];
    this.claimToken = this.route.snapshot.params['claimToken'];

    const host = window.location.hostname;

    this.hatName = host.substring(0, host.indexOf('.'));
    this.hatDomain = host.substring(host.indexOf('.') + 1);
  }

  nextStep(): void {
    if (this.step === 1) {
      if (this.email) {
        this.step++
      }
    } else if (this.step === 3) {
      if (this.password) {
        this.step++;
      }
    } else if (this.step === 4) {
      this.step++;
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

  handleOptinsUpdate(optins: string[]): void {
    this.optins = optins;
  }

  previousStep(): void {
    // User shouldn't be able to go back if they already passed confirmation screen
    if (this.step > 1 && this.step < 6) {
      this.step--;
    } else {
      // TODO: Display error
    }
  }

  handlePasswordUpdate(password: any): void {
    this.password = password;
  }

  handleSubmission(): void {
    const hatClaimRequest: HatClaimRequest = this.buildClaimRequest();
    this.hatClaimSvc.submitHatClaim(this.claimToken, hatClaimRequest).subscribe(_ => {
      this.step++;
    }, error => this.errorMessage = error);
  }

  goToLogin(): void {
    this.router.navigate(['/user', 'login']);
  }

  private buildClaimRequest(): HatClaimRequest {
    const claimRequest: HatClaimRequest = {
      email: this.email,
      termsAgreed: true,
      optins: this.optins,
      hatName: this.hatName,
      hatCluster: this.hatDomain,
      password: this.password
    };

    return claimRequest;
  }

}
