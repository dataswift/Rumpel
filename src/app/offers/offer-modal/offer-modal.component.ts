import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rump-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})
export class OfferModalComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  private destroy: Function;

  constructor() { }

  ngOnInit() {
  }

  closeModal(): void {
    this.destroy();
  }

}
