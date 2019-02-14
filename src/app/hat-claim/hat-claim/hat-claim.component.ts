import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { HatClaimService } from "../hat-claim.service";
import {HatClaimDetailsComponent} from "../hat-claim-details/hat-claim-details.component";
import {ActivatedRoute, Router} from "@angular/router";
import {HatClaimNewPasswordComponent} from "../hat-claim-new-password/hat-claim-new-password.component";

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

  @ViewChild(HatClaimNewPasswordComponent)
  private hatClaimNewPasswordComponent: HatClaimNewPasswordComponent;

  constructor(private route: ActivatedRoute, private hatClaimSvc: HatClaimService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      this.claimToken = routeParams['claimToken'] || null;
    });
    this.email = this.route.snapshot.queryParams['email'];
  }

  nextStep(): void {
    //console.log(this.hatClaimDetailsComponent.email);
    if (this.step === 3) {
      if (this.hatClaimNewPasswordComponent.checkPassword()) this.step++;
    } else if (this.step === 5) {
      var password: string = this.hatClaimNewPasswordComponent.getPassword();
      // Display loading page?
      this.hatClaimSvc.submitHatClaim(this.claimForm, this.claimToken, password).subscribe(() => {
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

}

interface HatClaimRequest {
  email: string;
  termsAgreed: boolean;
  optins?: string[];
  hatName: string;
  hatCluster: string;
  hatCountry?: string;
  password?: string;
  membership: any;
}
