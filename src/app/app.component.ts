import { Component } from '@angular/core';
import { DataComponentService } from './services/data-component.service';

@Component
  ({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })

export class AppComponent {
  constructor(public serve_comm: DataComponentService) { }

  title = 'TA-Bot';
}