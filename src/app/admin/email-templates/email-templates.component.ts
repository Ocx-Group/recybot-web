import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { environment } from '@environments/environment';
import { EmailSenderConfig } from '@app/core/models/notification-models/email-sender-config.model';
import {
  CreateEmailTemplate,
  EmailTemplate,
} from '@app/core/models/notification-models/email-template.model';
import { TemplateService } from '@app/core/service/notification-service/template.service';

type Mode = 'list' | 'edit';

@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
})
export class EmailTemplatesComponent implements OnInit {
  @ViewChild('htmlBodyArea') htmlBodyArea?: ElementRef<HTMLTextAreaElement>;

  // Brand is fixed per deployment — recybot serves recybotia (brand 5).
  readonly brandId = environment.brand.id;
  readonly brandName = environment.brand.name;

  mode: Mode = 'list';
  loading = false;
  saving = false;

  brand: EmailSenderConfig | null = null;
  templates: EmailTemplate[] = [];

  editing: EmailTemplate | null = null;
  form: FormGroup;
  placeholderInput = '';

  // Sample values used for the live preview render.
  previewValues: Record<string, string> = {
    userName: 'Andres',
    verificationCode: '2718b880-1468-40ea-84e0-d07ef106581b',
    brandName: this.brandName,
    clientUrl: '',
    supportEmail: '',
    senderName: this.brandName,
  };

  // Standard placeholders the consumer always injects.
  readonly defaultPlaceholders = [
    'userName',
    'verificationCode',
    'brandName',
    'clientUrl',
    'supportEmail',
    'senderName',
  ];

  constructor(
    private readonly templateService: TemplateService,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
  ) {
    this.form = this.fb.group({
      templateKey: ['', [Validators.required, Validators.maxLength(100)]],
      subject: ['', [Validators.required, Validators.maxLength(255)]],
      htmlBody: ['', Validators.required],
      placeholders: [[] as string[]],
      isActive: [true],
    });
  }

  ngOnInit(): void {
    this.loadBrand();
    this.loadTemplates();
  }

  // ---------- Data ----------

  loadBrand(): void {
    // Fetch sender configs to seed preview defaults (clientUrl, supportEmail) for our brand.
    this.templateService.getAllSenderConfigs().subscribe({
      next: list => {
        this.brand = list?.find(b => b.brandId === this.brandId) ?? null;
        if (this.brand) {
          this.previewValues.clientUrl    = this.brand.clientUrl    ?? '';
          this.previewValues.supportEmail = this.brand.supportEmail ?? '';
          this.previewValues.senderName   = this.brand.senderName;
          this.previewValues.brandName    = this.brand.name;
        }
      },
      error: () => {
        // Non-fatal: preview defaults stay empty.
      },
    });
  }

  loadTemplates(): void {
    this.loading = true;
    this.templateService.getAll().subscribe({
      next: list => {
        this.templates = list ?? [];
        this.loading = false;
      },
      error: () => {
        this.toastr.error('No se pudieron cargar los templates');
        this.loading = false;
      },
    });
  }

  // ---------- Mode ----------

  startCreate(): void {
    this.editing = null;
    this.form.reset({
      templateKey: '',
      subject: '',
      htmlBody: this.starterHtml(),
      placeholders: [...this.defaultPlaceholders],
      isActive: true,
    });
    this.mode = 'edit';
  }

  startEdit(t: EmailTemplate): void {
    this.editing = t;
    this.form.reset({
      templateKey: t.templateKey,
      subject: t.subject,
      htmlBody: t.htmlBody,
      placeholders: [...(t.placeholders ?? [])],
      isActive: t.isActive,
    });
    this.mode = 'edit';
  }

  cancelEdit(): void {
    this.mode = 'list';
    this.editing = null;
  }

  // ---------- Save ----------

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastr.warning('Revisa los campos requeridos');
      return;
    }

    this.saving = true;
    const value = this.form.value;

    if (this.editing) {
      this.templateService
        .update({
          id: this.editing.id,
          templateKey: value.templateKey,
          subject: value.subject,
          htmlBody: value.htmlBody,
          placeholders: value.placeholders,
          isActive: value.isActive,
        })
        .subscribe({
          next: () => {
            this.toastr.success('Template actualizado');
            this.saving = false;
            this.mode = 'list';
            this.loadTemplates();
          },
          error: err => this.handleSaveError(err),
        });
    } else {
      const payload: CreateEmailTemplate = {
        templateKey: value.templateKey,
        subject: value.subject,
        htmlBody: value.htmlBody,
        placeholders: value.placeholders,
      };
      this.templateService.create(payload).subscribe({
        next: () => {
          this.toastr.success('Template creado');
          this.saving = false;
          this.mode = 'list';
          this.loadTemplates();
        },
        error: err => this.handleSaveError(err),
      });
    }
  }

  private handleSaveError(err: unknown): void {
    this.saving = false;
    const msg =
      (err as any)?.error?.message ?? 'No se pudo guardar el template';
    this.toastr.error(msg);
  }

  delete(t: EmailTemplate): void {
    Swal.fire({
      title: '¿Eliminar template?',
      text: `Se eliminará "${t.templateKey}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
    }).then(result => {
      if (!result.isConfirmed) return;
      this.templateService.delete(t.id).subscribe({
        next: () => {
          this.toastr.success('Template eliminado');
          this.loadTemplates();
        },
        error: () => this.toastr.error('No se pudo eliminar'),
      });
    });
  }

  // ---------- Placeholders ----------

  insertPlaceholder(key: string): void {
    const ta = this.htmlBodyArea?.nativeElement;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const current: string = this.form.value.htmlBody ?? '';
    const token = `{${key}}`;
    const next = current.slice(0, start) + token + current.slice(end);
    this.form.patchValue({ htmlBody: next });
    queueMicrotask(() => {
      ta.focus();
      const pos = start + token.length;
      ta.setSelectionRange(pos, pos);
    });
  }

  addPlaceholder(): void {
    const key = this.placeholderInput.trim();
    if (!key) return;
    const current: string[] = this.form.value.placeholders ?? [];
    if (!current.includes(key)) {
      this.form.patchValue({ placeholders: [...current, key] });
    }
    this.placeholderInput = '';
  }

  removePlaceholder(key: string): void {
    const current: string[] = this.form.value.placeholders ?? [];
    this.form.patchValue({ placeholders: current.filter(p => p !== key) });
  }

  // ---------- Preview ----------

  get renderedHtml(): string {
    return this.renderTemplate(this.form.value.htmlBody ?? '', this.previewValues);
  }

  get previewSubject(): string {
    return this.renderTemplate(this.form.value.subject ?? '', this.previewValues);
  }

  private renderTemplate(source: string, values: Record<string, string>): string {
    let out = source;
    for (const [k, v] of Object.entries(values)) {
      out = out.split(`{${k}}`).join(v ?? '');
    }
    return out;
  }

  trackById(_: number, item: EmailTemplate): number {
    return item.id;
  }

  // ---------- Misc ----------

  private starterHtml(): string {
    return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;background:#f4f4f4;margin:0;padding:0;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;"><tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
    <tr><td style="background:#244e37;padding:24px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;">{brandName}</h1>
    </td></tr>
    <tr><td style="padding:32px;">
      <p>Hola <strong>{userName}</strong>,</p>
      <p>Tu mensaje aquí.</p>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
  }
}
