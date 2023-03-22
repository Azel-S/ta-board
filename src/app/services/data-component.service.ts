import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataComponentService {

  constructor(public router: Router, private http: HttpClient) { 
    this.professorFirstName = 'Bruce';
    this.professorLastName = 'Banner';
  }

  professorFirstName: string | undefined;
  professorLastName: string | undefined;

  // Data Communication between component
  Navigate(component: string){
    this.router.navigate([component])
  }

  //==Setters==//
  SetFirstName(newFirstName: string){
    this.professorFirstName = newFirstName;
  }

  SetLastName(newLastName: string){
    this.professorLastName = newLastName;
  }

  //==Getters==//
  GetFirstName() : string | undefined{
    return this.professorFirstName;
  }

  GetLastName() : string | undefined{
    return this.professorLastName;
  }
}
