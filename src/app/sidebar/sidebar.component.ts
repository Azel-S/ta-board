import { Component } from '@angular/core';
import { DataComponentService } from '../services/data-component.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  constructor(public serve_comm: DataComponentService) { }
}
