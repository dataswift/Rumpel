import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPlugStaticComponent } from './data-plug-static.component';

describe('DataPlugStaticComponent', () => {
  let component: DataPlugStaticComponent;
  let fixture: ComponentFixture<DataPlugStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPlugStaticComponent ]
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
