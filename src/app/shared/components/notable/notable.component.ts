import { Component, OnInit, Input, Output, Inject, EventEmitter, OnDestroy } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { Subscription } from 'rxjs/Subscription';
import { DataPlugService } from '../../../data-management/data-plug.service';
import { Notable } from '../../interfaces/notable.class';
import { HatRecord } from '../../interfaces/hat-record.interface';
import { DataPlug } from '../../interfaces/data-plug.interface';

@Component({
  selector: 'rum-notable',
  templateUrl: './notable.component.html',
  styleUrls: ['./notable.component.scss']
})
export class NotableComponent implements OnInit, OnDestroy {
  @Input() notable: HatRecord<Notable>;
  @Input() modifiable = false;
  @Output() change: EventEmitter<{ action: string; notable: HatRecord<Notable>; }> = new EventEmitter();

  private notablesPlugs: DataPlug[] = [];
  private sub: Subscription;

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private dataPlugSvc: DataPlugService) { }

  ngOnInit() {
    this.sub = this.dataPlugSvc.notablesEnabledPlugs$.subscribe(plugs => this.notablesPlugs = plugs);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
    } else {
      const foundPlug = this.notablesPlugs.find(plug => plug.name.toLowerCase() === name);

      return foundPlug ? foundPlug.illustrationUrl : '/assets/images/help.svg';
    }
  }

}
