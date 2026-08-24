
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-preview-modal',
  templateUrl: './email-preview-modal.component.html',
  styleUrls: ['./email-preview-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule],
})
export class EmailPreviewModalComponent implements OnChanges {
  @Input() visible = false;
  @Input() htmlBody = '';
  @Input() subject = '';
  /** Initial values used to seed the local editable copy when the modal opens. */
  @Input() previewValues: Record<string, string> = {};
  @Input() placeholders: string[] = [];

  @Output() visibleChange = new EventEmitter<boolean>();

  /** Editable local copy — changes here do not mutate the parent's object. */
  localValues: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true) {
      this.localValues = { ...this.previewValues };
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.visible) this.close();
  }

  get renderedHtml(): string {
    return this.renderTemplate(this.htmlBody, this.localValues);
  }

  get previewSubject(): string {
    return this.renderTemplate(this.subject, this.localValues);
  }

  private renderTemplate(
    source: string,
    values: Record<string, string>,
  ): string {
    let out = source;
    for (const [k, v] of Object.entries(values)) {
      out = out.split(`{${k}}`).join(v ?? '');
    }
    return out;
  }

  close(): void {
    this.visibleChange.emit(false);
  }

  backdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('pm-backdrop')) {
      this.close();
    }
  }

  valueKeys(): string[] {
    return Object.keys(this.localValues);
  }
}
