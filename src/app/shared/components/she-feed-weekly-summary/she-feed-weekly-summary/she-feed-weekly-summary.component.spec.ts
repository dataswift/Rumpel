import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheFeedWeeklySummaryComponent } from './she-feed-weekly-summary.component';
import {InsightWeeklySummaryPipe} from '../../../pipes';
import {SheFeedWeeklySummaryListComponent} from '../she-feed-weekly-summary-list/she-feed-weekly-summary-list.component';
import {CustomAngularMaterialModule} from '../../../../core/custom-angular-material.module';

describe('SheFeedWeeklySummaryComponent', () => {
  let component: SheFeedWeeklySummaryComponent;
  let fixture: ComponentFixture<SheFeedWeeklySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomAngularMaterialModule],
      declarations: [ SheFeedWeeklySummaryComponent, InsightWeeklySummaryPipe, SheFeedWeeklySummaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheFeedWeeklySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
