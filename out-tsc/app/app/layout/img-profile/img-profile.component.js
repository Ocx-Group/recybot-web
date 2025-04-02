import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { UpdateImageProfile } from '@app/core/models/user-affiliate-model/update-image-profile.model';
import { User } from '@app/core/models/user-model/user.model';
let ImgProfileComponent = class ImgProfileComponent {
    constructor(modalService, storage, authService, affiliateService, toastr, imageProfileService, userService) {
        this.modalService = modalService;
        this.storage = storage;
        this.authService = authService;
        this.affiliateService = affiliateService;
        this.toastr = toastr;
        this.imageProfileService = imageProfileService;
        this.userService = userService;
        this.file = null;
        this.user = new UserAffiliate();
        this.userAdmin = new User();
    }
    ngOnInit() {
        this.user = this.authService.currentUserAffiliateValue;
        console.log(this.user);
        this.userAdmin = this.authService.currentUserAdminValue;
        console.log(this.userAdmin);
    }
    showSuccess(message) {
        this.toastr.success(message);
    }
    showError(message) {
        this.toastr.error(message);
    }
    openProfileImgModal() {
        this.modalService.open(this.modalContent, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            centered: true,
        });
    }
    onFileSelected(event) {
        this.file = event.addedFiles[0];
        const isUserAffiliate = this.user && this.user.id;
        const filePath = isUserAffiliate
            ? 'affiliates/profile/' + `${this.user.user_name}/` + `${this.user.id}`
            : 'admins/profile/' + `${this.userAdmin.user_name}/` + `${this.userAdmin.id}`;
        this.fileRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(this.fileRef, this.file);
        uploadTask.on('state_changed', (snapshot) => { }, (error) => {
            console.log(error);
            this.showError('Error al subir la imagen');
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                let updateImage = new UpdateImageProfile();
                updateImage.image_profile_url = downloadURL;
                if (isUserAffiliate) {
                    this.affiliateService.updateImageProfile(this.user.id, updateImage).subscribe({
                        next: (value) => {
                            this.authService.setUserAffiliateValue(value);
                            this.user.image_profile_url = downloadURL;
                            this.showSuccess('Imagen actualizada correctamente');
                        },
                        error: () => {
                            this.showError('No se pudo actualizar la imagen de perfil.');
                        }
                    });
                }
                else {
                    this.userService.updateImageProfile(this.userAdmin.id, updateImage).subscribe({
                        next: (value) => {
                            this.authService.setUserAdminValue(value);
                            this.userAdmin.image_profile_url = downloadURL;
                            this.showSuccess('Imagen actualizada correctamente');
                        },
                        error: () => {
                            this.showError('No se pudo actualizar la imagen de perfil.');
                        }
                    });
                }
            });
        });
    }
    removeImage() {
        let updateImage = new UpdateImageProfile();
        updateImage.image_profile_url = '';
        const isUserAffiliate = this.user && this.user.id;
        if (isUserAffiliate) {
            this.affiliateService.updateImageProfile(this.user.id, updateImage).subscribe({
                next: (value) => {
                    this.authService.setUserAffiliateValue(value);
                    this.user.image_profile_url = null;
                    this.file = null;
                    this.showSuccess('Imagen eliminada correctamente');
                },
                error: () => {
                    this.showError('No se pudo eliminar la imagen de perfil del afiliado.');
                }
            });
        }
        else {
            this.userService.updateImageProfile(this.userAdmin.id, updateImage).subscribe({
                next: (value) => {
                    this.authService.setUserAdminValue(value);
                    this.userAdmin.image_profile_url = null;
                    this.file = null;
                    this.showSuccess('Imagen de admin eliminada correctamente');
                },
                error: () => {
                    this.showError('No se pudo eliminar la imagen de perfil del admin.');
                }
            });
        }
    }
};
__decorate([
    ViewChild('profileImgModal', { static: true })
], ImgProfileComponent.prototype, "modalContent", void 0);
ImgProfileComponent = __decorate([
    Component({
        selector: 'app-img-profile',
        templateUrl: './img-profile.component.html',
        styleUrls: ['./img-profile.component.sass']
    })
], ImgProfileComponent);
export { ImgProfileComponent };
//# sourceMappingURL=img-profile.component.js.map