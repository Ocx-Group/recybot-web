import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators, } from '@angular/forms';
let MyProfileEditPasswordUploadModalComponent = class MyProfileEditPasswordUploadModalComponent {
    constructor(modalService, formBuilder, toastr) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.submitted = false;
    }
    ngOnInit() {
        this.loadValidations();
    }
    loadValidations() {
        this.editPasswordUploadForm = this.formBuilder.group({
            password_upload: ['', Validators.required],
            confirm_password_upload: ['', Validators.required],
        });
    }
    get edit_password_upload_controls() {
        return this.editPasswordUploadForm.controls;
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    onChangePasswordUpload() {
        this.submitted = true;
        if (this.editPasswordUploadForm.invalid) {
            return;
        }
    }
};
__decorate([
    ViewChild('editPasswordUploadModal')
], MyProfileEditPasswordUploadModalComponent.prototype, "editPasswordUploadModal", void 0);
MyProfileEditPasswordUploadModalComponent = __decorate([
    Component({
        selector: 'app-my-profile-edit-password-upload-modal',
        templateUrl: './my-profile-edit-password-upload-modal.component.html',
    })
], MyProfileEditPasswordUploadModalComponent);
export { MyProfileEditPasswordUploadModalComponent };
//# sourceMappingURL=my-profile-edit-password-upload-modal.component.js.map