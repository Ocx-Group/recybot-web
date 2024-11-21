import { __decorate } from "tslib";
import { EventEmitter } from '@angular/core';
import { Component, ViewChild, Output } from '@angular/core';
import { Validators, } from '@angular/forms';
import { Rol } from '@app/core/models/rol-model/rol.model';
import { ToastrService } from 'ngx-toastr';
let RolListEditModalComponent = class RolListEditModalComponent {
    constructor(modalService, rolService, toastr, formBuilder) {
        this.modalService = modalService;
        this.rolService = rolService;
        this.toastr = toastr;
        this.formBuilder = formBuilder;
        this.rol = new Rol();
        this.submitted = false;
        this.rolGlobal = new Rol();
        this.loadRolList = new EventEmitter();
    }
    get update_rol_controls() {
        return this.updateRolForm.controls;
    }
    ngOnInit() {
        this.loadValidations();
    }
    loadValidations() {
        this.updateRolForm = this.formBuilder.group({
            rol_name: ['', Validators.required],
            description: ['', Validators.required],
        });
    }
    updateOpenModal(content, rol) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
        (this.rol = new Rol()), (this.rolGlobal = rol);
        this.updateRolForm.setValue({
            rol_name: rol.name,
            description: rol.description,
        });
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    updateRol() {
        this.submitted = true;
        if (this.updateRolForm.invalid) {
            return;
        }
        this.rolGlobal.name = this.updateRolForm.value.rol_name;
        this.rolGlobal.description = this.updateRolForm.value.description;
        this.rolService.updateRol(this.rolGlobal).subscribe({
            next: (value) => {
                this.showSuccess('The rol was update successfully!');
                this.closeModals();
                this.loadRolList.emit();
            },
            error: (err) => {
                this.showError('Error!' + err);
            },
        });
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    closeModals() {
        this.modalService.dismissAll();
    }
};
__decorate([
    ViewChild('rolUpdateModal')
], RolListEditModalComponent.prototype, "rolUpdateModal", void 0);
__decorate([
    Output('loadRolList')
], RolListEditModalComponent.prototype, "loadRolList", void 0);
RolListEditModalComponent = __decorate([
    Component({
        selector: 'app-rol-list-edit-modal',
        templateUrl: './rol-list-edit-modal.component.html',
        providers: [ToastrService],
    })
], RolListEditModalComponent);
export { RolListEditModalComponent };
//# sourceMappingURL=rol-list-edit-modal.component.js.map