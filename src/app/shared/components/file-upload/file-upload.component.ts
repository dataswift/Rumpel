import { Component, OnInit, Input } from '@angular/core';
import { HatApiV2Service } from '../../../services/hat-api-v2.service';

@Component({
  selector: 'rump-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  private destroy: Function;
  private animateIn = false;
  public uploadedFiles = ['https://static.comicvine.com/uploads/original/11111/111112793/3031477-nealadamsbatman.jpg', 'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/lbm%20characters/detail/70900_batman_detail_1488.jpg?l.r2=1504802140'];
  @Input() accept: Function;

  constructor( private hatV2Svc: HatApiV2Service ) { }

  ngOnInit() {
    this.animateIn = true;
  }

  startUpload(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
        const file = fileInput.target.files[0];
        this.hatV2Svc.postFileUploadMetaData(file);
    }
  }


  acceptUpload(){
    if(this.accept){
      this.accept(this.uploadedFiles);
    }
  }

  hideUI(){
    this.animateIn = false;

    setTimeout(() => {
      this.destroy();
    }, 1000);
  }

}
