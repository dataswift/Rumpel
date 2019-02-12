import { Component, OnInit } from '@angular/core';
import { HatClaimService } from "../hat-claim.service";

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

  constructor(private hatClaimSvc: HatClaimService) { }

  ngOnInit() {
  }

  nextStep(): void {
    if (this.step === 5) {
      // Display loading page?
      this.hatClaimSvc.submitHatClaim(this.claimForm).subscribe(() => this.step++);
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
