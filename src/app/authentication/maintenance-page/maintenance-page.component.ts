import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance-page.component.html',
  styleUrls: ['./maintenance-page.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class MaintenancePageComponent {
  constructor() {}
}
