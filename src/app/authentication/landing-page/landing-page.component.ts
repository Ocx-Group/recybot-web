import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { AffiliateService } from '@app/core/service/affiliate-service/affiliate.service';
import { AuthService } from '@app/core/service/authentication-service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingPageComponent implements OnInit {
  isNavbarVisible = false;
  currentLang = 'en';
  isLanguageDropdownOpen = false;
  user: UserAffiliate | null = null;

  constructor(
    private readonly translate: TranslateService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly affiliateService: AffiliateService,
    private readonly authService: AuthService,
  ) {
    translate.setFallbackLang('en');
    this.currentLang = translate.getCurrentLang() || 'en';
    const key = this.activatedRoute.snapshot.params.key as string;

    const loggedUser = this.authService.userAffiliate();
    if (loggedUser) {
      this.user = loggedUser;
    } else if (key) {
      this.getUserByUsername(key);
    }
  }

  ngOnInit() {
    const savedLang = localStorage.getItem('lang');
    this.changeLanguage(savedLang ?? 'en');
  }

  getUserByUsername(key: string) {
    if (!key) return;
    this.affiliateService
      .getAffiliateByUserName(key)
      .subscribe((user: UserAffiliate) => {
        if (user !== null) {
          this.user = user;
        }
      });
  }

  changeLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.isLanguageDropdownOpen = false;
  }

  toggleLanguageDropdown(event: Event) {
    event.stopPropagation();
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.language-selector')) {
      this.isLanguageDropdownOpen = false;
    }
  }

  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

  openNewTab(url: string) {
    window.open(url, '_blank');
  }
}
