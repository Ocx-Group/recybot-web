import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { Response } from '@app/core/models/response-model/response.model';
import {
  CreateEmailTemplate,
  EmailTemplate,
  UpdateEmailTemplate,
} from '@app/core/models/notification-models/email-template.model';
import { EmailSenderConfig } from '@app/core/models/notification-models/email-sender-config.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: environment.tokens.notificationService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString(),
  }),
};

@Injectable({ providedIn: 'root' })
export class TemplateService {
  private readonly base: string;

  constructor(private http: HttpClient) {
    this.base = environment.apis.notificationService;
  }

  // ---------- Templates ----------
  // BrandId is resolved server-side from the X-Client-ID header — no need to send it.

  getAll(): Observable<EmailTemplate[]> {
    return this.http
      .get<Response>(`${this.base}/template`, httpOptions)
      .pipe(map(r => (r.success ? (r.data as EmailTemplate[]) : [])));
  }

  getByKey(templateKey: string): Observable<EmailTemplate | null> {
    return this.http
      .get<Response>(`${this.base}/template/${templateKey}`, httpOptions)
      .pipe(map(r => (r.success ? (r.data as EmailTemplate) : null)));
  }

  create(payload: CreateEmailTemplate): Observable<EmailTemplate> {
    return this.http
      .post<Response>(`${this.base}/template`, payload, httpOptions)
      .pipe(map(r => r.data as EmailTemplate));
  }

  update(payload: UpdateEmailTemplate): Observable<EmailTemplate> {
    const { id, ...body } = payload;
    return this.http
      .put<Response>(`${this.base}/template/${id}`, body, httpOptions)
      .pipe(map(r => r.data as EmailTemplate));
  }

  delete(id: number): Observable<boolean> {
    return this.http
      .delete<Response>(`${this.base}/template/${id}`, httpOptions)
      .pipe(map(r => !!r.success));
  }

  // ---------- Sender configs (current tenant only) ----------

  getAllSenderConfigs(): Observable<EmailSenderConfig[]> {
    return this.http
      .get<Response>(`${this.base}/email-sender-config`, httpOptions)
      .pipe(map(r => (r.success ? (r.data as EmailSenderConfig[]) : [])));
  }
}
