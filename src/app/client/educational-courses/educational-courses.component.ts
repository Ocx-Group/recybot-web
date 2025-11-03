import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-educational-courses',
    templateUrl: './educational-courses.component.html',
    styleUrls: ['./educational-courses.component.sass'],
    standalone: false
})
export class EducationalCoursesComponent implements OnInit {
  active;

  constructor() {
  }

  ngOnInit(): void {

  }

  onTabChange(newActive: number) {
    this.active = newActive;
  }
}
