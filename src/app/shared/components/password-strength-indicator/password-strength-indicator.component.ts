import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

declare const zxcvbn: any;

@Component({
  selector: 'rum-password-strength-indicator',
  templateUrl: './password-strength-indicator.component.html',
  styleUrls: ['./password-strength-indicator.component.scss']
})
export class PasswordStrengthIndicatorComponent implements OnInit, OnChanges {
  public colorMapping = ['red', 'red', 'orange', 'green', 'green'];
  public evaluationMapping = ['Too guessable', 'Weak', 'So-so', 'Strong', 'Very Strong'];

  @Output() public passwordStrength = new EventEmitter<any>();
  @Input() password: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.password.currentValue) {
      this.analysePassword(this.password);
    }
  }

  ngOnInit() {
  }

  analysePassword(password: string): void {
    this.passwordStrength.emit(zxcvbn(password));
  }
}
