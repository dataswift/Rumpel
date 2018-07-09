import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileFitbitComponent } from './tile-fitbit.component';
import { RemoveCharsPipe } from '../../shared/pipes/removeChars.pipe';
import { FitbitActivitySummaryService } from '../services/fitbit-activity-summary.service';
import { of } from 'rxjs';

describe('TileFitbitComponent', () => {
  let component: TileFitbitComponent;
  let fixture: ComponentFixture<TileFitbitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileFitbitComponent, RemoveCharsPipe ],
      providers: [
        { provide: FitbitActivitySummaryService, useValue: { data$: of([]) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileFitbitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
