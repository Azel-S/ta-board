import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataComponentService } from '../services/data-component.service';

// FormControl
import { FormControl, Validators } from '@angular/forms';

@Component
  ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

export class LoginComponent {
  constructor(private comm_component: DataComponentService) { }
  
  // Input fields
  courseID: string | undefined;
  username: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  
  studentLogin(){
    if (this.courseID == 'admin'){
      this.comm_component.Navigate('student-view');
    }
    // Else if
  }

  teacherLogin(){
    if(this.username == 'admin'){
      this.comm_component.Navigate('teacher-view');
    }
  }

  reg(credentials: { username: string, password: string }){
    this.comm_component.register(credentials);
  }

  //===INPUT ERRORS===//
  //==Student==//
  courseIDFormControl = new FormControl('', [Validators.required]);
  //==Teacher==//
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  //==Register==//
  confirmPasswordFormControl = new FormControl('', [Validators.required]);

}