import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataComponentService {

  constructor(public router: Router, private http: HttpClient) { }

  professorFirstName: string | undefined;
  professorLastName: string | undefined;

  // Data Communication between component
  Navigate(component: string){
    this.router.navigate([component])
  }
}
