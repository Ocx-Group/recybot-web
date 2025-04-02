import { __decorate } from "tslib";
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { UpdateImageProfile } from '@app/core/models/user-affiliate-model/update-image-profile.model';
import { ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
let ImageProfileModalComponent = class ImageProfileModalComponent {
    constructor(modalService, toastr, affiliateService, storage, authService) {
        this.modalService = modalService;
        this.toastr = toastr;
        this.affiliateService = affiliateService;
        this.storage = storage;
        this.authService = authService;
        this.file = null;
        this.user = new UserAffiliate();
        this.getInfo = new EventEmitter();
    }
    ngOnInit() {
        this.user = this.authService.currentUserAffiliateValue;
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    openImageProfileModal(content, user) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            centered: true
        });
        this.userId = user.id;
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    onFileSelected(event) {
        this.file = event.addedFiles[0];
        const filePath = 'affiliates/profile/' + `${this.user.user_name}/` + `${this.user.id}`;
        this.fileRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(this.fileRef, this.file);
        uploadTask.on('state_changed', (snapshot) => {
        }, (error) => {
            console.log(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                let updateImage = new UpdateImageProfile();
                updateImage.image_profile_url = downloadURL;
                this.affiliateService.updateImageProfile(this.user.id, updateImage).subscribe({
                    next: (value) => {
                        if (value) {
                            this.authService.setUserAffiliateValue(value);
                            this.user.image_profile_url = value.image_profile_url;
                            this.getInfo.emit();
                            this.showSuccess('Imagen actualizada correctamente');
                        }
                    },
                    error: () => {
                        this.showError('No se pudo actualizar la imagen de perfil');
                    },
                });
            });
        });
    }
    removeImage() {
        let updateImage = new UpdateImageProfile();
        updateImage.image_profile_url = '';
        this.user.image_profile_url = null;
        this.file = null;
        this.affiliateService.updateImageProfile(this.user.id, updateImage).subscribe({
            next: (value) => {
                if (value) {
                    this.getInfo.emit();
                    this.showSuccess('Imagen eliminada correctamente');
                    this.authService.setUserAffiliateValue(value);
                }
            },
            error: () => {
                this.showError('La imagen no se ha eliminado');
            },
        });
    }
};
__decorate([
    ViewChild('imageProfileModal')
], ImageProfileModalComponent.prototype, "imageProfileModal", void 0);
__decorate([
    Output()
], ImageProfileModalComponent.prototype, "getInfo", void 0);
ImageProfileModalComponent = __decorate([
    Component({
        selector: 'app-image-profile-modal',
        templateUrl: './image-profile-modal.component.html',
    })
], ImageProfileModalComponent);
export { ImageProfileModalComponent };
//# sourceMappingURL=image-profile-modal.component.js.map