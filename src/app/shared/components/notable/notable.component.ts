import {Component, OnInit, Input, Output, Inject, EventEmitter} from '@angular/core';
import {APP_CONFIG, IAppConfig} from "../../../app.config";
import {Notable} from "../../interfaces/notable.class";

@Component({
  selector: 'rump-notable',
  templateUrl: './notable.component.html',
  styleUrls: ['./notable.component.scss']
})
export class NotableComponent implements OnInit {
  @Input() notable: Notable;
  @Input() modifiable: boolean = false;
  @Output() change: EventEmitter<{ action: string; notable: Notable; }> = new EventEmitter();

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,) { }

  ngOnInit() {
  }

  edit() {
    this.change.emit({ action: "edit", notable: this.notable });
  }

  remove() {
    this.change.emit({ action: "remove", notable: this.notable });
  }

  getIconName(): string {
    return this.config.notables.iconMap[this.notable.kind];
  }

  getLogo(name: string): string {
    const foundIntegration = this.config.notables.activeIntegrations.find(integration => integration.name === name);
    return foundIntegration ? foundIntegration.logoUrl : "";
  }

}
