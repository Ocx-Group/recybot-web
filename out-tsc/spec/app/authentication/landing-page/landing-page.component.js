import { __decorate } from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
let LandingPageComponent = class LandingPageComponent {
    constructor(pdfViewerService) {
        this.pdfViewerService = pdfViewerService;
        this.isNavbarVisible = false;
        this.documents = {
            whitePaper: {
                url: 'https://drive.google.com/file/d/1tIWEwd0f9pFMj2JwvuR45mKH2H89DP5a/view?usp=sharing',
                title: 'White Paper - RecyCoin'
            },
            legalDoc: {
                url: 'https://drive.google.com/file/d/1w0jo4px7iKDIRPMit-z-wBZ5AjKcTEiC/view?usp=sharing',
                title: 'Documentos Legales - RecyCoin'
            },
            recycoinProject: {
                url: 'https://drive.google.com/file/d/1rMQosu2hwGrYI0ZNy73QJPxAXbOW5UJu/view?usp=sharing',
                title: 'Proyecto RecyCoin'
            }
        };
    }
    ngOnInit() {
    }
    showDocument(docType) {
        const document = this.documents[docType];
        this.pdfViewerService.showPdf(document);
    }
    toggleNavbar() {
        this.isNavbarVisible = !this.isNavbarVisible;
    }
    openNewTab(url) {
        window.open(url, '_blank');
    }
};
__decorate([
    ViewChild('whitePaperModal')
], LandingPageComponent.prototype, "whitePaperModal", void 0);
__decorate([
    ViewChild('legalDocsModal')
], LandingPageComponent.prototype, "legalDocsModal", void 0);
LandingPageComponent = __decorate([
    Component({
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
], LandingPageComponent);
export { LandingPageComponent };
//# sourceMappingURL=landing-page.component.js.map