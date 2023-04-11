import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public saveData(data: any){
    //var status={ l: loggedIn, s: JSON.stringify(serial), c: JSON.stringify(course) };
    
    localStorage.setItem('status', JSON.stringify(data));
    // var testObject ={name:"test", time:"Date 2017-02-03T08:38:04.449Z"};
    // localStorage.setItem('testObject', JSON.stringify(testObject));
  }

  public getData(key: string) {
    
    console.log(JSON.parse(localStorage.getItem('status')));
    
    //const recObj = localStorage.getItem('status');
    //const loggedInObj = 
    // var retrievedObject = localStorage.getItem('testObject');
    // console.log('retrievedObject: ', JSON.parse(retrievedObject));
  }
}