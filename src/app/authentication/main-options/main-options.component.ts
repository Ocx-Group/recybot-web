import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-options',
  templateUrl: './main-options.component.html',
  styleUrls: ['./main-options.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MainOptionsComponent {
  userName: string;

  constructor(
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
  ) {
    this.userName = this.activateRoute.snapshot.paramMap.get('userName');
  }

  backToTop() {
    this.router.navigate(['/signin']);
  }

  goToRegister() {
    this.router.navigate([`/signup/${this.userName}`]);
  }
}
