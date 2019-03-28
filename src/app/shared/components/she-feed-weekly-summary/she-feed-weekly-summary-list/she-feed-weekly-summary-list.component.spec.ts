import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheFeedWeeklySummaryListComponent } from './she-feed-weekly-summary-list.component';
import {CustomAngularMaterialModule} from '../../../../core/custom-angular-material.module';

describe('SheFeedWeeklySummaryListComponent', () => {
  let component: SheFeedWeeklySummaryListComponent;
  let fixture: ComponentFixture<SheFeedWeeklySummaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ SheFeedWeeklySummaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheFeedWeeklySummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
