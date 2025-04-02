import { __decorate } from "tslib";
import { UpdatePassword } from '@app/core/models/user-model/update.password.model';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, ViewChild } from '@angular/core';
import { Validators, } from '@angular/forms';
let MyProfileEditPasswordModalComponent = class MyProfileEditPasswordModalComponent {
    constructor(modalService, affiliateService, formBuilder, toastr) {
        this.modalService = modalService;
        this.affiliateService = affiliateService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.getCurrentUser = [];
        this.credentials = new UpdatePassword();
        this.submitted = false;
    }
    ngOnInit() {
        this.loadValidations();
    }
    openPasswordModal(content, user) {
        this.submitted = false;
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
        this.updatePasswordForm.setValue({
            current_password: '',
            new_password: '',
            confirm_password: '',
        });
        this.userId = user.id;
    }
    loadValidations() {
        this.updatePasswordForm = this.formBuilder.group({
            current_password: ['', [Validators.required]],
            confirm_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15),
                    Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
            new_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15),
                    Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
        }, {
            validator: passwordMatchValidator
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    get change_password_controls() {
        return this.updatePasswordForm.controls;
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    onSaveFormValues() {
        this.submitted = true;
        if (this.updatePasswordForm.invalid) {
            return;
        }
        this.credentials.password = this.updatePasswordForm.value.current_password;
        this.credentials.new_password = this.updatePasswordForm.value.new_password;
        this.credentials.confirm_password = this.updatePasswordForm.value.confirm_password;
        this.credentials.id = this.userId;
        this.affiliateService.updatePassword(this.credentials).subscribe((response) => {
            if (response.success) {
                this.showSuccess('The password has been successfully updated!');
                this.closeModals();
            }
            else {
                this.showError('The current password is not correct!');
            }
        });
    }
    get Pwd() {
        return this.updatePasswordForm.get('new_password');
    }
    get PwdConfirm() {
        return this.updatePasswordForm.get('confirm_password');
    }
};
__decorate([
    Input()
], MyProfileEditPasswordModalComponent.prototype, "getCurrentUser", void 0);
__decorate([
    ViewChild('changePasswordModal')
], MyProfileEditPasswordModalComponent.prototype, "changePasswordModal", void 0);
MyProfileEditPasswordModalComponent = __decorate([
    Component({
        selector: 'app-my-profile-edit-password-modal',
        templateUrl: './my-profile-edit-password-modal.component.html',
        providers: [ToastrService],
    })
], MyProfileEditPasswordModalComponent);
export { MyProfileEditPasswordModalComponent };
export function passwordMatchValidator(formGroup) {
    const password = formGroup.get('new_password').value;
    const confirmPassword = formGroup.get('confirm_password').value;
    return password === confirmPassword ? null : { passwordMismatch: true };
}
//# sourceMappingURL=my-profile-edit-password-modal.component.js.map