import {Component, Input} from '@angular/core';

@Component({
    selector: 'rump-offer-requirements',
    templateUrl: './offer-requirements.component.html',
    styleUrls: ['./offer-requirements.component.scss']
})
export class OfferRequirementsComponent {
    @Input() requirements: Array<any>;
}
