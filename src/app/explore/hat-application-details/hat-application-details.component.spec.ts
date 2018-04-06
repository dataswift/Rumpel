import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HatApplicationDetailsComponent } from './hat-application-details.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';

xdescribe('HatApplicationDetailsComponent', () => {
  let component: HatApplicationDetailsComponent;
  let fixture: ComponentFixture<HatApplicationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ HatApplicationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
