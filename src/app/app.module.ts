import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { HomeComponent } from './home/home.component';
import { DownloadBoxComponent } from './downloadBox/download-box.component';
import { HomeService } from './services/home.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { UploadBoxComponent } from './uploadBox/upload-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DownloadBoxComponent,
    UploadBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
