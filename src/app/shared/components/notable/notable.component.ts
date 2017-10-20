import { Component, OnInit, Input, Output, Inject, EventEmitter } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../../app.config';
import { Notable } from '../../interfaces/notable.class';
import { HatRecord } from '../../interfaces/hat-record.interface';

@Component({
  selector: 'rump-notable',
  templateUrl: './notable.component.html',
  styleUrls: ['./notable.component.scss']
})
export class NotableComponent implements OnInit {
  @Input() notable: HatRecord<Notable>;
  @Input() modifiable = false;
  @Output() change: EventEmitter<{ action: string; notable: HatRecord<Notable>; }> = new EventEmitter();

  constructor(@Inject(APP_CONFIG) private config: IAppConfig) { }

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
    const foundIntegration = this.config.notables.activeIntegrations.find(integration => integration.name === name);

    return foundIntegration ? foundIntegration.logoUrl : '';
  }

}
