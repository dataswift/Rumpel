import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileMonzoComponent } from './tile-monzo.component';
import { MonzoService } from '../monzo.service';
import { of } from 'rxjs';

xdescribe('TileMonzoComponent', () => {
  let component: TileMonzoComponent;
  let fixture: ComponentFixture<TileMonzoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileMonzoComponent ],
      providers: [
        { provide: MonzoService, useValue: { data$: of([]) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileMonzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
