import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSpaceComponent } from './private-space.component';

describe('PrivateSpaceComponent', () => {
  let component: PrivateSpaceComponent;
  let fixture: ComponentFixture<PrivateSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
