import {Component, Input} from '@angular/core';
import {OfferRequirement} from '../offer-requirements.interface';

@Component({
    selector: 'rump-offer-requirements',
    templateUrl: './offer-requirements.component.html',
    styleUrls: ['./offer-requirements.component.scss']
})
export class OfferRequirementsComponent {
    @Input() requirements: OfferRequirement;
}
