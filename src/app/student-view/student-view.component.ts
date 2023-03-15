import { Component, OnInit } from '@angular/core';
import { DataBackendService } from '../services/data-backend.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
  providers: [
    { provide: 'name', useValue: 'container' },
  ]
})

export class StudentViewComponent implements OnInit {
  constructor(private comm_backend: DataBackendService) { }

  ngOnInit() {
    this.comm_backend.GetUsernameTest().then(username => {
      this.name = username;
    })
  }

  name = "default";
}
