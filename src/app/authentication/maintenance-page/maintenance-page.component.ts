import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance-page.component.html',
  styleUrls: ['./maintenance-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class MaintenancePageComponent {
  constructor() {}
}
