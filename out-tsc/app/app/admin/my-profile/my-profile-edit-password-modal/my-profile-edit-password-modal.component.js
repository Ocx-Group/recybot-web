import { __decorate } from "tslib";
import { UpdatePassword } from './../../../core/models/user-model/update.password.model';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, ViewChild } from '@angular/core';
import { Validators, } from '@angular/forms';
import { User } from '@app/core/models/user-model/user.model';
let MyProfileEditPasswordModalComponent = class MyProfileEditPasswordModalComponent {
    constructor(modalService, userService, formBuilder, toastr) {
        this.modalService = modalService;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.getCurrentUser = [];
        this.credentials = new UpdatePassword();
        this.user = new User();
        this.submitted = false;
    }
    ngOnInit() {
        this.loadValidations();
    }
    openPasswordModal(content, user) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
        this.updatePasswordForm.setValue({
            current_password: '',
            new_password: '',
            confirm_password: '',
        });
        this.user.id = user.id;
    }
    loadValidations() {
        this.updatePasswordForm = this.formBuilder.group({
            current_password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(15),
                ],
            ],
            confirm_password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(15),
                ],
            ],
            new_password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(15),
                ],
            ],
        }, {
            validators: this.mustMatch('new_password', 'confirm_password'),
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    get change_password_controls() {
        return this.updatePasswordForm.controls;
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    onSaveFormValues(user) {
        this.submitted = true;
        if (this.updatePasswordForm.invalid) {
            return;
        }
        this.credentials.password = this.updatePasswordForm.value.current_password;
        this.credentials.new_password = this.updatePasswordForm.value.new_password;
        this.credentials.confirm_password =
            this.updatePasswordForm.value.confirm_password;
        this.credentials.id = this.user.id;
        this.userService.updatePassword(this.credentials).subscribe((response) => {
            if (response.success) {
                this.showSuccess('The credentials is valid!');
                this.closeModals();
            }
        });
    }
    mustMatch(controlName, matchingControlName) {
        return (group) => {
            const control = group.get(controlName);
            const matchingControl = group.get(matchingControlName);
            if (!control || !matchingControl) {
                return null;
            }
            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return null;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            }
            else {
                matchingControl.setErrors(null);
            }
            return null;
        };
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
//# sourceMappingURL=my-profile-edit-password-modal.component.js.map