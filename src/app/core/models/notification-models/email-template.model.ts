export interface EmailTemplate {
  id: number;
  templateKey: string;
  brandId: number;
  subject: string;
  htmlBody: string;
  placeholders: string[];
  isActive: boolean;
  version: number;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateEmailTemplate {
  templateKey: string;
  subject: string;
  htmlBody: string;
  placeholders: string[];
}

export interface UpdateEmailTemplate {
  id: number;
  templateKey?: string | null;
  subject?: string | null;
  htmlBody?: string | null;
  placeholders?: string[] | null;
  isActive?: boolean | null;
}
