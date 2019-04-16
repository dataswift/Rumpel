import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HatAppHmiContentComponent } from './hat-app-hmi-content.component';
import { SafeHtmlPipe } from '../../pipes';


describe('HatAppHmiContentComponent', () => {
  let component: HatAppHmiContentComponent;
  let fixture: ComponentFixture<HatAppHmiContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HatAppHmiContentComponent, SafeHtmlPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatAppHmiContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
