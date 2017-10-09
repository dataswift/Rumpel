import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'rump-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  private destroy: Function;
  private animateIn = false;
  public uploadedFiles: Array<string> = [];
  @Input() accept: Function;

  constructor( private fileUploadSvc: FileUploadService ) { }

  ngOnInit() {
    this.animateIn = true;
  }

  startUpload(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
        const file = fileInput.target.files[0];
        this.fileUploadSvc.postFileUploadMetaData(file);
    }
  }

  acceptUpload() {
    if (this.accept) {
      this.accept(this.uploadedFiles);
    }
  }

  hideUI() {
    this.animateIn = false;

    setTimeout(() => {
      this.destroy();
    }, 1000);
  }

}
