import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-savings-plans',
    templateUrl: './savings-plans.component.html',
    styleUrls: ['./savings-plans.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class SavingsPlansComponent implements OnInit {
  active: number = 9;

  constructor() { }

  ngOnInit() {
  }
}
