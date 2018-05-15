import { Component, OnInit, Input, Output, Inject, EventEmitter } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { Notable } from '../../interfaces/notable.class';
import { HatRecord } from '../../interfaces/hat-record.interface';

@Component({
  selector: 'rum-notable',
  templateUrl: './notable.component.html',
  styleUrls: ['./notable.component.scss']
})
export class NotableComponent implements OnInit {
  @Input() notable: HatRecord<Notable>;
  @Input() modifiable = false;
  @Output() change: EventEmitter<{ action: string; notable: HatRecord<Notable>; }> = new EventEmitter();

  constructor(@Inject(APP_CONFIG) private config: AppConfig) { }

  ngOnInit() {
  }

  edit() {
    this.change.emit({ action: 'edit', notable: this.notable });
  }

  remove() {
    this.change.emit({ action: 'remove', notable: this.notable });
  }

  getIconName(): string {
    return this.config.notables.iconMap[this.notable.data.kind];
  }

  getLogo(name: string): string {
    if (name === 'phata' || name === 'hatters') {
      return '/assets/icons/hatters-icon.png';
    } else if (name === 'facebook' || name === 'twitter') {
      return `/assets/icons/${name}-icon.png`
    } else {
      return '/assets/images/help.svg';
    }
  }

}
