import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HmiPermissionsListComponent } from './hmi-permissions-list.component';
import { SafeHtmlPipe } from '../../shared/pipes';


describe('HmiPermissionsListComponent', () => {
  let component: HmiPermissionsListComponent;
  let fixture: ComponentFixture<HmiPermissionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmiPermissionsListComponent, SafeHtmlPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmiPermissionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
