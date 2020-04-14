import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

  songsList;
  constructor() {
    this.prevSong();
    this.nextsong();
    this.playSong();
  }

  listOfSongs(data){
    this.songsList = data;
  }

  playIcon;
  playSong(){
    this.playIcon = document.getElementById('playIcon');
    this.playIcon.style.color = "white";
    this.playIcon.style = "cursor: pointer";
    this.playIcon.hidden = true;
    this.playIcon.addEventListener('click', () => {
      this.toggleAudio();
    })
  }

  leftIcon;
  prevSong(){
    this.leftIcon = document.getElementById('leftIcon');
    this.leftIcon.style.color = "white";
    this.leftIcon.className = "fa fa-chevron-circle-left fa-lg";
    this.leftIcon.hidden = true;
    this.leftIcon.addEventListener('click', () => {
      this.playPrevSong(this.audioPlayer.src);
    })
  }

  playPrevSong(source){
    let index;
    for(let i=0;i<this.songsList.length;i++){
      index = (i-1);
      if(i <= 0){
        index = this.songsList.length-1;
      }  
      if(this.songsList[i].title.includes(source)){
        this.startPLaying(this.songsList[index].title,this.songsList[index].name);
      }
    }
  }

  rightIcon;
  nextsong(){
    this.rightIcon = document.getElementById('rightIcon');
    this.rightIcon.style.color = "white";
    this.rightIcon.className = "fa fa-chevron-circle-right fa-lg";
    this.rightIcon.hidden = true;
    this.rightIcon.addEventListener('click', () => {
      this.playNextSong(this.audioPlayer.src);
    })
  }

  playNextSong(source){
    let index;
    for(let i=0;i<this.songsList.length;i++){
      index = (i+1)%this.songsList.length;
      if(this.songsList[i].title.includes(source)){
        // console.log(index);
        this.startPLaying(this.songsList[index].title,this.songsList[index].name);
      }
    }
  }

  //Audio PLayer
  audioPlayer;
  songState: boolean = true;
  toggleAudio(){  
    if(this.songState){
      this.audioPlayer.play();
      this.playIcon.className = "fa fa-pause";
      this.songState = false;
    }
    else{
      this.audioPlayer.pause();
      this.playIcon.className = "fa fa-play";
      this.songState = true;
    }
  }

  playAudio(){
    this.audioPlayer.currentTime = 0;
    this.audioPlayer.play();
  }

  isPlayingAudio(){
    if(this.audioPlayer){
      return this.audioPlayer.src;
    }
  }

  checkSongState(){
    return this.songState;
  }

  startPLaying(source,name){
    this.leftIcon.hidden = false;
    this.rightIcon.hidden = false;
    this.playIcon.hidden = false;
    this.playIcon.className = "fa fa-pause";
    var songName = document.getElementById('songName');
    songName.innerHTML = name;
    if(this.audioPlayer){
      this.audioPlayer.pause();
    }
    this.audioPlayer;
    let audiotemp = new Audio();
    audiotemp.src = source;
    audiotemp.load();
    audiotemp.controls = true;
    this.audioPlayer = audiotemp;
    this.audioPlayer.autoplay = true;
    this.songState = false;
    var zz = document.getElementById('demo2');
    audiotemp.addEventListener('play',() => {
        var minutes = Math.floor(audiotemp.duration / 60);
        var seconds = ((audiotemp.duration % 60)).toFixed(0);
        zz.innerHTML = minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
    } )
    var z = document.getElementById('demo1')
    var progBar = document.getElementById('progressBar');
    progBar.style.color = 'white';
    audiotemp.ontimeupdate = function time(){ 
        var minutes = Math.floor(audiotemp.currentTime / 60);
        var seconds = ((audiotemp.currentTime % 60)).toFixed(0);
        z.innerHTML = minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
        progBar.style.width = (((audiotemp.currentTime*100)/(audiotemp.duration)).toFixed(0).toString()+'%').toString(); 
    };
  }
}
