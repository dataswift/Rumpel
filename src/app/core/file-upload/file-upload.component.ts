import { Component, OnInit, Input } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'rum-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  public destroy: Function;
  public animateIn = false;

  public uploadedFiles: Array<string> = [];

  public selectedFile: File;
  @Input() public accept: Function;

  constructor(private fileSvc: FileService) { }

  ngOnInit() {
    this.animateIn = true;

    this.fileSvc.file$.subscribe(_ => this.hideUI());
  }

  selectFile(fileInput: any): void {
    const selectedFiles: File[] = fileInput.target.files;

    if (selectedFiles.length > 0) {
      this.selectedFile = selectedFiles[0];
      this.fileSvc.setFileReader(this.selectedFile)
    }
  }

  startUpload() {
    this.fileSvc.initUpload(this.selectedFile);
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
