import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HatApplicationListComponent } from './hat-application-list.component';

describe('HatApplicationListComponent', () => {
  let component: HatApplicationListComponent;
  let fixture: ComponentFixture<HatApplicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HatApplicationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
