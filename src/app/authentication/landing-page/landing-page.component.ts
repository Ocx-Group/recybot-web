import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute } from '@angular/router';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { AffiliateService } from '@app/core/service/affiliate-service/affiliate.service';
import { PdfViewerService } from "@app/core/service/pdf-viewer-service/pdf-viewer.service";
import { PdfViewerComponent } from "@app/shared/components/pdf-viewer/pdf-viewer.component";

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
export class LandingPageComponent implements OnInit, OnDestroy {
  isNavbarVisible = false;
  documents = {
    whitePaper: {
      url: '/assets/pdf/WHITEPAPER.pdf',
      title: 'White Paper - RecyCoin'
    },
    legalDoc: {
      url: '/assets/pdf/LEGAL-DOCUMENTATION.pdf',
      title: 'Documentos Legales - RecyCoin'
    },
    recycoinProject: {
      url: '/assets/pdf/PROJECT.pdf',
      title: 'Proyecto RecyCoin'
    }
  };
  @ViewChild('whitePaperModal') whitePaperModal!: PdfViewerComponent;
  @ViewChild('legalDocsModal') legalDocsModal!: PdfViewerComponent;
  showVideoModal: boolean = false;
  currentVideoUrl: string = '';
  currentLang: string = 'en'
  isLanguageDropdownOpen: boolean = false;
  key: string = '';
  videos = {
    es: {
      url: 'wbSMwTLqtp0',
      title: 'Ver Video Informativo'
    },
    en: {
      url: 'wbSMwTLqtp0',
      title: 'Watch Information Video'
    }
  };
  isPreviewHovered: boolean = false;
  user: UserAffiliate | null = null;

  constructor(
    private pdfViewerService: PdfViewerService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private affiliateService: AffiliateService) {

    translate.setDefaultLang('en');
    this.currentLang = translate.currentLang || 'en';
    this.key = this.activatedRoute.snapshot.params.key;

    if (this.key) {
      this.getUserByUsername(this.key);
    }
  }

  ngOnInit() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.changeLanguage(savedLang);
    } else {
      this.changeLanguage('en');
    }

    setTimeout(() => {
      this.triggerAutomaticVideo();
    }, 2000);
  }

  ngOnDestroy() {
    this.closeVideo();
  }


  triggerAutomaticVideo(): void {
    this.showPreview();
    this.showVideo();
  }

  getUserByUsername(key: string) {
    if (!key) return;
    this.affiliateService.getAffiliateByUserName(key).subscribe(
      (user: UserAffiliate) => {
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
  clickOut(event: any) {
    const clickedElement = event.target as HTMLElement;
    const isLanguageSelector = clickedElement.closest('.language-selector');
    if (!isLanguageSelector) {
      this.isLanguageDropdownOpen = false;
    }
  }

  showDocument(docType: 'whitePaper' | 'legalDoc' | 'recycoinProject'): void {
    const document = this.documents[docType];
    this.pdfViewerService.showPdf(document);
  }

  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

  openNewTab(url: string) {
    window.open(url, '_blank')
  }

  showVideo(): void {
    const videoId = this.videos[this.currentLang].url;

    this.currentVideoUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
    this.showVideoModal = true;
  }

  closeVideo(): void {
    this.showVideoModal = false;
    this.currentVideoUrl = '';
    document.body.style.overflow = 'auto';
    this.hidePreview();
  }

  showPreview(): void {
    this.isPreviewHovered = true;
  }

  hidePreview(): void {
    this.isPreviewHovered = false;
  }
}

