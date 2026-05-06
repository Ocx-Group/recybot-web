export interface EmailSenderConfig {
  id: number;
  brandId: number;
  name: string;
  senderName: string;
  senderEmail: string;
  supportEmail?: string | null;
  clientUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
}
