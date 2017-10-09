import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'rump-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  public destroy: Function;
  public animateIn = false;

  public filesToUpload: any;
  public uploadedFiles: Array<string> = [];

  public fileSelected = false;
  @Input() public accept: Function;

  constructor( private fileUploadSvc: FileUploadService ) { }

  ngOnInit() {
    this.animateIn = true;
  }

  selectFile(fileInput: any) {
    this.fileSelected = true;
    this.filesToUpload = fileInput.target.files;
  }

  startUpload() {
    if (this.filesToUpload && this.filesToUpload[0]) {
        const file = this.filesToUpload[0];
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
