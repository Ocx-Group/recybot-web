import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {PdfDocument} from "../../interfaces/pdf-document.interface";

@Injectable({
  providedIn: 'root'
})
export class PdfViewerService {
  private isVisibleSource = new BehaviorSubject<boolean>(false);
  private currentDocumentSource = new BehaviorSubject<PdfDocument | null>(null);

  isVisible$ = this.isVisibleSource.asObservable();
  currentDocument$ = this.currentDocumentSource.asObservable();

  showPdf(document: PdfDocument) {
    this.currentDocumentSource.next(document);
    this.isVisibleSource.next(true);
  }

  hidePdf() {
    this.isVisibleSource.next(false);
    this.currentDocumentSource.next(null);
  }
}
