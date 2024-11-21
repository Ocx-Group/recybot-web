import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import {PdfViewerService} from "@app/core/service/pdf-viewer-service/pdf-viewer.service";
import {PdfViewerComponent} from "@app/shared/components/pdf-viewer/pdf-viewer.component";

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

  constructor(private pdfViewerService: PdfViewerService) {
  }

  ngOnInit() {
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
}

