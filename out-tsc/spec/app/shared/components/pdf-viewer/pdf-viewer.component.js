import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PdfViewerComponent = class PdfViewerComponent {
    constructor(pdfViewerService) {
        this.pdfViewerService = pdfViewerService;
        this.isVisible = false;
        this.currentDocument = null;
        this.zoom = 1;
        this.currentPage = 1;
        this.totalPages = 0;
        this.subscriptions = [];
    }
    ngOnInit() {
        this.subscriptions.push(this.pdfViewerService.isVisible$.subscribe(isVisible => this.isVisible = isVisible), this.pdfViewerService.currentDocument$.subscribe(document => {
            this.currentDocument = document;
            if (document) {
                this.resetViewer();
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    resetViewer() {
        this.zoom = 1;
        this.currentPage = 1;
        this.totalPages = 0;
    }
    close() {
        this.pdfViewerService.hidePdf();
    }
    closeModal(event) {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }
    zoomIn() {
        this.zoom = Math.min(this.zoom + 0.1, 2);
    }
    zoomOut() {
        this.zoom = Math.max(this.zoom - 0.1, 0.5);
    }
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }
    afterLoadComplete(pdf) {
        this.totalPages = pdf.numPages;
    }
    downloadPdf() {
        const link = document.createElement('a');
        link.href = this.pdfSrc;
        link.download = this.title.replace(/\s+/g, '_').toLowerCase() + '.pdf';
        link.click();
    }
};
PdfViewerComponent = __decorate([
    Component({
        selector: 'app-pdf-viewer',
        templateUrl: './pdf-viewer.component.html',
        styleUrls: ['./pdf-viewer.component.scss']
    })
], PdfViewerComponent);
export { PdfViewerComponent };
//# sourceMappingURL=pdf-viewer.component.js.map