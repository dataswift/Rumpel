import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheFeedRollupComponent } from './she-feed-rollup.component';
import { SheFeedItemComponent } from '../../shared/components/she-feed-item/she-feed-item.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { MomentPipe } from '../../shared/pipes/moment.pipe';
import {SheFeedWeeklySummaryModule} from '../../shared/components/she-feed-weekly-summary/she-feed-weekly-summary.module';

describe('SheFeedRollupComponent', () => {
  let component: SheFeedRollupComponent;
  let fixture: ComponentFixture<SheFeedRollupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule, SheFeedWeeklySummaryModule ],
      declarations: [ SheFeedRollupComponent, SheFeedItemComponent, MomentPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheFeedRollupComponent);
    component = fixture.componentInstance;
    component.sheFeed = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
