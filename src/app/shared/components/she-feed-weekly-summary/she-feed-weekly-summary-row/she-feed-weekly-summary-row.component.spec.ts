import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheFeedWeeklySummaryRowComponent } from './she-feed-weekly-summary-row.component';

describe('SheFeedWeeklySummaryRowComponent', () => {
  let component: SheFeedWeeklySummaryRowComponent;
  let fixture: ComponentFixture<SheFeedWeeklySummaryRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheFeedWeeklySummaryRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheFeedWeeklySummaryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
