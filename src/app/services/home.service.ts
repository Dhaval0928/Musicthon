import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection ,AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage,AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';  
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  itemsCollection: AngularFirestoreCollection<Item>; 
  items: Observable<Item[]>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL;
  temp;

  constructor(
    public afs : AngularFirestore,
    public afstorage : AngularFireStorage,
    public afdatabase : AngularFireDatabase,
  ) {
    this.items = this.afs.collection('songs').valueChanges();
    this.databaseList = this.afdatabase.list('songs');
   }

   uploadItems(data){
    const id = data.name;
    this.ref = this.afstorage.ref('songs').child(id);
    this.task = this.ref.put(data);
    return id;
   }

   
  databaseList: AngularFireList<any>;
   storeToBD(song){
     console.log("in storetoDB function");
     this.databaseList.push(song);
   }

   getFromDB(){
     return this.afdatabase.list('songs');
   }

   getItems(){
     return this.items;
   }

   getStoreItems(){
      return this.ref;
   }

   downloaddata;
   setdownloadItems(data){
    this.downloaddata = data;
   }

   getdownloadItems(){
     return this.downloaddata;
   }
  
}

interface Item{
  id? : string;
  name? : string;
}