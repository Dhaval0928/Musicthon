import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptServicesService {

  constructor() { }

  Password: string = '#98l@v@HDmu$ic!2*2*'; 
  encryptData(data){
    let EncryptOutput = CryptoJS.AES.encrypt(data, this.Password.trim()).toString();  
    return EncryptOutput;
  }

  decryptData(data){
    let DecryptOutput = CryptoJS.AES.decrypt(data.toString(), this.Password.trim()).toString(CryptoJS.enc.Utf8);
    return DecryptOutput;
  }
}
