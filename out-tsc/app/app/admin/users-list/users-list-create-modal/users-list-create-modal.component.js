import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { User } from '@app/core/models/user-model/user.model';
let UsersListCreateModalComponent = class UsersListCreateModalComponent {
    constructor(modalService, formBuilder, toastr, userService, rolService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.userService = userService;
        this.rolService = rolService;
        this.submitted = false;
        this.selectItems = [];
        this.loadUserList = new EventEmitter();
    }
    get create_user_controls() {
        return this.createUserForm.controls;
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
        this.createUserForm = this.formBuilder.group({
            user_name: ['', Validators.required],
            name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirm_password: ['', [Validators.required, Validators.minLength(6)]],
            phone: ['', Validators.required],
            rol_id: ['', Validators.required],
            status: [],
            observation: ['', Validators.required],
            address: ['', Validators.required],
        }, {
            validators: MustMatch('password', 'confirm_password'),
        });
    }
    onAddRowSave() {
        var _a;
        this.submitted = true;
        if (this.createUserForm.invalid) {
            return;
        }
        let user = new User();
        user.user_name = this.createUserForm.value.user_name;
        user.rol_id = this.createUserForm.value.rol_id;
        user.password = this.createUserForm.value.password;
        user.name = this.createUserForm.value.name;
        user.last_name = this.createUserForm.value.last_name;
        user.email = this.createUserForm.value.email;
        user.phone = this.createUserForm.value.phone;
        user.observation = this.createUserForm.value.observation;
        user.address = this.createUserForm.value.address;
        user.status = (_a = this.createUserForm.value.status) !== null && _a !== void 0 ? _a : false;
        this.userService.createUser(user).subscribe({
            next: (value) => {
                this.showSuccess('The user was created successfully!');
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
], UsersListCreateModalComponent.prototype, "selectItems", void 0);
__decorate([
    ViewChild('userCreateModal')
], UsersListCreateModalComponent.prototype, "userCreateModal", void 0);
__decorate([
    Output('loadUserList')
], UsersListCreateModalComponent.prototype, "loadUserList", void 0);
UsersListCreateModalComponent = __decorate([
    Component({
        selector: 'app-users-list-create-modal',
        templateUrl: './users-list-create-modal.component.html',
    })
], UsersListCreateModalComponent);
export { UsersListCreateModalComponent };
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
//# sourceMappingURL=users-list-create-modal.component.js.map