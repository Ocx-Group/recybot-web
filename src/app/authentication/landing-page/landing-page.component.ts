import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  currentLanguage: string = 'es';
  showVideoModal: boolean = false;
  currentVideoUrl: string = '';
  videos = {
    es: {
      url: 'comRPFXYv5M',
      title: 'Ver Video Informativo'
    },
    en: {
      url: 'pSgIQxTb9PQ',
      title: 'Watch Information Video'
    }
  };
  isPreviewHovered: boolean = false;
  isLanguageMenuOpen: boolean = false;

  constructor(private pdfViewerService: PdfViewerService) { }

  ngOnInit() {
    this.currentLanguage = navigator.language.startsWith('es') ? 'es' : 'en';
  }

  ngOnDestroy() {
    this.closeVideo();
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
    const videoId = this.videos[this.currentLanguage].url;
    this.currentVideoUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
    this.showVideoModal = true;
  }

  closeVideo(): void {
    this.showVideoModal = false;
    document.body.style.overflow = 'auto';
  }

  toggleLanguageMenu(): void {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  selectLanguage(lang: 'es' | 'en'): void {
    this.currentLanguage = lang;
    this.isLanguageMenuOpen = false;
    this.showVideo();
  }

  showPreview(): void {
    this.isPreviewHovered = true;
  }

  hidePreview(): void {
    this.isPreviewHovered = false;
  }
}

