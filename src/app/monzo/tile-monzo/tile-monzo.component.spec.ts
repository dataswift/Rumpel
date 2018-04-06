import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileMonzoComponent } from './tile-monzo.component';
import {MonzoService} from '../monzo.service';
import {Observable} from 'rxjs/Observable';

xdescribe('TileMonzoComponent', () => {
  let component: TileMonzoComponent;
  let fixture: ComponentFixture<TileMonzoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileMonzoComponent ],
      providers: [
        { provide: MonzoService, useValue: { data$: Observable.of([]) } }
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
