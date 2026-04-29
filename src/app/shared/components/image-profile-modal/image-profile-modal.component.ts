import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { AffiliateService } from '@app/core/service/affiliate-service/affiliate.service';
import { AuthService } from '@app/core/service/authentication-service/auth.service';
import { ObjectStorageService } from '@app/core/service/object-storage-service/object-storage.service';
import { UserService } from '@app/core/service/user-service/user.service';
import { UpdateImageProfile } from '@app/core/models/user-affiliate-model/update-image-profile.model';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { User } from '@app/core/models/user-model/user.model';

@Component({
  selector: 'app-image-profile-modal',
  templateUrl: './image-profile-modal.component.html',
  styleUrls: ['./image-profile-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule, TranslateModule],
})
export class ImageProfileModalComponent implements OnInit {
  @ViewChild('imageProfileModal', { static: true })
  private readonly modalContent: TemplateRef<any>;

  @Output() getInfo = new EventEmitter<void>();

  file: File | null = null;
  user: UserAffiliate = new UserAffiliate();
  userAdmin: User = new User();

  constructor(
    private readonly modalService: NgbModal,
    private readonly toastr: ToastrService,
    private readonly affiliateService: AffiliateService,
    private readonly userService: UserService,
    private readonly objectStorageService: ObjectStorageService,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserAffiliateValue;
    this.userAdmin = this.authService.currentUserAdminValue;
  }

  /** True when the logged user is an affiliate (otherwise admin). */
  private get isAffiliate(): boolean {
    return !!this.user?.id;
  }

  /** Image URL currently shown (affiliate or admin). */
  get currentImageUrl(): string | null {
    return (
      this.user?.image_profile_url || this.userAdmin?.image_profile_url || null
    );
  }

  /** Open the modal. Self-contained — no args required. */
  openImageProfileModal(): void {
    this.user = this.authService.currentUserAffiliateValue;
    this.userAdmin = this.authService.currentUserAdminValue;

    this.modalService.open(this.modalContent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      centered: true,
    });
  }

  /** Allowed MIME types for the profile picture upload. */
  private readonly ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  /** Allowed file extensions (lowercase, with dot). */
  private readonly ALLOWED_EXTENSIONS = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
  ];

  /** Max file size in bytes (5 MB). */
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024;

  closeModals(): void {
    this.modalService.dismissAll();
  }

  onFileSelected(event: any): void {
    // ngx-dropzone rejects files that don't match `accept` — surface that.
    if (event.rejectedFiles && event.rejectedFiles.length > 0) {
      this.showError(
        'Solo se permiten imágenes (JPG, PNG, GIF, WEBP) de hasta 5 MB',
      );
      return;
    }

    const selected: File | undefined = event.addedFiles?.[0];
    if (!selected) {
      return;
    }

    if (!this.isValidImageFile(selected)) {
      return;
    }

    this.file = selected;
    const folder = this.isAffiliate
      ? `affiliates/profile/${this.user.user_name}`
      : `admins/profile/${this.userAdmin.user_name}`;
    const fileName = `${this.isAffiliate ? this.user.id : this.userAdmin.id}`;

    this.objectStorageService
      .uploadAccountImage(this.file, folder, fileName)
      .subscribe({
        next: downloadURL => {
          const updateImage = new UpdateImageProfile();
          updateImage.image_profile_url = downloadURL;

          if (this.isAffiliate) {
            this.affiliateService
              .updateImageProfile(this.user.id, updateImage)
              .subscribe({
                next: (value: UserAffiliate) => {
                  if (value) {
                    this.authService.setUserAffiliateValue(value);
                    this.user.image_profile_url = value.image_profile_url;
                    this.getInfo.emit();
                    this.showSuccess('Imagen actualizada correctamente');
                  }
                },
                error: () =>
                  this.showError('No se pudo actualizar la imagen de perfil'),
              });
          } else {
            this.userService
              .updateImageProfile(this.userAdmin.id, updateImage)
              .subscribe({
                next: (value: User) => {
                  if (value) {
                    this.authService.setUserAdminValue(value);
                    this.userAdmin.image_profile_url = value.image_profile_url;
                    this.getInfo.emit();
                    this.showSuccess('Imagen actualizada correctamente');
                  }
                },
                error: () =>
                  this.showError('No se pudo actualizar la imagen de perfil'),
              });
          }
        },
        error: () => this.showError('No se pudo cargar la imagen'),
      });
  }

  /** Validate MIME type, extension and size. Shows a toast on failure. */
  private isValidImageFile(file: File): boolean {
    const name = (file.name || '').toLowerCase();
    const ext = name.includes('.') ? name.slice(name.lastIndexOf('.')) : '';
    const mimeOk =
      !!file.type && this.ALLOWED_MIME_TYPES.includes(file.type.toLowerCase());
    const extOk = this.ALLOWED_EXTENSIONS.includes(ext);

    if (!mimeOk || !extOk) {
      this.showError(
        'Formato no permitido. Solo se aceptan imágenes JPG, PNG, GIF o WEBP',
      );
      return false;
    }

    if (file.size > this.MAX_FILE_SIZE) {
      this.showError('La imagen supera el tamaño máximo permitido (5 MB)');
      return false;
    }

    return true;
  }

  removeImage(): void {
    const updateImage = new UpdateImageProfile();
    updateImage.image_profile_url = '';

    if (this.isAffiliate) {
      this.affiliateService
        .updateImageProfile(this.user.id, updateImage)
        .subscribe({
          next: value => {
            if (value) {
              this.authService.setUserAffiliateValue(value);
              this.user.image_profile_url = null;
              this.file = null;
              this.getInfo.emit();
              this.showSuccess('Imagen eliminada correctamente');
            }
          },
          error: () => this.showError('La imagen no se ha eliminado'),
        });
    } else {
      this.userService
        .updateImageProfile(this.userAdmin.id, updateImage)
        .subscribe({
          next: value => {
            if (value) {
              this.authService.setUserAdminValue(value);
              this.userAdmin.image_profile_url = null;
              this.file = null;
              this.getInfo.emit();
              this.showSuccess('Imagen eliminada correctamente');
            }
          },
          error: () => this.showError('La imagen no se ha eliminado'),
        });
    }
  }

  private showSuccess(message: string): void {
    this.toastr.success(message, 'Success!');
  }

  private showError(message: string): void {
    this.toastr.error(message, 'Error!');
  }
}
