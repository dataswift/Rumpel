import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import { FileService } from '../../services/file.service';
import { of } from 'rxjs';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  const fileServiceMock = {
    file$: of('')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadComponent ],
      providers: [{ provide: FileService, useValue: fileServiceMock }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
