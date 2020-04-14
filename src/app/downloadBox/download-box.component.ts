import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AudioPlayerService } from '../../audio-player.service';
import { EncryptDecryptServicesService } from '../services/encrypt-decrypt-services.service';

@Component({
  selector: 'app-download-box',
  templateUrl: './download-box.component.html',
  styleUrls: ['./download-box.component.css']
})
export class DownloadBoxComponent implements OnInit {

  constructor(
    private _audioPLayer : AudioPlayerService,
    private _encryptDecryptService : EncryptDecryptServicesService
  ) { }

  currentSong;
  audioPlayer = [];
  playSong: boolean = true;
  isLoading: boolean = false;

  startPLaying(index){; 
    this._audioPLayer.startPLaying(this.downloadedList[index].title,this.downloadedList[index].name);
  }
  
  onGoingSong(){
    let source = this._audioPLayer.isPlayingAudio();
    let songState = this._audioPLayer.checkSongState();
    if(source && this.downloadedList){
      for(let i=0;i<this.downloadedList.length;i++){
        if(source == this.downloadedList[i].title){
          if(songState == false)
            this.playSong = false;
          else
            this.playSong = true;
          break;  
        }
      }
    }
  }

  downloadedList;
  audioFlag: boolean[];
  isSongOn: boolean;
  ngOnInit() {
    let onGoingSong = this._audioPLayer.isPlayingAudio();
    if(onGoingSong){
      this.isSongOn = true;  
    }
    else{
      this.isSongOn = false;
    }
  }

  db;
  ngAfterViewInit(){
    let request = window.indexedDB.open('musicthon',1);
    let flag;
    request.onerror = () => {
      console.log('Database failed to open');
    }

    request.onsuccess = () => {
      this.db = request.result;
      this.readAll();
    }
  }

  decryptSongs(data){
    data.title = this._encryptDecryptService.decryptData(data.title); 
    return data;
  }

  numberOfSongs;
  readAll() {
    var objectStore = this.db.transaction("music_01").objectStore("music_01");

    var storelength;
    var downloadeddata = [];
    objectStore.count().onsuccess = (event) => {
      storelength = event.target.result;
      this.numberOfSongs = storelength;
      for(let i=0;i<storelength;i++){
        objectStore.get(i+1).onsuccess = (event) => {
          console.log('Calling Decrypt Songs');
          downloadeddata.push(this.decryptSongs(event.target.result));
          console.log('Decryption Complete');
          if(i == storelength-1){
            if(this.isSongOn){
              this.onGoingSong();
            }
          }
        };
      }
      this.downloadedList = downloadeddata;
      this._audioPLayer.listOfSongs(this.downloadedList);
    }
  }

}
