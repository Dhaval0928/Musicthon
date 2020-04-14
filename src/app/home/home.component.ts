import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireStorage,AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage'; 
import { HomeService } from '../services/home.service';
import { EncryptDecryptServicesService } from '../services/encrypt-decrypt-services.service';
import { AudioPlayerService } from '../../audio-player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _homeservice : HomeService, 
    private afstorage : AngularFireStorage,
    private _encryptDecryptService : EncryptDecryptServicesService,
    private _audioPlayer : AudioPlayerService
  ) { }

  isLoading: boolean = false;
  firestoreData;

  tempdataholder;
  downloadURL;
  songslist;
  
  list(){
    this.isLoading = true;
    let temporary = this._homeservice.getFromDB();
      this._homeservice.databaseList.snapshotChanges().subscribe(
        (list) => {
          this.songslist = list.map(song => {return song.payload.val();});
          //console.log("Here is the songsList",this.songslist);
          this.intializeAudioPLayer();
          this.isLoading = false;
        } 
      )
  }

  currentSong;
  audioPlayer = [];
  playSong: boolean = false;

  startPLaying(index){
    this._audioPlayer.startPLaying(this.songslist[index].title,this.songslist[index].name);
  }

  intializeAudioPLayer(){
    for(let i=0;i<this.songslist.length;i++){
      this.songslist[i].name = this.songslist[i].name.split('.').slice(0,-1);
      let totaldata = '';
      for(let j=0;j<this.songslist[i].data.length;j++){
         totaldata =  totaldata + this.songslist[i].data[j];
      }
      this.songslist[i].title = totaldata;
    }
    this._audioPlayer.listOfSongs(this.songslist);
  }


  isDownloading: boolean = false;
  downloadSong(index){
    var w = document.getElementById('downloadFlag');
    w.hidden = false;
    let songdata = '';
    for(let i=0;i<this.songslist[index].data.length;i++){
      songdata = songdata + this.songslist[index].data[i];
    }
    songdata = this._encryptDecryptService.encryptData(songdata);
    setTimeout(() => {w.hidden = true},1000)
    this.addDataToDB(songdata,this.songslist[index].name);
  }

  audioFlag: boolean[];
  ngOnInit() {
    this.isDownloading = false;
    this.list();
  }
  //IndexedDB
  db;
  addDataToDB(song,songname){
    let newItem = {
      'title' : song,
      'name': songname
    }
    var transaction = this.db.transaction('music_01','readwrite');

    transaction.onsuccess = () => {
      console.log("Transaction Done");
    }

    var testStore = transaction.objectStore('music_01');
    var product = testStore.add(newItem);
    product.onsuccess = () => {
      console.log("Item Added");
    }

    product.onerror = () => {
      console.log("add operation failed");
    }
  }
  
  ngAfterViewInit(){
    let request = window.indexedDB.open('musicthon',1);
    let flag;
    request.onerror = () => {
      console.log('Database failed to open');
    }

    request.onsuccess = () => {
      console.log('Database opened successfully');
      this.db = request.result;
    }

    request.onupgradeneeded = ($request) => {
      console.log("request.onupgradeNeeded" , flag);
        let db = request.result;
        let object = db.createObjectStore('music_01',{ keyPath : 'id', autoIncrement : true});

        object.createIndex('title','name',{unique : true});

        console.log("Database setup Completed");
    }
  }
}

