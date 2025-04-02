import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators, } from '@angular/forms';
import { UpdatePassword } from '@app/core/models/user-model/update.password.model';
let EditSecurityPinModalComponent = class EditSecurityPinModalComponent {
    constructor(modalService, formBuilder, toastr, affiliateService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.affiliateService = affiliateService;
        this.submitted = false;
        this.credentials = new UpdatePassword();
    }
    ngOnInit() {
        this.loadValidations();
    }
    onChangePasswordUpload() {
        this.submitted = true;
        if (this.editSecurityPinForm.invalid) {
            return;
        }
        this.credentials.password = this.editSecurityPinForm.value.currentPassword;
        this.credentials.new_password = this.editSecurityPinForm.value.pin;
        this.credentials.confirm_password = this.editSecurityPinForm.value.confirmPin;
        this.credentials.id = this.userId;
        this.affiliateService.updatePin(this.credentials).subscribe((response) => {
            if (response.success) {
                this.showSuccess('The security pin has been successfully updated!');
                this.closeModals();
            }
            else {
                this.showError('The security pin is not correct!');
            }
        });
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    loadValidations() {
        this.editSecurityPinForm = this.formBuilder.group({
            currentPassword: ['', Validators.required],
            pin: ['', Validators.required],
            confirmPin: ['', Validators.required],
        }, {
            validator: passwordMatchValidator
        });
    }
    openEditPasswordUploadModal(content, user) {
        this.submitted = false;
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
        this.editSecurityPinForm.setValue({
            currentPassword: '',
            pin: '',
            confirmPin: '',
        });
        this.userId = user.id;
    }
    get edit_security_pin_controls() {
        return this.editSecurityPinForm.controls;
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    closeModals() {
        this.modalService.dismissAll();
    }
};
__decorate([
    ViewChild('editSecurityPinModal')
], EditSecurityPinModalComponent.prototype, "editSecurityPinModal", void 0);
EditSecurityPinModalComponent = __decorate([
    Component({
        selector: 'app-edit-security-pin-modal',
        templateUrl: './edit-security-pin-modal.component.html',
    })
], EditSecurityPinModalComponent);
export { EditSecurityPinModalComponent };
export function passwordMatchValidator(formGroup) {
    const password = formGroup.get('pin').value;
    const confirmPassword = formGroup.get('confirmPin').value;
    return password === confirmPassword ? null : { passwordMismatch: true };
}
//# sourceMappingURL=edit-security-pin-modal.component.js.map