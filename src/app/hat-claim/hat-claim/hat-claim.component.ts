import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { HatClaimService } from "../hat-claim.service";
import {HatClaimDetailsComponent} from "../hat-claim-details/hat-claim-details.component";
import {ActivatedRoute, Router} from "@angular/router";
import {HatClaimNewPasswordComponent} from "../hat-claim-new-password/hat-claim-new-password.component";
import {Event} from "../../shared/interfaces";
import * as moment from "../../dimensions/facebook-events.service";
import {HatClaimSubscriptionsComponent} from "../hat-claim-subscriptions/hat-claim-subscriptions.component";
import {ClaimMembership, HatClaimRequest} from "../../shared/interfaces/hat-claim.interface";

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

  constructor(private route: ActivatedRoute, private hatClaimSvc: HatClaimService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      this.claimToken = routeParams['claimToken'] || null;
    });
    this.email = this.route.snapshot.queryParams['email'];

    const host = window.location.hostname;

    this.hatName = host.substring(0, host.indexOf('.'));
    this.hatDomain = host.substring(host.indexOf('.'));
  }

  nextStep(): void {
    if (this.step === 3) {
      if (this.hatClaimNewPasswordComponent.checkPassword()) {
        this.password = this.hatClaimNewPasswordComponent.getPassword();
        this.step++;
      } else {
        this.password = this.hatClaimNewPasswordComponent.getPassword();
        this.step++;
      }
    } else if (this.step === 4) {
      this.optins = this.hatClaimSubscriptionsComponent.buildOptins();
      this.step++;
    } else if (this.step === 5) {
      // Display loading page?
      let hatClaimRequest: HatClaimRequest = this.buildClaimRequest(this.email, this.optins, this.hatName, this.hatDomain);
      this.hatClaimSvc.submitHatClaim(this.claimForm, this.claimToken, this.password, hatClaimRequest).subscribe(() => {
        this.step++;
        this.router.navigate(['hat', 'claim', 'success']);
      });
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

  private buildClaimRequest(_email: string, _optins: string[], _hatName: string, _hatDomain: string): HatClaimRequest {
    const claimMembership: ClaimMembership = {
      plan: 'partner',
      membershipType: 'claimed'
    };

    const claimRequest: HatClaimRequest = {
      firstName: '',
      lastName: '',
      email: _email,
      termsAgreed: true,
      optins: _optins,
      hatName: _hatName,
      hatCluster: _hatDomain,
      hatCountry: 'not used',
      password: 'not used',
      membership: claimMembership,
      applicationId: 'not used'
    };

    return claimRequest;
  }

}
