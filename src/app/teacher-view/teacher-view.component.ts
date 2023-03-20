import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css']
})

export class TeacherViewComponent {
  questions: { student: string, question: string }[] = [
    { student: 'Abbas', question: '...' },
    { student: 'Riley', question: '...' },
    { student: 'Nick', question: '...' },
  ]

  // Not sure if needed: panelOpenState = false;
}