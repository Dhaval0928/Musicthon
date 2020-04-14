import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { AngularFireStorage,AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage'; 

@Component({
  selector: 'app-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.css']
})
export class UploadBoxComponent implements OnInit {

  constructor(
    private _homeservice : HomeService, 
    private afstorage : AngularFireStorage,
    private _router : Router
  ) { }

  firestoreData;

  tempdataholder;
  downloadURL;
  songslist;
  upload(event){
    this.tempdataholder = this._homeservice.uploadItems(event.target.files[0]);
    this.afstorage.ref('songs').child(this.tempdataholder).getDownloadURL().subscribe( (url) => {
      this.downloadURL = url;  
      const reader = new FileReader();
      reader.onload = (event) => {  
        let data = [];
        let i=0;
        if(reader.result.toString().length > 100000){
          for(i=0;i<reader.result.toString().length;i+=100000){
            data.push(reader.result.toString().slice(i,i+100000));
          }
        }
        const songs = {
          'name' : this.tempdataholder,
          'url' : this.downloadURL,
          'data' : data
        }
        this._homeservice.storeToBD(songs);
        this._router.navigate(['/']);
      }
      reader.readAsDataURL(event.target.files[0]);
    });
  }

  ngOnInit() {
  }

}
