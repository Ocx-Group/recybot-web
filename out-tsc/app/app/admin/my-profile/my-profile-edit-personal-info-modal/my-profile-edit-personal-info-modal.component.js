import { __decorate } from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { Validators, } from '@angular/forms';
import { User } from '@app/core/models/user-model/user.model';
let MyProfileEditPersonalInfoModalComponent = class MyProfileEditPersonalInfoModalComponent {
    constructor(modalService, formBuilder, toastr, userService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.userService = userService;
        this.submitted = false;
        this.user = new User();
        this.personalInfo = [];
    }
    ngOnInit() {
        this.loadValidations();
    }
    loadValidations() {
        this.editPersonalInfoForm = this.formBuilder.group({
            user_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            address: ['', Validators.required],
        });
    }
    openEditPersonalInfoModal(content, user) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
        this.onSetValuesPersonalInfo(user);
    }
    get edit_personal_info_controls() {
        return this.editPersonalInfoForm.controls;
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    onSetValuesPersonalInfo(user) {
        this.editPersonalInfoForm.setValue({
            user_name: user.name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            address: user.address,
        });
    }
    onSaveEditInfoValues() {
        this.submitted = true;
        if (this.editPersonalInfoForm.invalid) {
            return;
        }
        this.user = this.personalInfo;
        this.user.name = this.editPersonalInfoForm.value.user_name;
        this.user.last_name = this.editPersonalInfoForm.value.last_name;
        this.user.email = this.editPersonalInfoForm.value.email;
        this.user.phone = this.editPersonalInfoForm.value.phone;
        this.user.address = this.editPersonalInfoForm.value.address;
        this.userService.updateUser(this.user).subscribe((response) => {
            if (response.success) {
                this.showSuccess('The user was update successfully!');
                this.closeModals();
            }
        });
    }
};
__decorate([
    Input()
], MyProfileEditPersonalInfoModalComponent.prototype, "personalInfo", void 0);
__decorate([
    ViewChild('editPersonalInfoModal')
], MyProfileEditPersonalInfoModalComponent.prototype, "editPersonalInfoModal", void 0);
MyProfileEditPersonalInfoModalComponent = __decorate([
    Component({
        selector: 'app-my-profile-edit-personal-info-modal',
        templateUrl: './my-profile-edit-personal-info-modal.component.html',
    })
], MyProfileEditPersonalInfoModalComponent);
export { MyProfileEditPersonalInfoModalComponent };
//# sourceMappingURL=my-profile-edit-personal-info-modal.component.js.map