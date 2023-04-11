import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  saveData(key: string, data: any){
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string) {
    console.log('recObj: ', JSON.parse(localStorage.getItem(key)!));
    
    return JSON.parse(localStorage.getItem(key)!);
  }
}