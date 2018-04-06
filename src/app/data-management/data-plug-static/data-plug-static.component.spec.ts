import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPlugStaticComponent } from './data-plug-static.component';
import { ActivatedRoute } from '@angular/router';
import { StaticDataService } from '../../services/static-data.service';
import { Observable } from 'rxjs/Observable';

describe('DataPlugStaticComponent', () => {
  let component: DataPlugStaticComponent;
  let fixture: ComponentFixture<DataPlugStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPlugStaticComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { parent: { params: Observable.of({ provider: 'test' }) }} },
        { provide: StaticDataService, useValue: { fetchData: () => null } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPlugStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
