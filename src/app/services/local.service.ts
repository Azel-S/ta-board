import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public saveData(loggedIn: string, serial: number, course: number){
    localStorage.setItem(loggedIn, JSON.stringify(serial));
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }
}