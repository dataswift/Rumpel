import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsViewComponent } from './locations-view.component';

describe('LocationsViewComponent', () => {
  let component: LocationsViewComponent;
  let fixture: ComponentFixture<LocationsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
