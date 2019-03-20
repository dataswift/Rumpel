import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsListComponent } from './settings-list.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { RouterModule } from '@angular/router';
import { APP_CONFIG } from '../../app.config';


describe('SettingsListComponent', () => {
  let component: SettingsListComponent;
  let fixture: ComponentFixture<SettingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule, RouterModule ],
      declarations: [ SettingsListComponent ],
      providers: [
        { provide: APP_CONFIG, useValue: { mainMenu: [], appsMenu: [] } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
