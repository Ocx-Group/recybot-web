import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss',],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(100%)'
      })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [ToastrService],
})
export class LandingPageComponent implements OnInit {
  isNavbarVisible = false;

  constructor(private router: Router) { }

  navigateToSignup() {
    this.router.navigate(['/signup/andreshts'])
  }

  ngOnInit() {
  }

  onSubmit() {
  }

  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

}

