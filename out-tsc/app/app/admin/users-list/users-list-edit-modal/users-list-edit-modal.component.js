import { __decorate } from "tslib";
import { Rol } from './../../../core/models/rol-model/rol.model';
import { Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { User } from '@app/core/models/user-model/user.model';
let UsersListEditModalComponent = class UsersListEditModalComponent {
    constructor(modalService, formBuilder, toastr, userService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.userService = userService;
        this.submitted = false;
        this.user = new User();
        this.selectRol = new Rol();
        this.loadUserList = new EventEmitter();
    }
    get edit_user_controls() {
        return this.editUserForm.controls;
    }
    editOpenModal(content, user) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
        this.user = user;
        this.editUserForm.setValue({
            user_name: user.user_name,
            name: user.name,
            last_name: user.last_name,
            phone: user.phone,
            email: user.email,
            rol_id: user.rol_id,
            observation: user.observation,
            address: user.address,
            status: user.status,
        });
    }
    ngOnInit() {
        this.loadValidations();
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    loadValidations() {
        this.editUserForm = this.formBuilder.group({
            user_name: ['', Validators.required],
            name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            rol_id: ['', Validators.required],
            status: [],
            observation: ['', Validators.required],
            address: ['', Validators.required],
        });
    }
    onEditRowSave() {
        var _a;
        this.submitted = true;
        if (this.editUserForm.invalid) {
            return;
        }
        this.user.user_name = this.editUserForm.value.user_name;
        this.user.rol_id = this.editUserForm.value.rol_id;
        this.user.name = this.editUserForm.value.name;
        this.user.last_name = this.editUserForm.value.last_name;
        this.user.email = this.editUserForm.value.email;
        this.user.phone = this.editUserForm.value.phone;
        this.user.observation = this.editUserForm.value.observation;
        this.user.address = this.editUserForm.value.address;
        this.user.status = (_a = this.editUserForm.value.status) !== null && _a !== void 0 ? _a : false;
        this.userService.updateUser(this.user).subscribe({
            next: (value) => {
                this.showSuccess('The user was updated successfully!');
                this.closeModals();
                this.loadUserList.emit();
            },
            error: (err) => {
                this.showError('Error!' + err);
            },
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
};
__decorate([
    Input()
], UsersListEditModalComponent.prototype, "selectRol", void 0);
__decorate([
    ViewChild('userEditModal')
], UsersListEditModalComponent.prototype, "userEditModal", void 0);
__decorate([
    Output('loadUserList')
], UsersListEditModalComponent.prototype, "loadUserList", void 0);
UsersListEditModalComponent = __decorate([
    Component({
        selector: 'app-users-list-edit-modal',
        templateUrl: './users-list-edit-modal.component.html',
    })
], UsersListEditModalComponent);
export { UsersListEditModalComponent };
export function MustMatch(controlName, matchingControlName) {
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
//# sourceMappingURL=users-list-edit-modal.component.js.map