import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HatApplicationListComponent } from './hat-application-list.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { HatApplicationsService } from '../hat-applications.service';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';

describe('HatApplicationListComponent', () => {
  let component: HatApplicationListComponent;
  let fixture: ComponentFixture<HatApplicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule, RouterTestingModule ],
      declarations: [ HatApplicationListComponent ],
      providers: [
        { provide: HatApplicationsService, useValue: { getApplicationList: () => Observable.of([]) } }
      ]
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
