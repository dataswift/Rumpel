import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[outside-click]',
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class OutsideClick {
  constructor(private _elementRef: ElementRef) {}

  @Output() clickOutside = new EventEmitter<any>();

  onClick(event) {
    const clickedInside = this._elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}
