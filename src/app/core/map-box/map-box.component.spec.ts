import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBoxComponent } from './map-box.component';
import { MapComponent } from '../../locations/map/map.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { MomentPipe } from '../../shared/pipes/moment.pipe';

xdescribe('MapBoxComponent', () => {
  let component: MapBoxComponent;
  let fixture: ComponentFixture<MapBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapBoxComponent, MapComponent, SpinnerComponent, MomentPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
