import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
let PdfViewerService = class PdfViewerService {
    constructor() {
        this.isVisibleSource = new BehaviorSubject(false);
        this.currentDocumentSource = new BehaviorSubject(null);
        this.isVisible$ = this.isVisibleSource.asObservable();
        this.currentDocument$ = this.currentDocumentSource.asObservable();
    }
    showPdf(document) {
        this.currentDocumentSource.next(document);
        this.isVisibleSource.next(true);
    }
    hidePdf() {
        this.isVisibleSource.next(false);
        this.currentDocumentSource.next(null);
    }
};
PdfViewerService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PdfViewerService);
export { PdfViewerService };
//# sourceMappingURL=pdf-viewer.service.js.map