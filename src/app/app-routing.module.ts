import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DownloadBoxComponent } from './downloadBox/download-box.component';
import { UploadBoxComponent } from './uploadBox/upload-box.component';


const routes: Route[] = [
  {path : '' , component : HomeComponent},
  {path : 'download' , component : DownloadBoxComponent},
  {path : 'upload' , component : UploadBoxComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
