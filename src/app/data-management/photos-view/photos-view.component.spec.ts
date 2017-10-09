import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosViewComponent } from './photos-view.component';

describe('PhotosViewComponent', () => {
  let component: PhotosViewComponent;
  let fixture: ComponentFixture<PhotosViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
