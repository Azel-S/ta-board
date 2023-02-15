import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css']
})

export class TeacherViewComponent {
  questions: { student: string, question: string }[] = [
    { student: 'Abbas', question: 'Why the sigh?' },
    { student: 'Riley', question: 'Heres a tutorial for ya' },
    { student: 'Nick', question: '...' },
  ]

  panelOpenState = false;
}