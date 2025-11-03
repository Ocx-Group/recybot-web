import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-savings-plans-one-b',
    templateUrl: './savings-plans-one-b.component.html',
    styleUrls: ['./savings-plans-one-b.component.sass'],
    standalone: true,
    imports: [CommonModule]
})
export class SavingsPlansOneBComponent {
  active: number = 6;
}
